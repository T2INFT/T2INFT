import Sequelize from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
    config.con.database, config.con.user, config.con.password, 
    {
        host: config.con.host,
        dialect: "mysql",
        define: {
            timestamps: false
        }
    }
);

export default sequelize;