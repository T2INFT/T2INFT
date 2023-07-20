import { File } from "nft.storage";
import fs from "fs";
import path from "path";
import main from "require-main-filename";
import { mkdirp } from "mkdirp";

const beroot = path.dirname(main()) + "/backend/";

export const fileFromPath = async (filePath, ftype) => {
    const content = await fs.promises.readFile(filePath);
    const type = ftype;
    return new File([content], path.basename(filePath), { type });
};

export const b64tobyte = (base64) => {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};

export const saveB64toFile = (dirPath, filename, content) => {
    mkdirp.sync(dirPath);
    const filePath = path.join(dirPath, filename);
    fs.writeFileSync(filePath, content, {encoding: 'base64'});
    return filePath;
}

