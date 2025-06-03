// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    "src/**/*.ts", // Inclui todos os arquivos .ts na pasta src
    "!src/**/*.spec.ts", // Exclui arquivos de teste da cobertura
    "!src/**/*.test.ts"  // Garante que arquivos de teste não sejam contados como código-fonte
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Configuração para ts-jest
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json' // Aponta para seu arquivo tsconfig.json
    }
  },
  detectOpenHandles: true,
  passWithNoTests: true
};

export default config;