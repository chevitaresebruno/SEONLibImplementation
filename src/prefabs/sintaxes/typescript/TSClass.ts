import ClassAbstraction from "../../../abstractions/oo/ClassAbstraction";
import InterfaceAbstraction from "../../../abstractions/oo/InterfaceAbstraction";
import MethodAbstraction from "../../../abstractions/oo/MethodAbstraction";
import { ModifierOptions, VisibilityOptions } from "../../../abstractions/shared/Enums";
import { TypeScriptTypes } from "./TSTypes";
import { TypeScriptArggument, TypeScriptAttribute } from "./TSVariables";


export class TypescriptMethod extends MethodAbstraction
{
    public constructor(name: string, argguments: TypeScriptArggument[], _return: TypeScriptTypes, option: ModifierOptions = ModifierOptions.CONCRETE, visibility: VisibilityOptions = VisibilityOptions.PUBLIC)
    {
        super(name, argguments, _return, option, visibility);
    }
}


export class TypeScriptClass extends ClassAbstraction
{
    public constructor(name: string, methods: TypescriptMethod[], attributes: TypeScriptAttribute[], visibility: VisibilityOptions = VisibilityOptions.PUBLIC, option: ModifierOptions = ModifierOptions.CONCRETE, herances: ClassAbstraction[] | null = null, subTypes: InterfaceAbstraction[] | null = null)
    {
        super(name, methods, attributes, visibility, option, herances, subTypes);
    }
} 

