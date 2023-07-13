import { NFTStorage } from "nft.storage";
import { Web3 } from "web3";

import config from "../config/config.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import t2i from "../contract/t2i.js";
import { fileFromPath } from "../blockchain/utils.js";

const web3 = new Web3("ws://127.0.0.1:8546"); //local Geth node
const storage = new NFTStorage({ token: config.storage.api_key });

export const createWallet = async (userid) => {
    try {
        console.log("------------Call createWallet------------");
        const user = await User.findByPk(userid);
        if (!user) {
            throw "User not found";
        }

        const newAccount = await web3.eth.accounts.create();
        if (!newAccount) {
			throw "Account not created";
        }

        user.wallet = newAccount.address;
        await user.save();

        return newAccount;
    } catch (error) {
        throw error;
    }
};

const contract = new web3.eth.Contract(t2i.abi, t2i.address);
const coinbase = await web3.eth.getCoinbase();

export const mint = async (req, res) => {
	console.log("------------Call mint------------");
    let dataurl;
    // TODO: get user wallet from database, get private key from front-end
    // private key communication need encryption?
	const userid = req.body.userid;
	const privateKey = req.body.privateKey;
	const imgid = req.body.imgid;

    if (!userid) {
        return res.status(400).json({ message: "User ID is missing" });
    }

	if (!privateKey) {
		return res.status(400).json({ message: "Private key is missing" });
	}

	if (!imgid) {
		return res.status(400).json({ message: "Image ID is missing" });
	}

    const user = await User.findByPk(userid);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
	
    const me = { address: user.wallet, privateKey: privateKey };

	const t2image = await T2Image.findByPk(imgid);
	if (!t2image) {
		return res.status(400).json({ message: "Image not found" });
	}
	const prompt = t2image.prompts;
	const imgpath = t2image.img_path;

	// nft storage
    try {
		const image = await fileFromPath(imgpath, config.models.image_type);
		if (!image) {
			return res.status(400).json({ message: "Image upload failed" });
		}

        const metadata = await storage.store({
			name: user.username + " " + t2image.imgid,
			description: prompt,
            image: image
        });

        if (!metadata || !metadata.url) {
            return res.status(400).json({ message: "NFT Storage failed" });
        }

        dataurl = metadata.url;
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
	// mint
    try {
		const gasPrice = await web3.eth.getGasPrice();
		var rawTransaction = {
			from: me.address,
			to : t2i.address,
			gasPrice: gasPrice,
			gas : 2000000,
			data : contract.methods.mint(me.address, dataurl).encodeABI()
		};
		const signedTx = await web3.eth.accounts.signTransaction(rawTransaction, me.privateKey);
		const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		// console.log(result);

        if (!result) {
            res.status(500).json({ success: false, error: "Transaction failed" });
        }

		// save to database
		const tx = await Transaction.create({
			txid: result.transactionHash,
			userid: userid,
			image_uri: dataurl
		});

		var tokenId;
		const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);
		if (receipt && receipt.logs) {
			tokenId = web3.utils.hexToNumber(receipt.logs[0].topics[3]);
		}

		const txData = {
			txid: result.transactionHash,
			tokenId: tokenId,
			dataurl: dataurl,
			datahttp: "https://ipfs.io/ipfs/" + dataurl.split("ipfs://")[1]
		};

        return res.status(200).json({ success: true, data: txData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export const charge = async (address, value) => {
	try {
		const toAddress = address;

		var result = await web3.eth.sendTransaction({
			from: coinbase, 
			to: toAddress, 
			value: web3.utils.toWei(value, "ether")
		});
		// console.log(result);

		if (!result) {
			throw "Transaction failed";
		}

		var txData = {
			txid: result.transactionHash,
		};

		return txData;
	}
	catch (error) {
		throw error;
	}
};

export const getBalance = async (req, res) => {
	try {
		const userid = req.body.userid;
		const user = await User.findByPk(userid);
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const address = user.wallet;
		const balance = await web3.eth.getBalance(address);
		if (!balance) {
			return res.status(500).json({ success: false, error: "Transaction failed" });
		}

		const ethBalance = web3.utils.fromWei(balance, "ether");

		return res.status(200).json({ success: true, data: ethBalance });
	}
	catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

export const getOwnedTokens = async (req, res) => {
	try {
		const userid = req.body.userid;;
		const user = await User.findByPk(userid);
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const address = user.wallet;
		var tokens = await contract.methods.tokenOfOwner(address).call();
		if (!tokens) {
			return res.status(500).json({ success: false, error: "Transaction failed" });
		}
		tokens = tokens.map((token) => { return typeof token === "bigint" ? token.toString() : token; });
		// console.log(tokens);

		return res.status(200).json({ success: true, data: tokens });
	}
	catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
