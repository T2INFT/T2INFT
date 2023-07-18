
import express from "express";
import multer from "multer";
import sequelize from "./db/db.js";

import { registerValidate, loginValidate } from "./validations/auth.js";
import checkAuth from "./validations/checkAuth.js";
import * as authController from "./controllers/authController.js";
import * as usersController from "./controllers/usersController.js";
import * as bcController from "./controllers/bcController.js";
import * as modelController from "./controllers/modelController.js";

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

var upload = multer({ dest: "upload/"});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}.`);});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    })

// register user, return {success: true, data: {token, userid}}
// email, username, password
app.post("/auth/register", registerValidate, authController.register);
// login user, return {success: true, data: {token, userid}}
// email, password
app.post("/auth/login", loginValidate, authController.login);
// logout user, return {success: true, data}
// token
app.post("/auth/me", checkAuth, authController.me);

// get user info, return {success: true, data: user}
// userid
app.post("/users/profile", usersController.profile);
// get user unminted images, return {success: true, data: [{image, imgid}]]}
// userid
app.post("/users/unminted", usersController.unminted);
// get user minted images, return {success: true, data: [{image, imgid, txid}]}
// userid
app.post("/users/transactions", usersController.transactions);

// get generated image, return {success: true, data: {image, imgid}}
// userid, prompt
app.post("/generate", modelController.generate);
// get mixed image, return {success: true, data: {image, imgid}}
// userid, imgid
app.post("/mixer", modelController.mixer);

// get user wallet, return {success: true, data: {address, privateKey}}
// userid
app.post("/user/createWallet", bcController.createWallet);
// mint image, return {success: true, data: {txid, tokenId, dataurl, datahttp}}
// userid, privateKey, imgid
app.post("/mint", bcController.mint);
// charge user, return {success: true, data: {txid}}
// userid, value
app.post("/charge", bcController.charge);
// get user balance, return {success: true, data: {balance}}
// userid
app.get("/getBalance", bcController.getBalance);
// get user owned tokens, return {success: true, data: {[tokenid]]}}
// userid
app.get("/getOwnedTokens", bcController.getOwnedTokens);
