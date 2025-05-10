import Sintaxe, { ClassImplementation, ClassImplementationConfigOrder, ClassImplementationOrder, FileExtensionData, SintaxeReservedData } from "../../../abstractions/language/Sintaxe";
import { ModifierWrapper, VisibilityWrapper } from "../../../abstractions/language/Wrappers";
import ClassAbstraction from "../../../abstractions/oo/ClassAbstraction";
import MethodAbstraction from "../../../abstractions/oo/MethodAbstraction";
import { ModifierOptions, VisibilityOptions } from "../../../abstractions/shared/Enums";
import ArggumentAbstraction from "../../../abstractions/types/ArggumentAbstraction";
import AttributeAbstraction from "../../../abstractions/types/AttributeAbstraction";


class TypeScriptWrapper implements VisibilityWrapper, ModifierWrapper
{
    wrapModifier(modifier: ModifierOptions): string
    {
        switch(modifier)
        {
            case ModifierOptions.STATIC:
                return "static";
            case ModifierOptions.ABSTRACT:
                return "abstract";
            case ModifierOptions.CONCRETE:
                return "";
        }
    }

    wrapVisibility(visibility: VisibilityOptions): string
    {
        switch(visibility)
        {
            case VisibilityOptions.PUBLIC:
                return "public";
            case VisibilityOptions.PRIVATE:
                return "private";
            case VisibilityOptions.PROTECTED:
                return "protected";
        }
    }
}


const tsWrapper = new TypeScriptWrapper();


class TypeScriptClassImplemetantion implements ClassImplementation
{
    classKeyword(clazz: ClassAbstraction): string {
        return "class";
    }
    className(clazz: ClassAbstraction): string {
        return clazz.getName();
    }
    classVisibility(clazz: ClassAbstraction): string {
        return tsWrapper.wrapVisibility(clazz.getVisibility());
    }
    classModifier(clazz: ClassAbstraction): string {
        return tsWrapper.wrapModifier(clazz.getModifier());
    }

    attrVisibility(attr: AttributeAbstraction): string {
        return tsWrapper.wrapVisibility(attr.getVisibility());
    }

    attrModifier(attr: AttributeAbstraction): string {
        return "";
    }

    attrName(attr: AttributeAbstraction): string {
        return attr.getName();
    }

    attrType(attr: AttributeAbstraction): string {
        return attr.getType().getName();
    }

    constructorVisibility(clazz: ClassAbstraction): string {
        return "public";
    }

    constructorKeyword(clazz: ClassAbstraction): string {
        return "constructor";
    }

    argumentName(arg: ArggumentAbstraction): string {
        return arg.getName();
    }

    argumentType(arg: ArggumentAbstraction): string {
        return arg.getType().getName();
    }

    methodKeyword(method: MethodAbstraction): string {
        return "";
    }

    methodVisibility(method: MethodAbstraction): string {
        return tsWrapper.wrapVisibility(method.getVisibility());
    }

    methodModifier(method: MethodAbstraction): string {
        return "";
    }

    methodName(method: MethodAbstraction): string {
        return method.getName();
    }

    methodReturn(method: MethodAbstraction): string {
        return method.getReturn().getName();
    }
    
}


class TypescriptClassImplementationOrder extends ClassImplementationOrder
{
    public getDeclarationOrder(): ClassImplementationConfigOrder[] {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.methodKeyword),
            new ClassImplementationConfigOrder(this.clazz.methodName, ""),
        ]
    }

    public getAttributeDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.attrVisibility),
            new ClassImplementationConfigOrder(this.clazz.attrModifier),
            new ClassImplementationConfigOrder(this.clazz.attrName, ": "),
            new ClassImplementationConfigOrder(this.clazz.attrType, ""),
        ]
    }

    public getConstructorDeclarationOrder(): ClassImplementationConfigOrder[] {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.constructorVisibility),
            new ClassImplementationConfigOrder(this.clazz.constructorKeyword, ""),
        ]
    }

    public getArggumentDeclarationOrder(): ClassImplementationConfigOrder[] {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.argumentName, ": "),
            new ClassImplementationConfigOrder(this.clazz.argumentType, ""),
        ]
    }

    public getMethodsDeclarationOrder(): ClassImplementationConfigOrder[] {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.methodVisibility),
            new ClassImplementationConfigOrder(this.clazz.methodModifier),
            new ClassImplementationConfigOrder(this.clazz.methodName, ""),
        ]
    }

    public getMehodEmptyBody(): string {
        return "";
    }

}


const typescriptReversedData: SintaxeReservedData = {
    startCodeBlock: "{",
    endCodeBlock: "}",
    endLineCode: ";",
    startArgDeclaration: "(",
    endArgDeclaraion: ")",
    separeArgDeclaraion: ",",
    classReference: "this",
    classSubAccess: ".",
}


const typescriptFileData: FileExtensionData = {
    main: "ts",
    others: ["tsx", "d.ts"]
}


export class TypescriptSintaxe extends Sintaxe
{
    public constructor()
    {
        super(new TypescriptClassImplementationOrder(), typescriptReversedData, typescriptFileData);
    }
}

export const typescriptSintaxe = new TypescriptSintaxe();
