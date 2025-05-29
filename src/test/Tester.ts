import { describe, it } from "vitest";
import ITester from "./ITete";


export interface TestConfig
{
    file: string;
    artifact: string;
    description: string;
    test: ITester;
}


export default class Tester
{
    public static test(config: TestConfig)
    {
        describe(`${config.file} | ${config.artifact}`,
            ()=>{ it(config.description, ()=>{
                let result = config.test.run();
                if(result.wasError()) { throw new Error(result.getMessage()) };
            }) }
        )
    }
}

