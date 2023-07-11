
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

// email, username, password
app.post("/auth/register", registerValidate, authController.register);
// email, password
app.post("/auth/login", loginValidate, authController.login);
// token
app.post("/auth/me", checkAuth, authController.me);
// userid
app.post("/users/profile", usersController.profile);

// userid, prompt


// userid
app.post("/user/createWallet", bcController.createWallet);
// userid, privateKey, image(file), prompt
app.post("/mint", upload.single("image"), bcController.mint);
// userid, value
app.post("/charge", bcController.charge);
// userid
app.get("/getBalance", bcController.getBalance);
// userid
app.get("/getOwnedTokens", bcController.getOwnedTokens);
