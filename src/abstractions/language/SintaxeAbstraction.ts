import AttributeAbstraction from "../types/AttributeAbstraction.js";
import ClassAbstraction from "../oo/ClassAbstraction.js";
import { ModifierOptions } from "../shared/Enums.js";
import MethodAbstraction from "../oo/MethodAbstraction.js";

export interface CommentAbstraction
{
    startBlock: string;
    endBlock: string;
    inLine: string;
}


export interface CodeBlockAbstraction
{
    start: string;
    end: string;
}

export interface DocumentationBlock
{
    start: string;
    end: string;

    description: string;
    authorFormat: string;
    param: string;
    attr: string;
    return: string;
}

export class DeclareDocsOrder
{
    private first: string;
    private last: string;

    public constructor(first: string, last: string)
    {
        this.first = first;
        this.last = last;
    }

    public toString(): string
    {
        return `${this.first}\n${this.last}`;
    }
}


export default abstract class SintaxeAbstraction
{
    public extension: string;
    public codeBlock: CodeBlockAbstraction;
    public endline: string;

    public constructor(extension: string, codeBlock: CodeBlockAbstraction, endline: string = ";")
    {
        this.extension = extension;
        this.codeBlock = codeBlock;
        this.endline = endline;
    }

    public endlineLn(identation: number): string
    {
        return `${this.endline}\n${'\t'.repeat(identation)}`;
    }

    public declareClass(clazz: ClassAbstraction, identation: number = 0): string
    {
        return `${'\t'.repeat(identation)}${this.declareClassSignature(clazz)}${this.codeBlock.start}\n${this.declareClassBody(clazz, identation+1)}${this.codeBlock.end}`;
    }

    private declareClassBody(clazz: ClassAbstraction, identantion: number): string
    {
        return `${this.declareClassAttributes(clazz.getAttributes(), identantion)}\n${'\t'.repeat(identantion)}${'\t'.repeat(identantion)}${this.declareConstructor(clazz)}\n${this.declareClassMethods(clazz.getMethods(), identantion)}`;
    }

    private declareClassAttributes(attrs: AttributeAbstraction[], identantion: number): string
    {
        return attrs.map(attr => this.declareAttribute(attr)).join(this.endlineLn(identantion));
    }
    
    private declareClassMethods(methods: MethodAbstraction[], identantion: number): string
    {
        return methods.map(method => this.defineMethod(method)).join(this.endlineLn(identantion));
    }

    protected declareClassSignature(clazz: ClassAbstraction): string
    {
        switch(clazz.getModifier())
        {
            case ModifierOptions.ABSTRACT:
                return this.declareWithDocs(this.declareAbstractClass(clazz), this.declareClassDocs(clazz)).toString();
            case ModifierOptions.STATIC:
                return this.declareWithDocs(this.declareStaticClass(clazz), this.declareClassDocs(clazz)).toString();
            case ModifierOptions.CONCRETE:
                return this.declareWithDocs(this.declarePhysicalClass(clazz), this.declareClassDocs(clazz)).toString();
        }
    }

    protected defineMethod(method: MethodAbstraction): string
    {
        switch(method.getOption())
        {
            case ModifierOptions.ABSTRACT:
                return this.declareWithDocs(this.declareAbstractMethod(method), this.declareMethodDocs(method)).toString();
            case ModifierOptions.STATIC:
                return this.declareWithDocs(this.declareStaticMethod(method), this.declareMethodDocs(method)).toString();
            case ModifierOptions.CONCRETE:
                return this.declareWithDocs(this.declarePhysicalMethod(method), this.declareMethodDocs(method)).toString();
        }
    }

    public abstract declareWithDocs(artifact: string, documentation: string): DeclareDocsOrder;

    public abstract declareAttribute(attr: AttributeAbstraction): string;

    public abstract declareAttributeDocs(attr: AttributeAbstraction): string;

    public abstract declareConstructor(clazz: ClassAbstraction): string;

    public abstract declareConstructorDocs(clazz: ClassAbstraction): string;

    public abstract declarePhysicalClass(clazz: ClassAbstraction): string;

    public abstract declareStaticClass(clazz: ClassAbstraction): string;

    public abstract declareAbstractClass(clazz: ClassAbstraction): string;

    public abstract declareClassDocs(clazz: ClassAbstraction): string;

    public abstract declarePhysicalMethod(method: MethodAbstraction): string;

    public abstract declareAbstractMethod(method: MethodAbstraction): string;
    
    public abstract declareStaticMethod(method: MethodAbstraction): string;

    public abstract declareMethodDocs(method: MethodAbstraction): string;
}

