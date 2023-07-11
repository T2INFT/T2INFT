import { PythonShell } from "python-shell";
import path from "path";

import config from "../config/config.js";

const root = path.dirname(main()) + "/";


// generate image
export const stableDiffusion = async (req, res) => {
    try {
        console.log("------------Call stableDiffusion------------");
        const userid = req.body.userid;
        const prompts = req.body.prompts;

        let options = {
            mode: 'text',
            args: [prompts, userid]
        };
        const pyresult = await PythonShell.run(root + config.models_script.main_sd, options);

        // TODO:
        // get imgid then save to db
        const imgid = pyresult[-1];

        const img = await fs.readFile("output.png");
        res.status(200).json({ success: true, data: {image: img, imgid: imgid} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// style transfer
export const mixer = async (req, res) => {
    try {
        console.log("------------Call mixer------------");
        const userid = req.body.userid;

        let options = {
            mode: 'text',
            args: [userid]
        };
        const pyresult = await PythonShell.run(root + config.models_script.main_mixer, options);

        // TODO:
        // get imgid then save to db
        const imgid = pyresult[-1];

        const img = await fs.readFile("output.png");
        res.status(200).json({ success: true, data: {image: img, imgid: imgid} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};