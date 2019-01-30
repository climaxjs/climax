/**
 * Throw an error with its message custom variables/format specifiers filled.
 */

import { sprintf } from 'sprintf-js'

export default function throwF(error: Error, ...args: any[]): Error {
  throw new Error(sprintf.apply(null, [error.message, ...args]))
}
