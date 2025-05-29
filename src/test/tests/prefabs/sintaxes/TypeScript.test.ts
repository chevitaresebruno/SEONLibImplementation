import { ClazzData, ConstructorData } from "../../../../abstractions/language/Sintaxe";
import { ModifierOptions, VisibilityOptions } from "../../../../abstractions/shared/Enums";
import { TypeScriptClass, TypescriptMethod } from "../../../../prefabs/sintaxes/typescript/TSClass";
import { typescriptSintaxe } from "../../../../prefabs/sintaxes/typescript/TSSintaxe";
import { TypescriptBigInt, TypescriptBoolean, TypescriptNull, TypescriptNumber, TypeScriptPrimitiveTypes, TypescriptPromisseAny, TypescriptString, TypescriptSymbol, TypescriptUndefined } from "../../../../prefabs/sintaxes/typescript/TSTypes";
import { TypeScriptArggument, TypeScriptAttribute } from "../../../../prefabs/sintaxes/typescript/TSVariables";
import FastTests from "../../../FastTesters";
import ITester, { TestDTO } from "../../../ITete";
import Tester from "../../../Tester";


const attr1 = new TypeScriptAttribute("attr1", new TypescriptString(), false, VisibilityOptions.PRIVATE);
const attr2 = new TypeScriptAttribute("attr2", new TypescriptNumber(), true, VisibilityOptions.PUBLIC);
const attr3 = new TypeScriptAttribute("attr3", new TypescriptBoolean(), false, VisibilityOptions.PROTECTED, "false");
const argg1 = new TypeScriptArggument("argg1", new TypescriptBigInt(), "");
const argg2 = new TypeScriptArggument("argg2", new TypescriptNumber(), "1");
const method1 = new TypescriptMethod("method1", [argg1], new TypescriptPromisseAny(), ModifierOptions.CONCRETE, VisibilityOptions.PUBLIC);
const method2 = new TypescriptMethod("method2", [argg1, argg2], new TypescriptPromisseAny(), ModifierOptions.STATIC, VisibilityOptions.PRIVATE);
const method3 = new TypescriptMethod("method3", [argg1], new TypescriptPromisseAny(), ModifierOptions.CONCRETE, VisibilityOptions.PROTECTED);
const method4 = new TypescriptMethod("method4", [argg1], new TypescriptPromisseAny(), ModifierOptions.ABSTRACT, VisibilityOptions.PUBLIC);
const clazz1 = new TypeScriptClass("clazz1", [method1, method2, method3, method4], [attr1, attr2], VisibilityOptions.PUBLIC, ModifierOptions.ABSTRACT);
// const clazz2 = new TypeScriptClass("clazz2", [], [attr3], VisibilityOptions.PUBLIC, ModifierOptions.CONCRETE, [clazz1]);



const clazz1ExpectedData: ClazzData = {
    _constructor: {
            declaration: "public constructor",
            arguments: ["attr1: string", "attr2: number"],
            body: ["this.attr1: string = attr1", "this.attr2: number = attr2"]
        },
    attributes: ["public attr1: string", "public attr2: number"],
    declaration: " clazz1",
    methods: [
        {
            arguments: ["argg1: bigint"],
            body: [""],
            declaration: "public method1",
        },
        {
            arguments: ["argg1: bigint", "argg2: number = 1"],
            body: [""],
            declaration: "private static method2",
        },
        {
            arguments: ["argg1: bigint"],
            body: [""],
            declaration: "protected method3",
        },
            {
            arguments: ["argg1: bigint"],
            body: [""],
            declaration: "public abstract method4",
        },
    ],
}


class TypeScriptTest implements ITester
{
    run(): TestDTO
    {
        let test: TestDTO;

        test = this.testTsPrimitiveTypes();
        if(test.wasError())
            { return test; }

        test = this.testTsSintaxe();

        return test;
    }
    
    private testTsPrimitiveTypes(): TestDTO
    {
        let typesList: {_type: TypeScriptPrimitiveTypes, expect: string}[] = [
            {_type: new TypescriptString(), expect: "string"},
            {_type: new TypescriptNumber(), expect: "number"},
            {_type: new TypescriptBoolean(), expect: "boolean"},
            {_type: new TypescriptNull(), expect: "null"},
            {_type: new TypescriptUndefined(), expect: "undefined"},
            {_type: new TypescriptSymbol(), expect: "symbol"},
            {_type: new TypescriptBigInt(), expect: "bigint"},
            {_type: new TypescriptPromisseAny(), expect: "Promise<any>"},
        ]

        for(let {_type, expect} of typesList)
        {
            if(!FastTests.primitiveType(_type, expect))
            {
                return new TestDTO(`TSPrimitiveType ${_type.getName()} returns ${_type.toString()} != ${expect}`, true);
            }
        }

        return TestDTO.success;
    }

    private testTsSintaxe(): TestDTO
    {
        return FastTests.clazz(clazz1, clazz1ExpectedData, typescriptSintaxe)
    }
}


Tester.test({file: "prefabs/sintaxe/typescript", artifact: "package", description: "Gera as strings de resposta do código", test: new TypeScriptTest()})