import BaseError from "./BaseError.js";


export default class FolderNotExistsError extends BaseError
{
    public constructor(folderPaht: string)
    {
        super(`The path "${folderPaht}" not exists`);
    }
}

