import { PythonShell } from "python-shell";
import fs from "fs";
import path from "path";
import main from "require-main-filename";

import config from "../config/config.js";
import T2Image from "../models/t2image.js";

const root = path.dirname(main()) + "/";

// generate image
export const generate = async (req, res) => {
    try {
        console.log("------------Call generate------------");
        const userid = req.body.userid;
        const prompts = req.body.prompt;
        if (config.mode == 0) {
            console.log("------------generate test------------");
            const timgpath = root + config.test_imgs.img1;
            const tt2image = await T2Image.create({ userid: userid, img_path: timgpath, promts: prompts });
            const ttimgid = tt2image.null; // ?
            const timg = fs.readFileSync(timgpath);
            res.status(200).json({ success: true, data: {image: timg, imgid: ttimgid} });
        }
        else {
            let options = {
                mode: 'text',
                args: ["[" + prompts + "]", userid]
            };
            const pyresult = await PythonShell.run(root + config.models.main_sd, options);

            const imgpath = pyresult[-1];

            // get imgid then save to db
            const t2image = await T2Image.create({ userid: userid, img_path: imgpath, promts: prompts });
            const imgid = t2image.null; // ?

            // read image
            const img = fs.readFileSync(imgpath);

            res.status(200).json({ success: true, data: {image: img, imgid: imgid} });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// style transfer
export const mixer = async (req, res) => {
    try {
        console.log("------------Call mixer------------");
        const userid = req.body.userid;
        const prev_imgid = req.body.imgid;

        if (config.mode == 0) {
            console.log("------------mixer test------------");
            const timgpath = root + config.test_imgs.img2;
            const tprev_img = await T2Image.findByPk(prev_imgid);
            const tprompts = tprev_img.promts;
            const tt2image = await T2Image.create({ userid: userid, img_path: timgpath, promts: tprompts });
            const ttimgid = tt2image.null; // ?
            const timg = fs.readFileSync(timgpath);
            res.status(200).json({ success: true, data: {image: timg, imgid: ttimgid} });
        }
        else {
            let options = {
                mode: 'text',
                args: [userid]
            };
            const pyresult = await PythonShell.run(root + config.models.main_mixer, options);

            const imgpath = pyresult[-1];

            // get imgid then save to db
            const prev_img = await T2Image.findOne({ where: { imgid: prev_imgid } });
            if (!prev_img) {
                return res.status(404).json({ success: false, error: "Image not found" });
            }
            if (prev_img.userid != userid) {
                return res.status(404).json({ success: false, error: "The user does not owned the image" });
            }
            const promts = prev_img.prompts;
            const t2image = await T2Image.create({ userid: userid, img_path: imgpath, promts: promts });
            const imgid = t2image.null; // ?

            // read image
            const img = fs.readFileSync(imgpath);

            res.status(200).json({ success: true, data: {image: img, imgid: imgid} });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const grade = async (req, res) => {
    try {
        const imgid = req.body.imgid;
        if (!imgid) {
            return res.status(404).json({ success: false, error: "Image id not found" });
        }

        const t2image = await T2Image.findOne({ where: { imgid } });
        if (!t2image) {
            return res.status(404).json({ success: false, error: "Image not found" });
        }

        t2image.grade = req.body.grade;
        const result = await t2image.save();
        if (!result) {
            return res.status(500).json({ success: false, error: "Image grade failed" });
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
