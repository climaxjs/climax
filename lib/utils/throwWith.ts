/**
 * Generate an error with custom variables and format specifiers.
 */

import { sprintf } from 'sprintf-js'

export default function throwWith(error: Error, ...args: any[]): Error {
  throw new Error(sprintf.apply(null, [error.message, ...args]))
}
