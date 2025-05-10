import TypeAbstraction from "./TypeAbstraction.js";


export default class ArggumentAbstraction
{
    protected name: string;
    protected _type: TypeAbstraction;
    protected defaultValue: string;

    public constructor(name: string, _type: TypeAbstraction, defaultValue: string)
    {
        this.name = name;
        this._type = _type;
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
}

