import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Transaction = sequelize.define("transaction", {
    txid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userid: DataTypes.INTEGER,
    imgid: DataTypes.STRING,
    image_uri: DataTypes.STRING,
    create_time: DataTypes.DATE,
});

Transaction.belongsTo(User, { foreignKey: "userid" });
Transaction.belongsTo(T2Image, { foreignKey: "imgid" });

export default Transaction;