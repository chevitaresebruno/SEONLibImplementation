import AttributeAbstraction from "../abstractions/types/AttributeAbstraction.js";
import ClassAbstraction from "../abstractions/oo/ClassAbstraction.js";
import MethodAbstraction from "../abstractions/oo/MethodAbstraction.js";
import PrimitiveTypeAbstraction from "../abstractions/types/PrimitiveTypeAbstraction.js";
import Sintaxe, { ClassImplementation, ClassImplementationConfigOrder, ClassImplementationOrder, FileExtensionData, SintaxeReservedData } from "../abstractions/language/Sintaxe.js";
import ArggumentAbstraction from "../abstractions/types/ArggumentAbstraction.js";
import { VisibilityWrapper } from "../abstractions/language/Wrappers.js";
import { ModifierOptions, VisibilityOptions } from "../abstractions/shared/Enums.js";


const pythonReservedData: SintaxeReservedData = {
    startCodeBlock: ":",
    endCodeBlock: "",
    endLineCode: "",
    startArgDeclaration: "(",
    endArgDeclaraion: ")",
    separeArgDeclaraion: ", ",
    classReference: "self",
    classSubAccess: ".",
}

const pythonExtensionFile: FileExtensionData = {
    main: "py",
}

const pythonABC: ClassAbstraction = new ClassAbstraction("ABC", [], []);


export class PythonInteger extends PrimitiveTypeAbstraction
{
    public constructor()
    {
        super("int");
    }
}

export class PythonString extends PrimitiveTypeAbstraction
{
    public constructor()
    {
        super("str");
    }
}


class PythonVisibilityWraper implements VisibilityWrapper
{
    wrapVisibility(visibility: VisibilityOptions): string
    {
        switch(visibility)
        {
            case VisibilityOptions.PUBLIC:
                return "";
            case VisibilityOptions.PROTECTED:
                return "_";
            case VisibilityOptions.PRIVATE:
                return "__";
        }    
    }
}

const pythonVWraper = new PythonVisibilityWraper();


class PythonClassImplementation implements ClassImplementation
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
        return pythonVWraper.wrapVisibility(clazz.getVisibility());
    }

    classModifier(clazz: ClassAbstraction): string
    {
        switch(clazz.getModifier())
        {
            case ModifierOptions.ABSTRACT:
                clazz.addHerance(pythonABC);
        }

        return ""
    }

    attrVisibility(attr: AttributeAbstraction): string
    {
        return pythonVWraper.wrapVisibility(attr.getVisibility());
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
        return "def __init__";
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
        return "def";
    }

    methodVisibility(method: MethodAbstraction): string
    {
        return pythonVWraper.wrapVisibility(method.getVisibility());
    }

    methodModifier(method: MethodAbstraction): string
    {
        return "";
    }

    methodName(method: MethodAbstraction): string
    {
        return method.getName();
    }

    methodReturn(method: MethodAbstraction): string
    {
        return `-> ${method.getReturn()}`;
    }
}


class PythonImplementationOrder extends ClassImplementationOrder
{
    public constructor()
    {
        super(new PythonClassImplementation());
    }

    public getDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.classKeyword),
            new ClassImplementationConfigOrder(this.clazz.classVisibility, ""),
            new ClassImplementationConfigOrder(this.clazz.className, ""),
        ]
    }

    public getAttributeDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        return [];
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
            new ClassImplementationConfigOrder(this.clazz.argumentName, ": "),
            new ClassImplementationConfigOrder(this.clazz.argumentType, ""),
        ]
    }

    public getMethodsDeclarationOrder(): ClassImplementationConfigOrder[]
    {
        if(this.clazz == undefined)
            return [];

        return [
            new ClassImplementationConfigOrder(this.clazz.methodKeyword),
            new ClassImplementationConfigOrder(this.clazz.methodVisibility),
            new ClassImplementationConfigOrder(this.clazz.methodName),
            new ClassImplementationConfigOrder((obj: any) => {return "->"}),
            new ClassImplementationConfigOrder(this.clazz.methodReturn),
        ]
    }
    
    public getMehodEmptyBody(): string
    {
        return "pass";
    }
}


export default class PythonSintaxe extends Sintaxe
{
    public constructor()
    {
        super(new PythonImplementationOrder(), pythonReservedData, pythonExtensionFile);
    }
} 

