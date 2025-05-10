import * as fs from 'fs';
import FolderAlredyExistsError from '../error/FolderAlredyExistsError.js';
import FolderNotExistsError from '../error/FolderNotExistsError.js';
import FileAlredyExistsError from '../error/FileAlredyExistsError.js';


export enum FileOpenModes
{
    WriteOrOverwrite,
    Append,
}


export default class IOOperationsHandler
{
    private static error: Error | null = null;

    public static createFolder(folderCompleteName: fs.PathLike, force: boolean = true, debug: boolean = true): FolderAlredyExistsError | Error | void
    {
        if(fs.existsSync(folderCompleteName))
        {
            if(force)
            {
                console.log(`Warrning, the folder "${folderCompleteName}" alredy exists`);
            }
            else
            {
                throw new FolderAlredyExistsError(folderCompleteName.toString());
            }
        }

        IOOperationsHandler.error = null;
        let mkDirConf = { recursive: force };
        let mkDirErrorHandler = debug ? IOOperationsHandler.defaultCallBackError : (err: Error | null)=>{};

        fs.mkdir(folderCompleteName, mkDirConf, mkDirErrorHandler);
        if(IOOperationsHandler.error != null)
            { throw IOOperationsHandler.error; }
    }

    public static createFile(targetFolder: fs.PathLike, fileName: fs.PathLike, content: string, mode: FileOpenModes = FileOpenModes.WriteOrOverwrite, force: boolean = false, debug: boolean = true): FolderNotExistsError | void
    {
        const fileFullPath = targetFolder.toString().endsWith("/") ? `${targetFolder}${fileName}` : `${targetFolder}/${fileName}`; /** Build the full file name with directory and name. */

        /**
         * Check if the target folder exists.
         * if force == true, create the folder;
         * else return an error.
         */
        if(!fs.existsSync(targetFolder))
        {
            if(force)
                { IOOperationsHandler.createFolder(targetFolder, true, debug); }
            else
                { throw new FolderNotExistsError(targetFolder.toString()); }
        }

        /**
         * Check if the file exists in target folder;
         * if not exists, create it.
         */
        if(fs.existsSync(fileFullPath))
        {
            /* if force == false, this will trhow an error. It prevent overwrite the file */
            if(!force)
                { throw new FileAlredyExistsError(targetFolder.toString(), fileName.toString(), fileFullPath); }
        }
        else
        {
            IOOperationsHandler.error = null;
            fs.open(fileFullPath, "r+", (err, fd)=>{IOOperationsHandler.defaultCallBackError(err, fileName.toString()); });
            if(IOOperationsHandler.error != null)
                { throw IOOperationsHandler.error; }
        }

        IOOperationsHandler.error = null;
        switch(mode)
        {
            case FileOpenModes.WriteOrOverwrite:
                fs.writeFile(fileFullPath, content, ()=>{IOOperationsHandler.defaultNoParamsCallBack(fileFullPath, debug)});
                if(IOOperationsHandler.error != null)
                    throw IOOperationsHandler.error;
                break;
            case FileOpenModes.Append:
                fs.appendFile(fileFullPath, content, ()=>{IOOperationsHandler.defaultNoParamsCallBack(fileFullPath, debug)});
                if(IOOperationsHandler.error != null)
                    throw IOOperationsHandler.error;
                break;
        }
    }

    private static defaultNoParamsCallBack(fileReference: string, debug: boolean): void
    {
        const text = `Error while creating "${fileReference}"`;

        if(debug)
            { console.error(text); }

        IOOperationsHandler.error = new Error(text);
    }

    private static defaultCallBackError(err: Error | null, fileName: string | undefined)
    {
        if(err)
        {
            console.error(`Error while creating "${err}"`);
            IOOperationsHandler.error = err;
            return;
        }

        console.log(`Successfull creating of "${fileName}".`);
    }
}

