import BaseError from "./BaseError.js";


export default class FolderAlredyExistsError extends BaseError
{
    public constructor(folderPaht: string)
    {
        super(`The path "${folderPaht}" alredy exists`);
    }
}

