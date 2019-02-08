/**
 * Generates a clean package.json file within /build in order to prepare for a
 * new publication.
 */

const { omit } = require('ramda')
const { promisify } = require('util')

const { copyFile: _copyFile, writeFile: _writeFile } = require('fs')
const writeFile = promisify(_writeFile)

const package = require('../../package.json')

module.exports = async function configure(outputPath) {
  console.log(`Generating package.json for distribution...`)
  await writeFile(outputPath + '/package.json', JSON.stringify({
    ...omit(['devDependencies', 'private', 'scripts'], package),
    main: 'index.js',
    types: 'types/index.d.ts',
    repository: {
      type: 'git',
      url: 'git+https://github.com/climax/core.git',
    },
    bugs: {
      url: 'https://github.com/climax/core/issues',
    },
    homepage: 'https://climaxjs.com/',
  }, null, 2))
}
