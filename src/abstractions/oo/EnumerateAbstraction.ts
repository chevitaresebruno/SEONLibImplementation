import TypeAbstraction from "../types/TypeAbstraction.js";

export class EnumerateOptions
{
    protected name: string;
    protected vlaue: string;

    public constructor(name: string, value: string)
    {
        this.name = name;
        this.vlaue = value;
    }
}


export default class EnumerateAbstraction extends TypeAbstraction
{
    protected options: EnumerateOptions[];

    public constructor(name: string, options: EnumerateOptions[])
    {
        super(name);
        this.options = options;
    }
}

