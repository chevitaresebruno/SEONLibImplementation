import FolderAbstracion from "../project/FolderAbstraction.js";
import PackageAbstraction from "../project/PackageAbstraction.js";


export default interface ArchitectureImplementationAbstraction
{
    implement(modelPackages: PackageAbstraction[]): FolderAbstracion[];
}

