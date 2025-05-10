import Sintaxe, { ClassImplementation, ClassImplementationConfigOrder, ClassImplementationOrder, FileExtensionData, SintaxeReservedData } from "../abstractions/language/Sintaxe";
import ClassAbstraction from "../abstractions/oo/ClassAbstraction";
import MethodAbstraction from "../abstractions/oo/MethodAbstraction";
import { ModifierOptions, VisibilityOptions } from "../abstractions/shared/Enums";
import ArggumentAbstraction from "../abstractions/types/ArggumentAbstraction";
import AttributeAbstraction from "../abstractions/types/AttributeAbstraction";


class CppClasImplementation implements ClassImplementation
{
    classKeyword(clazz: ClassAbstraction): string
    {
        return "class";
    }

    className(clazz: ClassAbstraction): string
    {
        return clazz.getName();
    }

    classVisibility(clazz: ClassAbstraction): string
    {
        return "";
    }

    classModifier(clazz: ClassAbstraction): string
    {
        return "";
    }

    attrVisibility(attr: AttributeAbstraction): string
    {
        switch(attr.getVisibility())
        {
            case VisibilityOptions.PRIVATE:
                return "private: ";
        }

        return "";
    }

    attrModifier(attr: AttributeAbstraction): string
    {
        return "";
    }

    attrName(attr: AttributeAbstraction): string
    {
        return attr.getName();
    }

    attrType(attr: AttributeAbstraction): string
    {
        return attr.getType().getName();
    }

    constructorVisibility(clazz: ClassAbstraction): string
    {
        return "";
    }

    constructorKeyword(clazz: ClassAbstraction): string
    {
        return clazz.getName();
    }

    argumentName(arg: ArggumentAbstraction): string
    {
        return arg.getName();
    }

    argumentType(arg: ArggumentAbstraction): string
    {
        return arg.getType().getName();
    }

    methodKeyword(method: MethodAbstraction): string
    {
        return "";
    }

    methodVisibility(method: MethodAbstraction): string
    {
        switch(method.getVisibility())
        {
            case VisibilityOptions.PRIVATE:
                return "private: "
        }

        return "public: "
    }

    methodModifier(method: MethodAbstraction): string
    {
        switch(method.getOption())
        {
            case ModifierOptions.STATIC:
                return "static";
        }

        return "";
    }

    methodName(method: MethodAbstraction): string
    {
        return method.getName();
    }

    methodReturn(method: MethodAbstraction): string
    {
        return method.getReturn().getName();
    }
}


class CppClassImplementationOrder extends ClassImplementationOrder
{
    public getDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.classKeyword),
            new ClassImplementationConfigOrder(this.clazz.className, ""),
        ]
    }
    
    public getAttributeDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.attrVisibility),
            new ClassImplementationConfigOrder(this.clazz.attrModifier),
            new ClassImplementationConfigOrder(this.clazz.attrType),
            new ClassImplementationConfigOrder(this.clazz.attrName),
        ]
    }

    public getConstructorDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.constructorKeyword),
        ]
    }

    public getArggumentDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.argumentType),
            new ClassImplementationConfigOrder(this.clazz.argumentName, ""),
        ]
    }

    public getMethodsDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.methodVisibility),
            new ClassImplementationConfigOrder(this.clazz.methodModifier),
            new ClassImplementationConfigOrder(this.clazz.methodReturn),
            new ClassImplementationConfigOrder(this.clazz.methodName),
        ]
    }
    
    public getMehodEmptyBody(): string
    {
        return "";
    }

} 

const cppReservedData: SintaxeReservedData = {
    classReference: "this",
    classSubAccess: ".",
    endLineCode: ";",
    endCodeBlock: "}",
    startCodeBlock: "{",
    separeArgDeclaraion: ",",
    startArgDeclaration: "(",
    endArgDeclaraion: ")"
}

const cppExtensionFiles: FileExtensionData = {
    main: "cpp",

    others: ["h", "hpp", "c++"]
}


export default class CppSintaxe extends Sintaxe
{
    public constructor()
    {
        super(new CppClassImplementationOrder(), cppReservedData, cppExtensionFiles);
    }
}

