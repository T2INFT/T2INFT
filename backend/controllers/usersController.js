import Transaction from "../models/transaction.js";

export const profile = async (req, res) => {
    try {
        console.log("------------Call profile------------");
        const { userid } = req.body;

        // search transaction in db by email
        const transaction = await Transaction.findAll({ where: { userid } });
        // if (!transaction) {
        //     return res.status(400).json({ message: "You have no record of any transactions." });
        // }

        // return info
        //const payload = { id: transaction.txid ,time: transaction.create_time, image: transaction.image_uri};
        const payload ={ info: transaction };

        res.status(200).json({ success: true, data: payload });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};