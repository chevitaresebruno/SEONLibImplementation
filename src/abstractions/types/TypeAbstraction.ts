export default class TypeAbstraction
{
    protected name: string;

    public constructor(name: string)
    {
        this.name = name;
    }

    public getName(): string
    {
        return this.name;
    }

    public toString(): string
    {
        return this.name;
    }
}

