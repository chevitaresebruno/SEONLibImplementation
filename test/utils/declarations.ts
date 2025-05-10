import ClassAbstraction from "../../src/abstractions/oo/ClassAbstraction";
import FileAbstraction from "../../src/abstractions/project/FileAbstraction";
import PackageAbstraction from "../../src/abstractions/project/PackageAbstraction";
import AttributeAbstraction from "../../src/abstractions/types/AttributeAbstraction";
import PrimitiveTypeAbstraction from "../../src/abstractions/types/PrimitiveTypeAbstraction";
import { TypeScriptArggument, TypeScriptAttribute } from "./../../src/prefabs/sintaxes/typescript/TSVariables";
import { typescriptSintaxe } from "./../../src/prefabs/sintaxes/typescript/TSSintaxe";

export const NameAttribute = new TypeScriptAttribute("NameAttr", new PrimitiveTypeAbstraction("char[]"));

export const testClass = new ClassAbstraction("TestClass", [], [NameAttribute, new AttributeAbstraction("NumberAttr", new PrimitiveTypeAbstraction("int"))]);
export const baseFile = new FileAbstraction("TestModule", [testClass], typescriptSintaxe);


export const testModule = new PackageAbstraction("TestModule", [testClass], []);
export const softwareDescription = "This is a Test file";
export const softwareName = "TestSoftware";

