import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import builtins from 'rollup-plugin-node-builtins'
import typescript from 'rollup-plugin-typescript2'
import autoExternal from 'rollup-plugin-auto-external'
import json from '@rollup/plugin-json'

export default {
  input: `${process.cwd()}/src/index.ts`,
  output: [
    {
      file: `${process.cwd()}/dist/index.js`,
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: `${process.cwd()}/dist/index.esm.js`,
      format: 'esm',
      sourcemap: false,
    },
  ],
  external: [],
  plugins: [
    autoExternal({
      packagePath: `${process.cwd()}/../../package.json`,
    }),
    autoExternal(),
    // builtins(),
    typescript(),
    resolve(),
    commonjs(),
    json(),
  ],
}
