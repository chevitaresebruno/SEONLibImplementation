import { VisibilityOptions } from "../shared/Enums.js";
import ArggumentAbstraction from "./ArggumentAbstraction.js";
import TypeAbstraction from "./TypeAbstraction.js";


export default class AttributeAbstraction
{
    protected visibility: VisibilityOptions;
    protected name: string;
    protected _static: boolean;
    protected _type: TypeAbstraction;
    protected defaultValue: string;


    public constructor(name: string, _type: TypeAbstraction, _static: boolean = false, visibility: VisibilityOptions = VisibilityOptions.PUBLIC, defaultValue: string = "")
    {
        this.name = name;
        this._type = _type;
        this._static = _static;
        this.visibility = visibility;
        this.defaultValue = defaultValue;
    }

    public getName(): string
    {
        return this.name;
    }

    public getType(): TypeAbstraction
    {
        return this._type;
    }

    public asArgument(): ArggumentAbstraction
    {
        return new ArggumentAbstraction(this.name, this._type, this.defaultValue);
    }

    public getVisibility(): VisibilityOptions
    {
        return this.visibility;
    }
}

