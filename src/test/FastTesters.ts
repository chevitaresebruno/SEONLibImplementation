import Sintaxe, { ClazzData, ConstructorData, MethodsData } from "../abstractions/language/Sintaxe";
import ClassAbstraction from "../abstractions/oo/ClassAbstraction";
import PrimitiveTypeAbstraction from "../abstractions/types/PrimitiveTypeAbstraction";
import { TestDTO } from "./ITete";


export default class FastTests
{
    public static primitiveType(obj: PrimitiveTypeAbstraction, result: string): boolean
    {
        return obj.toString() == result;
    }

    public static clazz(obj: ClassAbstraction, result: ClazzData, sintaxe: Sintaxe): TestDTO
    {
        let aux = sintaxe.buildClassData(obj);

        let a = this._constructor(aux._constructor, result._constructor);

        if(a.wasError())
            { return a; }
        for(let i = 0; i < aux.methods.length; i++)
        {
            a = this.methods(aux.methods[i], result.methods[i]);
            if(a.wasError())
                { return a; }
        }

        for(let i = 0; i < aux.attributes.length; i++)
        {
            if(aux.attributes[i] != result.attributes[i])
                { return new TestDTO(`Attribute Error: ${aux.attributes[i]} != ${result.attributes[i]}`, true); }
        }

        if(aux.declaration != result.declaration)
            { return new TestDTO(`Declaration Error: ${aux.declaration} != ${result.declaration}`, true); }

        return TestDTO.success;
    }

    private static _constructor(c1: ConstructorData, c2: ConstructorData): TestDTO
    {
        if(c1.declaration != c2.declaration)
            { return new TestDTO(`Constructor Declaration Error: ${c1.declaration} != ${c2.declaration}`, true); }
        for(let i = 0; i < c1.arguments.length; i++)
        {
            if(c1.arguments[i] != c2.arguments[i])
                { return new TestDTO(`Constructor Argg Error: ${c1.arguments[i]} != ${c2.arguments[i]}`, true); }
        }
        for(let i = 0; i < c1.body.length; i++)
        {
            if(c1.body[i] != c2.body[i])
                { return new TestDTO(`Constructor Body Error: ${c1.body[i]} != ${c2.body[i]}`, true); }
        }

        return TestDTO.success;
    }

    private static methods(m1: MethodsData, m2: MethodsData): TestDTO
    {
        if(m1.declaration != m2.declaration)
            { return new TestDTO(`Method Declaration Error: ${m1.declaration} != ${m2.declaration}`, true); }

        for(let i = 0; i < m1.arguments.length; i++)
        {
            if(m1.arguments[i] != m2.arguments[i])
                { return new TestDTO(`Arggument Error: ${m1.arguments[i]} != ${m2.arguments[i]}`, true); }
        }
        for(let i = 0; i < m1.body.length; i++)
        {
            if(m1.body[i] != m2.body[i])
                { return new TestDTO(`Method Body Error: ${m1.body[i]} != ${m1.body[i]}`, true); }
        }

        return TestDTO.success;
    }
}

