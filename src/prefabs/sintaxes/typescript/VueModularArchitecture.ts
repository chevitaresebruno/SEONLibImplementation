import ArchitectureImplementationAbstraction from "../../../abstractions/language/ArchitectureAbstraction";
import FileAbstraction from "../../../abstractions/project/FileAbstraction";
import FolderAbstracion from "../../../abstractions/project/FolderAbstraction";
import PackageAbstraction from "../../../abstractions/project/PackageAbstraction";
import { ProjectSpecifications } from "../../../abstractions/ProjectAbstraction";
import PrimitiveTypeAbstraction from "../../../abstractions/types/PrimitiveTypeAbstraction";
import { TypeScriptClass, TypescriptMethod } from "./TSClass";
import { TypescriptConstrains, TypescriptFile } from "./TSProject";
import { typescriptSintaxe } from "./TSSintaxe";
import { TypescriptPromisseAny, TypescriptString } from "./TSTypes";
import { TypeScriptArggument } from "./TSVariables";


class CreateReq extends TypeScriptArggument
{
    public constructor(clazz: TypeScriptClass)
    {
        super(clazz.getName(), new PrimitiveTypeAbstraction(`${clazz.getName()}CreateReq`), "");
    }
}

const idArgument = new TypeScriptArggument("Id", new TypescriptString(), "");

class ActionBaseMethod extends TypescriptMethod
{
    public actionName: string;
    public axiosname: string;
    public entityName: string;
    public args: string;

    public constructor(name: string, argguments: TypeScriptArggument[], action: string, httpMethod: string, args: string)
    {
        super("async", argguments, new TypescriptPromisseAny(), undefined, undefined);
        this.entityName = name;
        this.actionName = action;
        this.axiosname = httpMethod;
        this.args = args;
    }

    public getbody(): string[]
    {
        return [`return await adminapi.${this.actionName}<${this.entityName}${this.actionName}Res>('/'${this.args}, ${this.entityName}ReqConf);`];
    }
}


class ListarConstrain extends TypescriptConstrains
{
    public constructor(clazz: TypeScriptClass)
    {
        super(`listar${clazz.getName()}`, null, true, new ActionBaseMethod(clazz.getName(), [], "List", "get", ""));
    }
}

class CriarConstrain extends TypescriptConstrains
{
    public constructor(clazz: TypeScriptClass)
    {
        super(`criar${clazz.getName()}`, null, true, new ActionBaseMethod(clazz.getName(), [], "Create", "post", `${clazz.getName()}`));
    }
}

class ObterConstrain extends TypescriptConstrains
{
    public constructor(clazz: TypeScriptClass)
    {
        super(`criar${clazz.getName()}`, null, true, new ActionBaseMethod(clazz.getName(), [], "Get", "get", `+ id`));
    }
}

class AtualizarConstrain extends TypescriptConstrains
{
    public constructor(clazz: TypeScriptClass)
    {
        super(`atualizar${clazz.getName()}`, null, true, new ActionBaseMethod(clazz.getName(), [], "Update", "put", `+ ${clazz.getName()}.id, ${clazz.getName()}`));
    }
}

class ExcluirConstrain extends TypescriptConstrains
{
    public constructor(clazz: TypeScriptClass)
    {
        super(`excluir${clazz.getName()}`, null, true, new ActionBaseMethod(clazz.getName(), [], "Update", "put", `+ id`));
    }
}


export default class VueModularArchitecture implements ArchitectureImplementationAbstraction
{
    implement(modelPackages: PackageAbstraction[]): FolderAbstracion[]
    {
        let src = new FolderAbstracion("src", []);
        let module = new FolderAbstracion("modules", []);

        let modules = modelPackages.map(pkg => new FolderAbstracion(pkg.getName(), this.buildModule(pkg)));
        modules.forEach(folder => module.addSubfolder(folder));

        src.addSubfolder(module);

        return [src];
    }

    private buildModule(pkg: PackageAbstraction): FolderAbstracion[]
    {
        let api = this.buildApiFolder(pkg);
        let controller = this.buildController(pkg);
        let routes = this.buildRoutes(pkg);
        let types = this.buildTypes(pkg);

        return [api, controller, routes, types];
    }

    private buildApiFolder(pgk: PackageAbstraction): FolderAbstracion
    {
        let folder = new FolderAbstracion("api");

        let files = pgk.getPackageLevelClasses().map(clazz => new TypescriptFile(clazz.getName(), `
import adminApi, { adminApiConfig } from '@/api/admin'
import type {
  ${clazz.getName()},
  ${clazz.getName()}CreateReq,
  ${clazz.getName()}ListRes,
  ${clazz.getName()}CreateRes,
  ${clazz.getName()}GetRes,
  ${clazz.getName()}UpdateRes,
  ${clazz.getName()}DeleteRes,
} from '../types/${clazz.getName()}.d.ts'

const ${clazz.getName()}ReqConf = {
  baseURL: adminApiConfig.baseURL + '${clazz.getName()}',
}

export const listar${clazz.getName()} = async () => {
  return await adminApi.get<${clazz.getName()}ListRes>('/', ${clazz.getName()}ReqConf)
}

export const criar${clazz.getName()} = async (${clazz.getName()}: ${clazz.getName()}CreateReq) => {
  return await adminApi.post<${clazz.getName()}CreateRes>('/', ${clazz.getName()}, ${clazz.getName()}ReqConf)
}

export const obter${clazz.getName()} = async (id: string) => {
  const { data } = await adminApi.get<${clazz.getName()}GetRes>('/' + id, ${clazz.getName()}ReqConf)
  return data.value[0]
}

export const atualizar${clazz.getName()} = async (${clazz.getName()}: ${clazz.getName()}) => {
  return await adminApi.put<${clazz.getName()}UpdateRes>('/' + ${clazz.getName()}.Id, ${clazz.getName()}, ${clazz.getName()}ReqConf)
}

export const excluir${clazz.getName()} = async (id: string) => {
  return await adminApi.delete<${clazz.getName()}DeleteRes>('/' + id, ${clazz.getName()}ReqConf)
}
        `, [], typescriptSintaxe, []));


        files.forEach(file => folder.addFile(file));

        return folder;
    }

    private buildController(pkg: PackageAbstraction): FolderAbstracion
    {
        let folder = new FolderAbstracion("controller");

        let files = pkg.getPackageLevelClasses().map(clazz => new TypescriptFile(clazz.getName(), `import {
  criar${clazz.getName()} as _criar${clazz.getName()},
  listar${clazz.getName()} as _listar${clazz.getName()},
  obter${clazz.getName()} as _obter${clazz.getName()},
  atualizar${clazz.getName()} as _atualizar${clazz.getName()},
  excluir${clazz.getName()} as _excluir${clazz.getName()},
} from '../api/${clazz.getName()}'
import type { ${clazz.getName()}, ${clazz.getName()}CreateReq } from '../types/${clazz.getName()}'
import { useUiStore } from '@/stores/ui'
import { AxiosError } from 'axios'

export const listar${clazz.getName()} = async () => {
  try {
    const { data } = await _listar${clazz.getName()}()
    return data.value
  } catch (error) {
    throw error
  }
}

export const criar${clazz.getName()} = async (${clazz.getName()}: ${clazz.getName()}CreateReq) => {
  const ui = useUiStore()

  try {
    const { data } = await _criar${clazz.getName()}(${clazz.getName()})

    ui.exibirAlerta({
      text: data.message,
      color: 'success'
    })

    return true

  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === 400 &&
      error.response.data.errors
    ) {
      ui.exibirAlertas(
        error.response.data.errors
          .map((err: { mensagem: string }) => ({ text: err.mensagem, color: 'error' }))
      )

      return false

    } else {
      throw error
    }
  }
}

export const obter${clazz.getName()} = async (id: string) => {
  try {
    const data = await _obter${clazz.getName()}(id)
    return data
  } catch (error) {
    throw error
  }
}

export const atualizar${clazz.getName()} = async (${clazz.getName()}: ${clazz.getName()}) => {
  try {
    const { data } = await _atualizar${clazz.getName()}(${clazz.getName()})
    return true
  } catch (error) {
    throw error
  }
}

export const excluir${clazz.getName()} = async (id: string) => {
  try {
    const { data } = await _excluir${clazz.getName()}(id)
    return true
  } catch (error) {
    throw error
  }
}

export const excluir${clazz.getName()}s = async (ids: string[]) => {
  try {
    for (const id of ids) {
      const sucesso = await excluir${clazz.getName()}(id)
    }
    return true
  } catch (error) {
    throw error
  }
}`, [], typescriptSintaxe, []))

        files.forEach(file => folder.addFile(file));

        return folder;
    }

    private buildRoutes(pkg: PackageAbstraction): FolderAbstracion
    {
        let folder = new FolderAbstracion("routes");

        let files = pkg.getPackageLevelClasses().map(clazz => new TypescriptFile("index", `
import type { RouteRecordRaw } from 'vue-router'
import Listar from '../views/Listar.vue'
import Criar from '../views/Criar.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: '${clazz.getName()}-home',
    path: 'home',
    component: Listar,
  },
  {
    name: '${clazz.getName()}-criar',
    path: 'criar/:id?',
    component: Criar,
  }
]
            `, [], typescriptSintaxe, []));

        files.forEach(file => folder.addFile(file));

        return folder;
    }

    private buildTypes(pkg: PackageAbstraction): FolderAbstracion
    {
        let folder = new FolderAbstracion("types");

        let files = pkg.getPackageLevelClasses().map(clazz => new TypescriptFile(
            `${clazz.getName()}.d`, `
export type ${clazz.getName()} = {

        ${clazz.getAttributes().map(attr => `${attr.getName()}: ${attr.getType().getName()}`).join("\n\t")}
  Id : string
}

export type ${clazz.getName()}CreateReq = Pick<${clazz.getName()}, ${clazz.getAttributes().map(attr => `"${attr.getName()}"`).join(" | ")}>


export type ${clazz.getName()}ListRes = {
  "@odata.context": string
  value: ${clazz.getName()}[]
}

export type ${clazz.getName()}CreateRes = {
  statusCode: number
  uri: string
  message: string
}

export type ${clazz.getName()}GetRes = ${clazz.getName()}ListRes


export type ${clazz.getName()}UpdateRes = {
  statusCode: number
  message: string
}

export type ${clazz.getName()}DeleteRes = ${clazz.getName()}UpdateRes
            `, [], typescriptSintaxe, []
        ))

        files.forEach(file => folder.addFile(file));

        return folder;
    }
}


export const vueModularArchProjectSettings: ProjectSpecifications = {
    architecture: new VueModularArchitecture(),
    lenguage: typescriptSintaxe
}