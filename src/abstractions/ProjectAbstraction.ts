import FolderAlredyExistsError from "../error/FolderAlredyExistsError.js";
import IOOperationsHandler, { FileOpenModes } from "../utils/IOOperationsHandler.js";
import ArchitectureImplementationAbstraction from "./language/ArchitectureAbstraction.js";
import Sintaxe from "./language/Sintaxe.js";
import FolderAbstracion from "./project/FolderAbstraction.js";
import PackageAbstraction from "./project/PackageAbstraction.js";


export interface ProjectSpecifications
{
    lenguage: Sintaxe;
    architecture: ArchitectureImplementationAbstraction;
}


export default class ProjectAbstraction
{
    private name: string;
    private about: string;
    private specifications: ProjectSpecifications;
    private corePackages: PackageAbstraction[];
    private folders: FolderAbstracion[];

    public constructor(name: string, about: string, specifications: ProjectSpecifications, packages: PackageAbstraction[])
    {
        this.name = name;
        this.about = about;
        this.specifications = specifications;
        this.corePackages = packages;
        this.folders = [];
    }

    public createProject(force: boolean = true): void
    {
        IOOperationsHandler.createFolder(this.name, true, true);
        IOOperationsHandler.createFile(this.name, "readme.md", this.about, FileOpenModes.WriteOrOverwrite, true);
        this.folders = this.specifications.architecture.implement(this.corePackages);
        this.folders.forEach(_package => this.buildPackage(this.name, _package, force));
    }

    private buildPackage(targetFolder: string, _package: FolderAbstracion, force: boolean): FolderAlredyExistsError | void
    {
        const packageFolder = `${targetFolder}/${_package.getName()}`;

        IOOperationsHandler.createFolder(packageFolder, force); // Creating the package folders
        _package.getFiles().forEach(file => IOOperationsHandler.createFile(packageFolder, file.buildFileName(), file.buildFileContent(), FileOpenModes.WriteOrOverwrite, force)) // Creating each file of package
        
        _package.getSubfolders().forEach(subfolder => this.buildPackage(packageFolder, subfolder, force));
    }
}

