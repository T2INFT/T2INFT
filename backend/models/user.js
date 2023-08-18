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
    pub_key: DataTypes.STRING,
    priv_key: DataTypes.STRING,
    reg_date: DataTypes.DATE,
});

export default User;