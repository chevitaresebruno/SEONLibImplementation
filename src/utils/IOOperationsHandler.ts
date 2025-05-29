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
    public static createFolder(folderCompleteName: fs.PathLike, force: boolean = true, debug: boolean = true): FolderAlredyExistsError | Error | void
    {
        if(fs.existsSync(folderCompleteName))
        {
            if(force)
            {
                console.log(`Warrning, the folder "${folderCompleteName}" alredy exists`);
                return;
            }
            else
            {
                throw new FolderAlredyExistsError(folderCompleteName.toString());
            }
        }

        let mkDirConf = { recursive: force };
        fs.mkdirSync(folderCompleteName, mkDirConf);
    }

    public static createFile(targetFolder: fs.PathLike, fileName: fs.PathLike, content: string, mode: FileOpenModes = FileOpenModes.WriteOrOverwrite, force: boolean = false, debug: boolean = true): FolderNotExistsError | FileAlredyExistsError | void
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
            if(!fs.existsSync(fileFullPath))
                { fs.writeFileSync(fileFullPath, ""); }
        }

        switch(mode)
        {
            case FileOpenModes.WriteOrOverwrite:
                fs.writeFileSync(fileFullPath, content);
                break;
            case FileOpenModes.Append:
                fs.appendFileSync(fileFullPath, content);
                break;
        }
    }
}

