import Sequelize from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(
    config.con.database, config.con.user, config.con.password, 
    {
        host: config.con.host,
        dialect: "mysql"
    }
);

export default sequelize;