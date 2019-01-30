/**
 * Throw an error with a prefix and/or suffix message.
 */

export default function throwWith(
  error: Error,
  start: string = '',
  end: string = '',
): Error {
  throw new Error(`${start}${error.message}${end}`)
}
