import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const T2Image = sequelize.define("t2image", {
    imgid: {
        type: DataType.INTEGER,
        primaryKey: true
    },
    userid: DataTypes.INTEGER,
    img_path: DataTypes.STRING,
    promts: DataTypes.STRING,
    create_time: DataTypes.DATE,
});

T2Image.belongsTo(User, { foreignKey: "userid" });

export default T2Image;