import { VisibilityOptions } from "../../../abstractions/shared/Enums";
import ArggumentAbstraction from "../../../abstractions/types/ArggumentAbstraction";
import AttributeAbstraction from "../../../abstractions/types/AttributeAbstraction";
import { TypeScriptTypes } from "./TSTypes";


export class TypeScriptArggument extends ArggumentAbstraction
{
    public constructor(name: string, _type: TypeScriptTypes, defaultValue: string)
    {
        super(name, _type, defaultValue);
    }
}


export class TypeScriptAttribute extends AttributeAbstraction
{
    public constructor(name: string, _type: TypeScriptTypes, _static: boolean = false, visibility: VisibilityOptions = VisibilityOptions.PUBLIC, defaultValue: string = "")
    {
        super(name, _type, _static = false, visibility = VisibilityOptions.PUBLIC, defaultValue = "");
    }
}

