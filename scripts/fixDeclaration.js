// As I'm not able to force TS to generate proper package declarations this 
// is a small script to fix the first line

const replace = require('replace-in-file')
const pkg = require(`${process.cwd()}/package.json`)

replace({
    files: `${process.cwd()}/dist/index.d.ts`,
    from: 'declare module "index" {',
    to: `declare module "${pkg.name}" {`,
  })