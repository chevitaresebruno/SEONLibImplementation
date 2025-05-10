import ArchitectureImplementationAbstraction from "../../abstractions/language/ArchitectureAbstraction";
import FileAbstraction from "../../abstractions/project/FileAbstraction";
import FolderAbstracion from "../../abstractions/project/FolderAbstraction";
import PackageAbstraction from "../../abstractions/project/PackageAbstraction";
import { ProjectSpecifications } from "../../abstractions/ProjectAbstraction";
import CppSintaxe from "../sintaxes/Cpp";


export default class AnyWayCpp implements  ArchitectureImplementationAbstraction
{
    implement(modelPackages: PackageAbstraction[]): FolderAbstracion[]
    {
        return modelPackages.map(pkg => new FolderAbstracion(pkg.getName(), [], [
            new FileAbstraction(pkg.getName(), pkg.getPackageLevelClasses(), new CppSintaxe()),
        ]))
    }
}

export const anywayCppProject: ProjectSpecifications = {
    lenguage: new CppSintaxe(),
    architecture: new AnyWayCpp(),
}
