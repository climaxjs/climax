/**
 * Generates a clean build within /build in order to prepare for a new
 * publication.
 */

const path = require('path')
const { promisify } = require('util')

const rimraf = promisify(require('rimraf'))
const { rollup } = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
// const resolve = require('rollup-plugin-node-resolve')
const typescript = require('rollup-plugin-typescript')

const configure = require('./configure')

const BUILD_PATH = path.resolve(__dirname, '../../build')
const DIST_PATH = path.resolve(__dirname, '../../dist')
const SRC_PATH = path.resolve(__dirname, '../../lib')

const inputOptions = {
  input: SRC_PATH + '/index.ts',

  plugins: [
    typescript(),
    commonjs(),
    // resolve(),
  ],

  external: [
    'os',
  ],
}

const outputOptions  = {
  dir: BUILD_PATH,
  format: 'cjs',
}

async function build() {
  try {
    console.log(`Deleting ${BUILD_PATH}...`)
    await rimraf(BUILD_PATH)
    console.log(`Deleting ${DIST_PATH}...`)
    await rimraf(DIST_PATH)

    console.log(`Generating bundle...`)
    const bundle = await rollup(inputOptions)

    console.log(`Writing bundle in ${BUILD_PATH}...`)
    await bundle.write(outputOptions)

    console.log(`Generating meta files in ${BUILD_PATH}...`)
    await configure(BUILD_PATH)
  } catch(err) {
    console.error(err)
    process.exit(1)
  }
}

build()
