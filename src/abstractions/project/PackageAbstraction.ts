import ClassAbstraction from "../oo/ClassAbstraction.js";


export default class PackageAbstraction
{
    private classes: ClassAbstraction[];
    private packages: PackageAbstraction[];
    private name: string;

    public constructor(name: string, classes: ClassAbstraction[] = [], packages: PackageAbstraction[] = [])
    {
        this.name = name;
        this.packages = packages;
        this.classes = classes;
    }

    public addPackage(pkg: PackageAbstraction)
    {
        this.packages.push(pkg);
    }

    public getName(): string
    {
        return this.name;
    }

    public getPackageLevelClasses(): ClassAbstraction[]
    {
        return this.classes;
    }
}

