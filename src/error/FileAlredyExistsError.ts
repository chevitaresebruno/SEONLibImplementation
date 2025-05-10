import BaseError from "./BaseError.js";


export default class FileAlredyExistsError extends BaseError
{
    public constructor(folderPath: string, filename: string, completeReferenceName?: string)
    {
        super(`The file "${filename}" at folder "${folderPath}" alredy exists. \nComplete Reference Name: ${completeReferenceName != undefined ? completeReferenceName : "the reference name was not specified."}`);
    }
}

