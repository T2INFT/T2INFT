
import express from "express";
import sequelize from "./db/db.js";

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
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());

const PORT = process.env.PORT || 4000;

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
 * return: {success: true, data: {token, userid}}
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
app.post("/users/profile", usersController.profile);
/**
 * get user unminted images
 * params: userid
 * return: {success: true, data: [{image, imgid}]]}
 */
app.post("/users/unminted", usersController.unminted);
/**
 * get user minted images
 * params: userid
 * return: {success: true, data: [{image, imgid, txid}]}
 */
app.post("/users/transactions", usersController.transactions);
/**
 * get user wallet
 * params: userid
 * return: {success: true, data: {address, privateKey}}
 */
app.post("/bc/createWallet", bcController.createWallet);

/**
 * get generated image
 * params: userid, prompt
 * return: {success: true, data: {image, imgid}}
 */
app.post("/model/generate", modelController.generate);
/**
 * get generated image
 * params: userid, prompt
 * return: {success: true, data: {image, imgid}}
 */
app.post("/model/mixer", modelController.mixer);
/**
 * grade image
 * params: imgid, grade
 * return: {success: true, data}
 */
app.post("/model/grade", modelController.grade);

/**
 * mint image
 * params: userid, privateKey, imgid
 * return: {success: true, data: {txid, tokenId, dataurl, datahttp}}
 */
app.post("/bc/mint", bcController.mint);
/**
 * charge user
 * params: userid, value
 * return: {success: true, data: {txid}}
 */
app.post("/bc/charge", bcController.charge);
/**
 * get user balance
 * params: userid
 * return: {success: true, data: {balance}}
 */
app.get("/bc/getBalance", bcController.getBalance);
/**
 * get user owned tokens
 * param: userid
 * return: {success: true, data: {[tokenid]]}}
 */
app.get("/bc/getOwnedTokens", bcController.getOwnedTokens);
