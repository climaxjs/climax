import log from '@inspired-beings/log'

/**
 * Log a red error <message> and throw the <error>.
 */
export default function logT(message: string, error: Error): void {
  log.err(message)
  throw error
}
