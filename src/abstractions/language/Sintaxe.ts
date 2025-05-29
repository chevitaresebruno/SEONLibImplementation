import ClassAbstraction from "../oo/ClassAbstraction";
import MethodAbstraction from "../oo/MethodAbstraction";
import ArggumentAbstraction from "../types/ArggumentAbstraction";
import AttributeAbstraction from "../types/AttributeAbstraction";


export class ClassImplementationConfigOrder
{
    private func: (param: ClassAbstraction | AttributeAbstraction | ArggumentAbstraction | MethodAbstraction)=>string;
    private separator: string;

    public constructor(func: (param: ClassAbstraction | AttributeAbstraction | ArggumentAbstraction | MethodAbstraction)=>string, separator: string = " ")
    {
        this.func = func;
        this.separator = separator;
    }

    public call(param: ClassAbstraction | AttributeAbstraction | ArggumentAbstraction | MethodAbstraction): string
    {
        return `${this.func(param)}${this.separator}`;
    }
}


export interface ClassImplementation
{
    classKeyword(clazz: ClassAbstraction): string;
    className(clazz: ClassAbstraction): string;
    classVisibility(clazz: ClassAbstraction): string;
    classModifier(clazz: ClassAbstraction): string;

    attrVisibility(attr: AttributeAbstraction): string;
    attrModifier(attr: AttributeAbstraction): string;
    attrName(attr: AttributeAbstraction): string;
    attrType(attr: AttributeAbstraction): string;
    attrDefaultValue(attr: AttributeAbstraction): string;

    constructorVisibility(clazz: ClassAbstraction): string;
    constructorKeyword(clazz: ClassAbstraction): string;

    argumentName(arg: ArggumentAbstraction): string;
    argumentType(arg: ArggumentAbstraction): string;
    argumentDefaultValue(arg: ArggumentAbstraction): string;

    methodKeyword(method: MethodAbstraction): string;
    methodVisibility(method: MethodAbstraction): string;
    methodModifier(method: MethodAbstraction): string;
    methodName(method: MethodAbstraction): string;
    methodReturn(method: MethodAbstraction): string;
}


export abstract class ClassImplementationOrder
{
    protected clazz: ClassImplementation | null;

    public constructor(clazz: ClassImplementation | null = null)
    {
        this.clazz = clazz;
    }

    public setClass(clazz: ClassImplementation)
    {
        this.clazz = clazz;
    }

    public abstract getDeclarationOrder(): ClassImplementationConfigOrder[];
    public abstract getAttributeDeclarationOrder(): ClassImplementationConfigOrder[];
    public abstract getConstructorDeclarationOrder(): ClassImplementationConfigOrder[];
    public abstract getArggumentDeclarationOrder(): ClassImplementationConfigOrder[];
    public abstract getMethodsDeclarationOrder(): ClassImplementationConfigOrder[];
    public abstract getMehodEmptyBody(): string;
}


export interface ConstructorData
{
    declaration: string,
    arguments: string[],
    body: string[],
}

export interface MethodsData
{
    declaration: string;
    arguments: string[];
    body: string[];
}

export interface ClazzData
{
    declaration: string,
    attributes: string[],
    _constructor: ConstructorData,
    methods: MethodsData[],
}

export interface SintaxeReservedData
{
    startCodeBlock: string,
    endCodeBlock: string,
    endLineCode: string,
    startArgDeclaration: string,
    endArgDeclaraion: string,
    separeArgDeclaraion: string,
    classReference: string,
    classSubAccess: string,
}

export interface FileExtensionData
{
    main: string,
    others?: string[]
}


export default class Sintaxe
{
    private clsImpl: ClassImplementationOrder;
    public readonly reserverData: SintaxeReservedData;
    public readonly fileExtensions: FileExtensionData;

    public constructor(clsImpl: ClassImplementationOrder, reservedData: SintaxeReservedData, fileExtensios: FileExtensionData)
    {
        this.clsImpl = clsImpl;
        this.reserverData = reservedData;
        this.fileExtensions = fileExtensios;
    }

    public buildClassData(clazz: ClassAbstraction): ClazzData
    {
        return {
            declaration: this.declareClass(clazz),
            attributes: this.declareClassAttrs(clazz),
            _constructor: this.declareClassConstructor(clazz),
            methods: this.defineClassMethods(clazz),
        }
    }

    private declareClass(clazz: ClassAbstraction): string
    {
        return this.clsImpl.getDeclarationOrder().map(order => order.call(clazz)).join("");
    }

    private declareClassAttrs(clazz: ClassAbstraction): string[]
    {
        return clazz.getAttributes().map(attr => this.declareClassAttr(attr));
    }

    private declareClassAttr(attr: AttributeAbstraction): string
    {
        return this.clsImpl.getAttributeDeclarationOrder().map(order => order.call(attr)).join("");
    }

    private declareClassConstructor(clazz: ClassAbstraction): ConstructorData
    {
        const declaration = this.clsImpl.getConstructorDeclarationOrder().map(order => order.call(clazz)).join("");

        const params = clazz.getAttributes().map(attr => this.decalreArggument(attr.asArgument()));

        const body = clazz.getAttributes().map(attr => this.defineClassAttr(attr));

        return {declaration: declaration, arguments: params, body: body};
    }

    private decalreArggument(argg: ArggumentAbstraction): string
    {
        return this.clsImpl.getArggumentDeclarationOrder().map(order => order.call(argg)).join("");
    }

    private defineClassAttr(attr: AttributeAbstraction): string
    {
        return `${this.reserverData.classReference}${this.reserverData.classSubAccess}${attr.getName()}: ${attr.getType()} = ${attr.getName()}`;
    }

    private defineClassMethods(clazz: ClassAbstraction): MethodsData[]
    {
        return clazz.getMethods().map(method => this.defineClassMethod(method));
    }

    public defineClassMethod(method: MethodAbstraction): MethodsData
    {
        const decalration = this.clsImpl.getMethodsDeclarationOrder().map(order => order.call(method)).join("");
        const args = method.getArguments().map(arg => this.decalreArggument(arg));
        const body = method.getbody();

        return {
            declaration: decalration,
            arguments: args,
            body: body,
        }
    }
}

