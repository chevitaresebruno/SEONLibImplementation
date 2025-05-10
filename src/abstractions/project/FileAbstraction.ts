import ClassAbstraction from "../oo/ClassAbstraction.js";
import Sintaxe from "../language/Sintaxe.js";


export default class FileAbstraction
{
    private name: string;
    protected classes: ClassAbstraction[];
    private sintaxe: Sintaxe;

    public constructor(name: string, classes: ClassAbstraction[], sintaxe: Sintaxe)
    {
        this.name = name;
        this.classes = classes;
        this.sintaxe = sintaxe;
    }

    public buildFileName(): string
    {
        return `${this.name}.${this.sintaxe.fileExtensions.main}`;
    }

    public buildFileContent(): string
    {
        return this.classes.map(clazz => this.buildClassContent(clazz)).join("\n\n");
    }

    private buildClassContent(clazz: ClassAbstraction, baseIdentation: number = 0): string
    {
        const clazzData = this.sintaxe.buildClassData(clazz);

        const classDeclaration = `${FileAbstraction.setIdentation(baseIdentation)}${clazzData.declaration}${this.sintaxe.reserverData.startCodeBlock}\n`
            const attributeDeclaration = FileAbstraction.setIdentation(baseIdentation+1) + clazzData.attributes.join(`${this.sintaxe.reserverData.endLineCode}\n${FileAbstraction.setIdentation(baseIdentation+1)}`);
            const classConstructor = this.buildMethodContent(clazzData._constructor.declaration, clazzData._constructor.arguments, clazzData._constructor.body, baseIdentation+1);
            const classMethods = FileAbstraction.setIdentation(baseIdentation+1) + clazzData.methods.map(method => this.buildMethodContent(method.declaration, method.arguments, method.body, baseIdentation+1)).join(FileAbstraction.setIdentation(baseIdentation+1));

        return `${classDeclaration}${attributeDeclaration}${classConstructor}${classMethods}${this.sintaxe.reserverData.endCodeBlock}`;
    }

    private buildMethodContent(declaration: string, args: string[], body: string[], identation: number): string
    {
        return `${declaration}${this.sintaxe.reserverData.startArgDeclaration}${args.join(this.sintaxe.reserverData.separeArgDeclaraion)}${this.sintaxe.reserverData.endArgDeclaraion}${this.sintaxe.reserverData.startCodeBlock}\n${FileAbstraction.setIdentation(identation+1)}${body.join(`${this.sintaxe.reserverData.endLineCode}\n${FileAbstraction.setIdentation(identation+1)}`)}${this.sintaxe.reserverData.endLineCode}\n\n`;
    }

    public getClases(): ClassAbstraction[]
    {
        return this.classes;
    }

    private static setIdentation(n: number): string
    {
        return '\t'.repeat(n);
    }
}

