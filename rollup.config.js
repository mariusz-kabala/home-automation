import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import autoExternal from 'rollup-plugin-auto-external'
import json from '@rollup/plugin-json'

const { RUN_DIR = process.cwd() } = process.env

export default {
  input: `${RUN_DIR}/src/index.ts`,
  output: [
    {
      file: `${RUN_DIR}/dist/index.js`,
      format: 'cjs',
      sourcemap: false,
    },
  ],
  external: [],
  plugins: [
    autoExternal({
      packagePath: `${RUN_DIR}/../../package.json`,
    }),
    autoExternal(),
    typescript(),
    resolve(),
    commonjs(),
    json(),
  ],
}
