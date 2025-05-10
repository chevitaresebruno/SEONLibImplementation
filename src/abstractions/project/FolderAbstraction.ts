import FileAbstraction from "./FileAbstraction";

export default class FolderAbstracion
{
    private name: string;
    private subfolders: FolderAbstracion[];
    private files: FileAbstraction[];

    public constructor(name: string, subfolders: FolderAbstracion[] = [], files: FileAbstraction[] = [])
    {
        this.name = name;
        this.subfolders = subfolders;
        this.files = files;
    }

    public getName(): string
    {
        return this.name;
    }

    public getFiles(): FileAbstraction[]
    {
        return this.files;
    }

    public getSubfolders(): FolderAbstracion[]
    {
        return this.subfolders;
    }

    public addSubfolder(folder: FolderAbstracion)
    {
        this.subfolders.push(folder);
    }

    public addFile(file: FileAbstraction)
    {
        this.files.push(file);
    }
}