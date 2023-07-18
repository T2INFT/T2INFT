import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

import User from "./user.js";
import T2Image from "./t2image.js";

const Transaction = sequelize.define("transaction", {
    txid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userid: DataTypes.INTEGER,
    imgid: DataTypes.INTEGER,
    image_uri: DataTypes.STRING,
    create_time: DataTypes.DATE,
});

export default Transaction;