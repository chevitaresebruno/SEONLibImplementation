// test/index.test.ts
import { describe, it } from 'vitest';

import ProjectAbstraction from "./../src/abstractions/ProjectAbstraction"

import { vueModularArchProjectSettings } from "./../src/prefabs/sintaxes/typescript/VueModularArchitecture"

import { softwareDescription, softwareName, testModule } from './utils/declarations';

describe('Large String Output Test', () => {
  it('should output a large string', () => {
    const project = new ProjectAbstraction(softwareName, softwareDescription, vueModularArchProjectSettings, [testModule]);

    project.createProject();
  });
});
