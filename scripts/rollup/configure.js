/**
 * Generates a clean package.json file within /build in order to prepare for a
 * new publication.
 */

const path = require('path')
const { omit } = require('ramda')
const { promisify } = require('util')

const { copyFile: _copyFile, writeFile: _writeFile } = require('fs')
const copyFile = promisify(_copyFile)
const writeFile = promisify(_writeFile)

const package = require('../../package.json')

const ROOT_PATH = path.resolve(__dirname, '../..')

module.exports = async function configure(outputPath) {
  console.log(`Generating package.json for distribution...`)
  await writeFile(outputPath + '/package.json', JSON.stringify({
    ...omit(['devDependencies', 'private', 'scripts'], package),
    main: 'index.js',
    types: 'index.d.ts',
  }, null, 2))
}
