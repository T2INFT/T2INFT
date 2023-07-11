import fs from "fs";
import Transaction from "../models/transaction.js";
import T2Image from "../models/t2image.js";

export const profile = async (req, res) => {
    try {
        console.log("------------Call profile------------");
        const { userid } = req.body;

        const user = await User.findOne({ where: { userid } });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const unminted = async (req, res) => {
    try {
        console.log("------------Call /users/unminted------------");
        const { userid } = req.body;

        const unminted = await T2Image.findAll(
            { 
                where: { userid },
                include: [
                    { 
                        model: Transaction,
                        required: false // left outer join
                    }
                ]
            }
        );
        
        let unminted_imgs = [];
        for (let i = 0; i < unminted.length; i++) {
            let img = fs.readFileSync(unminted[i].img_path);
            unminted_imgs.push({image: img, imgid: unminted[i].imgid});
        }
        res.status(200).json({ success: true, data: unminted_imgs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const transactions = async (req, res) => {
    try {
        console.log("------------Call /users/transactions------------");
        const { userid } = req.body;

        // search transaction in db by email
        const transaction = await Transaction.findAll({ where: { userid } });

        const minted_imgs = [];
        for (let i = 0; i < transaction.length; i++) {
            let img = fs.readFileSync(transaction[i].img_path);
            minted_imgs.push({image: img, imgid: transaction[i].imgid, txid: transaction[i].txid});
        }

        res.status(200).json({ success: true, data: minted_imgs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};