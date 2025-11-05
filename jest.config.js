const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset({
  tsconfig: 'src/tsconfig.spec.json',
}).transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
};
