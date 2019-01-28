/**
 * Generate an error with custom variables and format specifiers.
 */

import { sprintf } from 'sprintf-js'

export default function getErrorWith(_message: string, ..._args: any[]): Error {
  return new Error(sprintf.apply(null, arguments))
}
