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
        super("async", argguments, new TypescriptPromisseAny(), null, null);
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
        let api = this.biuldApiFolder(pkg);
        let controller = this.buildController(pkg);
        let routes = new FolderAbstracion("routes");
        let types = new FolderAbstracion("types");

        return [api, controller, routes, types];
    }

    private biuldApiFolder(pgk: PackageAbstraction): FolderAbstracion
    {
        let folder = new FolderAbstracion("api");

        let listApiFiles = pgk.getPackageLevelClasses().map(clazz => new TypescriptFile(clazz.getName(), `import adminApi, { adminApiConfig } from '@/api/admin'
import type {
  ${clazz.getName()},
  ${clazz.getName()}CreateReq,
  ${clazz.getName()}ListRes,
  ${clazz.getName()}CreateRes,
  ${clazz.getName()}GetRes,
  ${clazz.getName()}UpdateRes,
  ${clazz.getName()}DeleteRes,
} from '../types/${clazz.getName()}.d.ts'`, [], typescriptSintaxe, [
    new CriarConstrain(clazz),
    new ObterConstrain(clazz),
    new AtualizarConstrain(clazz),
    new ExcluirConstrain(clazz),
    new ListarConstrain(clazz),
]));

    listApiFiles.forEach(file => folder.addFile(file));

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
}


export const vueModularArchProjectSettings: ProjectSpecifications = {
    architecture: new VueModularArchitecture(),
    lenguage: typescriptSintaxe
}