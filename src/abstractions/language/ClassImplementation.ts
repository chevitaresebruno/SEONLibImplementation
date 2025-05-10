import ClassAbstraction from "../oo/ClassAbstraction";
import AttributeAbstraction from "../types/AttributeAbstraction";
import { ModifierWrapper, VisibilityWrapper } from "./Wrappers";


export default interface ClassImplementation
{
    classKeyword(): string;

    declareClass(clazz: ClassAbstraction): string;

    declareAttribute(attr: AttributeAbstraction): string;

    constructorKeyword(): string;

    
}


export interface classData
{
    declaration: string,
    attr: string[],
    _constructor: string,
    constructorBody: string[],
    methods: {declaration: string, body: string}[],
}


abstract class Sintaxe
{
    private clazzImple: ClassImplementation;
    private classVWrapper: VisibilityWrapper;
    private classMWrapper: ModifierWrapper;
    private methodVWrapper: VisibilityWrapper;
    private methodMWrapper: ModifierWrapper;

    public constructor(clazzImplementation: ClassImplementation, classVW: VisibilityWrapper, classMW: ModifierWrapper, methodVW: VisibilityWrapper, methodMW: ModifierWrapper)
    {
        this.clazzImple = clazzImplementation;
        this.classVWrapper = classVW;
        this.classMWrapper = classMW;
        this.methodVWrapper = methodVW;
        this.methodMWrapper = methodMW;
    }

    public abstract buildClass(clazz: ClassAbstraction): string[];


}

