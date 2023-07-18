import { DataTypes, Transaction } from "sequelize";
import sequelize from "../db/db.js";
import T2Image from "./t2image.js";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    wallet: DataTypes.STRING,
    reg_date: DataTypes.DATE,
});

User.hasMany(T2Image, { foreignKey: "userid" });
User.hasMany(Transaction, { foreignKey: "userid" });

export default User;