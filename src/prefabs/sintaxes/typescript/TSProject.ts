import FileAbstraction from "../../../abstractions/project/FileAbstraction";
import PackageAbstraction from "../../../abstractions/project/PackageAbstraction";
import { TypeScriptClass, TypescriptMethod } from "./TSClass";
import { TypescriptSintaxe, typescriptSintaxe } from "./TSSintaxe";
import { TypeScriptTypes } from "./TSTypes";


export class TypescriptConstrains
{
    name: string;
    _type: TypeScriptTypes | null;
    isFunction: boolean;
    value: string;

    public constructor(name: string, _type: TypeScriptTypes | null, isFunction: boolean, value: TypeScriptTypes | TypescriptMethod)
    {
        this.name = name;
        this._type = _type;
        this.isFunction = isFunction;

        //@ts-ignore
        if(value.getOption != undefined)
        {
            //@ts-ignore
            let cm = typescriptSintaxe.defineClassMethod(value);
            this.value = `${cm.declaration}(${cm.arguments}) => { ${cm.body}; }`;
        }

        this.value = value.getName();
    }

    public toSintaxe(): string
    {
        if(this.isFunction)
            return `export const ${this.name} = ${this.value}`;
        return `export const ${this.name}: ${this._type} = `;
    }

    public getBody(): string
    {
        return "";
    }
}


export class TypescriptPackage extends PackageAbstraction
{
    public constrains: TypescriptConstrains[];

    public constructor(name: string, constrains: TypescriptConstrains[], classes: TypeScriptClass[] = [], packages: TypescriptPackage[] = [])
    {
        super(name, classes, packages);
        this.constrains = constrains;
    }
}


export class TypescriptFile extends FileAbstraction
{
    public constrains: TypescriptConstrains[];
    private dependencies: string;

    public constructor(name: string, dependencies: string, classes: TypeScriptClass[], sintaxe: TypescriptSintaxe, constrains: TypescriptConstrains[])
    {
        super(name, classes, sintaxe);
        this.constrains = constrains;
        this.dependencies = dependencies;
    }

    public buildFileContent(): string
    {
        return `${this.dependencies}\n\n${this.constrains.map(constrain => constrain.toSintaxe())}\n\n${super.buildFileContent()}`;
    }
}

    