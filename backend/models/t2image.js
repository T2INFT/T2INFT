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

T2Image.belongsTo(User, { foreignKey: "userid" });

export default T2Image;