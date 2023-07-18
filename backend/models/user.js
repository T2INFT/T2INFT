import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

import T2Image from "./t2image.js";
import Transaction from "./transaction.js";

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

export default User;