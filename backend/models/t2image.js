import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

import User from "./user.js";
import Transaction from "./transaction.js";

const T2Image = sequelize.define("t2image", {
    imgid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    userid: DataTypes.INTEGER,
    img_path: DataTypes.STRING,
    promts: DataTypes.STRING,
    create_time: DataTypes.DATE,
});

export default T2Image;