/**
 * Throw an error with its message custom variables/format specifiers filled.
 */

import * as sprintfJs from 'sprintf-js'
// https://github.com/rollup/rollup-plugin-commonjs/issues/137
const { sprintf } = sprintfJs

export default function throwF(error: Error, ...args: any[]): Error {
  throw new Error(sprintf.apply(null, [error.message, ...args]))
}
