import graphql from '@rollup/plugin-graphql'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import autoExternal from 'rollup-plugin-auto-external'

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
    typescript(),
    commonjs(),
    graphql(),
  ],
}
