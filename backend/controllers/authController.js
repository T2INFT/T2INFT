import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "../config/config.js";
import User from "../models/user.js";

export const register = async (req, res) => {
    try {
        console.log("------------Call register------------");
        console.log(req.body);
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // validate if email is unique
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ success: false, error: "The email already taken" });
        }

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const payload = { id: newUser.null }; // ?
        const token = jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expire,
        });

        res.status(200).json({ success: true, data:  {token: token, userid: newUser.null} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        console.log("------------Call login------------");
        const { email, password } = req.body;

        // search user in db by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        // check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        // return token
        const payload = { id: user.id };
        const token = jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expire,
        });

        res.status(200).json({ success: true, data: {token: token, userid: user.id} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const me = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: [
                "id",
                "username",
                "email",
                "wallet",
                "reg_date",
            ],
        });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};