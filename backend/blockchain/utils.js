import { File } from "nft.storage";
import fs from "fs";
import path from "path";
import main from "require-main-filename";

const beroot = path.dirname(main()) + "/backend/";

export const fileFromPath = async (filePath, ftype) => {
    const content = await fs.promises.readFile(filePath);
    const type = ftype;
    return new File([content], path.basename(filePath), { type });
};
