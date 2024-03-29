
import express from "express";
import sequelize from "./db/db.js";
import morgan from "morgan";

import config from "./config/config.js";
import { registerValidate, loginValidate } from "./validations/auth.js";
import checkAuth from "./validations/checkAuth.js";
import * as authController from "./controllers/authController.js";
import * as usersController from "./controllers/usersController.js";
import * as bcController from "./controllers/bcController.js";
import * as modelController from "./controllers/modelController.js";
import "./models/modelRelation.js";

const app = express();
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Accpet,Authorization");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());

app.use(morgan("[:date[iso]] Started :method :url for :remote-addr", true));
app.use(morgan("[:date[iso]] Completed :status :res[content-length] in :response-time ms"));

const PORT = config.port || 4000;

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}.`);});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    })

/** 
 * register user
 * params: email, username, password 
 * return: {success: true, data: {token, userid}}
 */ 
app.post("/auth/register", registerValidate, authController.register);
/**
 * login user
 * params: email, password
 * return: {success: true, data: {token, userid, wallet: {address, privateKey}}}
 */
app.post("/auth/login", loginValidate, authController.login);
/**
 * logout user
 * params: token
 * return: {success: true, data}
 */
app.post("/auth/me", checkAuth, authController.me);

/**
 * get user info
 * params: userid
 * return: {success: true, data: user}
 */
app.post("/users/profile", checkAuth, usersController.profile);
/**
 * get user unminted images
 * params: userid
 * return: {success: true, data: [{image, imgid}]]}
 */
app.post("/users/unminted", checkAuth, usersController.unminted);
/**
 * get user minted images
 * params: userid
 * return: {success: true, data: [{image, imgid, txid, dataurl}]}
 */
app.post("/users/transactions", checkAuth, usersController.transactions);

/**
 * get generated image
 * params: userid, prompt
 * return: {success: true, data: {image, imgid}}
 */
app.post("/model/generate", checkAuth, modelController.generate);
/**
 * get generated image
 * params: userid, prompt
 * return: {success: true, data: {image, imgid}}
 */
app.post("/model/mixer", checkAuth, modelController.mixer);
/**
 * grade image
 * params: userid, imgid, grade
 * return: {success: true}
 */
app.post("/model/grade", checkAuth, modelController.grade);

/**
 * mint image
 * params: userid, privateKey, imgid
 * return: {success: true, data: {txid, tokenId, dataurl, datahttp}}
 */
app.post("/bc/mint", checkAuth, bcController.mint);
