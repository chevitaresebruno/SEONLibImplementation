import MethodAbstraction from "./MethodAbstraction.js";
import TypeAbstraction from "../types/TypeAbstraction.js";


export default class InterfaceAbstraction extends TypeAbstraction
{
    protected methods: MethodAbstraction[];
    
    public constructor(name: string, methods: MethodAbstraction[])
    {
        super(name);
        this.methods = methods;
    }

    public getMethods(): MethodAbstraction[]
    {
        return this.methods;
    }
}

