import ArggumentAbstraction from "../types/ArggumentAbstraction.js";
import { ModifierOptions, VisibilityOptions } from "../shared/Enums.js";
import TypeAbstraction from "../types/TypeAbstraction.js";


export default class MethodAbstraction
{
    protected name: string;
    protected visibility: VisibilityOptions;
    protected option: ModifierOptions;
    protected arrguments: ArggumentAbstraction[];
    protected _return: TypeAbstraction;

    public constructor(name: string, argguments: ArggumentAbstraction[], _return: TypeAbstraction, option: ModifierOptions = ModifierOptions.CONCRETE, visibility: VisibilityOptions = VisibilityOptions.PUBLIC)
    {
        this.name = name;
        this.visibility = visibility;
        this.option = option;
        this.arrguments = argguments;
        this._return = _return;
    }

    public getOption(): ModifierOptions
    {
        return this.option;
    }

    public getArguments(): ArggumentAbstraction[]
    {
        return this.arrguments;
    }

    public getReturn(): TypeAbstraction
    {
        return this._return;
    }

    public getVisibility(): VisibilityOptions
    {
        return this.visibility;
    }

    public getName(): string
    {
        return this.name;
    }

    public getbody(): string[]
    {
        return [""];
    }
}

