import { PythonShell } from "python-shell";
import fs from "fs";
import path from "path";
import main from "require-main-filename";
import axios from "axios";
import FormData from "form-data";

import config from "../config/config.js";
import T2Image from "../models/t2image.js";
import { b64tobyte, saveB64toFile } from "../utils/utils.js";

const root = path.dirname(main()) + "/";

// generate image
export const generate = async (req, res) => {
    try {
        const userid = req.body.userid;
        const prompts = req.body.prompt;
        if (!prompts) {
            return res.status(400).json({ success: false, error: "Prompt cannot be empty" });
        }
        if (config.mode == 0) {
            const timgpath = root + config.test_imgs.img1;
            const tt2image = await T2Image.create({ userid: userid, img_path: timgpath, promts: prompts });
            const ttimgid = tt2image.null; // ?
            const timg = fs.readFileSync(timgpath);
            res.status(200).json({ success: true, data: {image: timg, imgid: ttimgid} });
        }
        else {

            const pdata = new URLSearchParams({
                prompt: prompts,
                userid: userid
            });
            const result = await axios.post(config.gpu_server + "/generate", pdata);
            if (result.status != 200) {
                return res.status(500).json({ success: false, error: "Generate image failed" });
            }
            
            const imgbuffer = result.data.data.base64;
            // save image to local
            const imgpath = saveB64toFile(root + config.img_save_path + userid, Date.now() + ".png", imgbuffer);
            console.log(imgpath);

            // get imgid then save to db
            const t2image = await T2Image.create({ userid: userid, img_path: imgpath, promts: prompts });
            const imgid = t2image.null; // ?

            // read image
            const img = fs.readFileSync(imgpath);
            // const img = b64tobyte(imgbuffer);

            res.status(200).json({ success: true, data: {image: img, imgid: imgid} });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// style transfer
export const mixer = async (req, res) => {
    try {
        const userid = req.body.userid;
        const prev_imgid = req.body.imgid;
        const previmg = await T2Image.findByPk(prev_imgid);
        if (!previmg) {
            return res.status(404).json({ success: false, error: "Image not found" });
        }

        if (config.mode == 0) {
            const timgpath = root + config.test_imgs.img2;
            const tprev_img = await T2Image.findByPk(prev_imgid);
            const tprompts = tprev_img.promts;
            const tt2image = await T2Image.create({ userid: userid, img_path: timgpath, promts: tprompts });
            const ttimgid = tt2image.null; // ?
            const timg = fs.readFileSync(timgpath);
            res.status(200).json({ success: true, data: {image: timg, imgid: ttimgid} });
        }
        else {
            const image = fs.createReadStream(previmg.img_path);
            // console.log(image);
            
            const pdata = new FormData();
            pdata.append("userid", userid);
            pdata.append("imgid", prev_imgid);
            pdata.append("image", fs.createReadStream(previmg.img_path));

            const post_config = {
                header: {
                    ...pdata.getHeaders()
                }
            };
            
            const result = await axios.post(config.gpu_server + "/mixer", pdata, post_config);
            if (result.status != 200) {
                return res.status(500).json({ success: false, error: "Mix image failed" });
            }

            console.log(result.data);

            const imgbuffer = result.data.data.base64;
            const imgpath = saveB64toFile(root + config.img_save_path + userid, Date.now() + ".png", imgbuffer);
            console.log(imgpath);

            const promts = previmg.prompts;
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
