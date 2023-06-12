import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Transaction = sequelize.define("transaction", {
    txid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userid: DataTypes.INTEGER,
    image_uri: DataTypes.STRING,
    create_time: DataTypes.DATE,
});

export default Transaction;