import PrimitiveTypeAbstraction from "../../../abstractions/types/PrimitiveTypeAbstraction";
import TypeAbstraction from "../../../abstractions/types/TypeAbstraction";


export class TypescriptString extends PrimitiveTypeAbstraction
{
    public constructor()
    {
        super("string");
    }
}


export class TypescriptNumber extends PrimitiveTypeAbstraction
{
    public constructor()
    {
        super("number");
    }
}


export class TypescriptBoolean extends PrimitiveTypeAbstraction {
    public constructor() {
        super("boolean");
    }
}

export class TypescriptNull extends PrimitiveTypeAbstraction {
    public constructor() {
        super("null");
    }
}

export class TypescriptUndefined extends PrimitiveTypeAbstraction {
    public constructor() {
        super("undefined");
    }
}

export class TypescriptSymbol extends PrimitiveTypeAbstraction {
    public constructor() {
        super("symbol");
    }
}

export class TypescriptBigInt extends PrimitiveTypeAbstraction {
    public constructor() {
        super("bigint");
    }
}

export class TypescriptPromisseAny extends PrimitiveTypeAbstraction {
    public constructor() {
        super("Promise<any>");
    }
}

export type TypeScriptPrimitiveTypes = TypescriptBigInt | TypescriptNull | TypescriptUndefined | TypescriptNumber | TypescriptBoolean | TypescriptString | TypescriptSymbol;

export type TypeScriptTypes = TypeScriptPrimitiveTypes | TypeAbstraction;

