import ArchitectureImplementationAbstraction from "../../abstractions/language/ArchitectureAbstraction.js";
import ClassAbstraction from "../../abstractions/oo/ClassAbstraction.js";
import FileAbstraction from "../../abstractions/project/FileAbstraction.js";
import FolderAbstracion from "../../abstractions/project/FolderAbstraction.js";
import PackageAbstraction from "../../abstractions/project/PackageAbstraction.js";
import { ProjectSpecifications } from "../../abstractions/ProjectAbstraction.js";
import AttributeAbstraction from "../../abstractions/types/AttributeAbstraction.js";
import PrimitiveTypeAbstraction from "../../abstractions/types/PrimitiveTypeAbstraction.js";
import TypeAbstraction from "../../abstractions/types/TypeAbstraction.js";
import PythonSintaxe, { PythonInteger, PythonString } from "../sintaxes/Python.js";


class DjangoModel extends ClassAbstraction
{
    public constructor(clazz: ClassAbstraction)
    {
        super(clazz.getName(), [], clazz.getAttributes().map(attr => { return DjangoModel.attributeToDjangoAttribute(attr); }))
    }

    private static attributeToDjangoAttribute(attr: AttributeAbstraction): AttributeAbstraction
    {
        return new AttributeAbstraction(attr.getName(), DjangoModel.typeToDjangoType(attr.getType()));
    }

    private static typeToDjangoType(_type: TypeAbstraction): ClassAbstraction
    {
        let className: string = "undefined";

        if(_type instanceof PrimitiveTypeAbstraction)
        {
            if(_type instanceof PythonInteger)
                { className = "IntegerField"; }
            else if(_type instanceof PythonString)
                { className = "CharField"; }
        }

        return new ClassAbstraction(className, [], []);
    }
}


class DjangoMVC implements ArchitectureImplementationAbstraction
{
    private pkg: FolderAbstracion[] = [];

    public implement(modelPackages: PackageAbstraction[]): FolderAbstracion[]
    {
        this.pkg = [];
        this.defineDjangoProjectPackages(modelPackages);
        return this.pkg;
    }

    private defineDjangoProjectPackages(modelPackages: PackageAbstraction[])
    {
        this.defineApps(modelPackages);
    } 

    private defineApps(modelpkg: PackageAbstraction[])
    {
        let appPkg = new FolderAbstracion("apps");

        modelpkg.forEach(pkg => appPkg.addSubfolder(new FolderAbstracion(pkg.getName(), [], this.defineAppFiles(pkg))));

        this.pkg.push(appPkg);
    }

    private defineAppFiles(app: PackageAbstraction): FileAbstraction[]
    {
        return [this.defineModelFile(app.getPackageLevelClasses())];
    }

    private defineModelFile(classes: ClassAbstraction[]): FileAbstraction
    {
        let modelClasses: ClassAbstraction[] = classes.map(clazz => { return new DjangoModel(clazz); });

        return new FileAbstraction("models", modelClasses, new PythonSintaxe());
    }
}


export const djangoMVCProject: ProjectSpecifications = {
    lenguage: new PythonSintaxe(),
    architecture: new DjangoMVC(),
}

