
import express from "express";
import multer from "multer";
import sequelize from "./db/db.js";

import { registerValidate, loginValidate } from "./validations/auth.js";
import checkAuth from "./validations/checkAuth.js";
import * as authController from "./controllers/authController.js";
import * as bcController from "./controllers/bcController.js";

const app = express();
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

app.post('/auth/register', registerValidate, authController.register);
app.post('/auth/login', loginValidate, authController.login);
app.post('/auth/me', checkAuth, authController.me);
app.post('/users/profile', usersController.profile);

app.post("/user/createWallet", bcController.createWallet);
app.post("/mint", upload.single("image"), bcController.mint);
