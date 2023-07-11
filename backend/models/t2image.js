import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const T2Image = sequelize.define("t2image", {
    imgid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userid: DataTypes.INTEGER,
    create_time: DataTypes.DATE,
});

export default T2Image;