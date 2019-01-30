/**
 * Generate an error with custom variables and format specifiers.
 */

import { RorreError } from 'rorre'
import { sprintf } from 'sprintf-js'

export default function getErrorWith(
  error: RorreError<string, string>,
  ...args: any[]
): Error {
  return new Error(sprintf.apply(null, [error.message, ...args]))
}
