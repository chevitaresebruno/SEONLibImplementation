import IOOperationsHandler, { FileOpenModes } from '../../../utils/IOOperationsHandler'
import FolderAlredyExistsError from '../../../error/FolderAlredyExistsError';
import ITester, { TestDTO } from '../../ITete';
import FolderNotExistsError from '../../../error/FolderNotExistsError';
import FileAlredyExistsError from '../../../error/FileAlredyExistsError';
import Tester from '../../Tester';
import * as fs from 'fs';


export default class UtilsTest implements ITester
{
    private static readonly folderName: string = "./TestFolder";
    private static readonly fileName: string = "testFile.ts";

    public run(): TestDTO
    {
        if(fs.existsSync(UtilsTest.folderName))
            { fs.rmSync(UtilsTest.folderName, { recursive: true, force: true }); }
        let checker: TestDTO = this.testCreateFolder();
        if(checker.wasError())
            { return checker; }
        
        checker = this.testCreateFile();
        if(checker.wasError())
            { return checker; }

        fs.rmSync(UtilsTest.folderName, { recursive: true, force: true });

        return checker;
    }

    private testCreateFolder(): TestDTO
    {
        try
            { IOOperationsHandler.createFolder(UtilsTest.folderName, false, false); }
        catch(e)
        {
            if(e instanceof FolderAlredyExistsError)
                { return new TestDTO("Folder Alredy Exists", true); }
            else if(e instanceof Error)
                { return new TestDTO(e.message, true); }
        }

        try
            { IOOperationsHandler.createFolder(UtilsTest.folderName, false, false); }
        catch(e)
        {
            if(e instanceof FolderAlredyExistsError)
                { /* Espected Error */ }
            else if(e instanceof Error)
                { return new TestDTO(e.message, true); }
        }

        return TestDTO.success;
    }

    private testCreateFile(): TestDTO
    {
        try
            { IOOperationsHandler.createFile(UtilsTest.folderName, UtilsTest.fileName, "TestContent", FileOpenModes.WriteOrOverwrite, false, false); }
        catch(e)
        {
            if(e instanceof FolderNotExistsError)
                { return new TestDTO("Folder not Exists", true); }
            else if(e instanceof FileAlredyExistsError)
                { return new TestDTO("File alredy Exists", true); }
            else if(e instanceof Error)
                { return new TestDTO(e.message, true); }
        }

        try
            { IOOperationsHandler.createFile(UtilsTest.folderName, UtilsTest.fileName, "TestContent", FileOpenModes.WriteOrOverwrite, true, false); }
        catch(e)
        {
            if(e instanceof Error)
                    { return new TestDTO(e.message, true); }
        }

        try
            { IOOperationsHandler.createFile(UtilsTest.folderName, UtilsTest.fileName, "TestContent", FileOpenModes.WriteOrOverwrite, false, false); }
        catch(e)
        {
            if(e instanceof FileAlredyExistsError)
                { /* Expected Error */ }
            else if(e instanceof Error)
                { return new TestDTO(e.message, true); }
        }

        try
            { IOOperationsHandler.createFile(UtilsTest.folderName, UtilsTest.fileName, "TestContent", FileOpenModes.Append, true, false); }
        catch(e)
        {
            if(e instanceof Error)
                { return new TestDTO(e.message, true); }
        }

        return TestDTO.success;
    }
}


Tester.test({file: "IOOperaionsHandler.ts", artifact: "IIOperationHandler", description: "Deve criar a pasta ./TestFolder e arquivo ./TestFolder/test.ts de conteúdo TestContentTestContent", test: new UtilsTest()});

