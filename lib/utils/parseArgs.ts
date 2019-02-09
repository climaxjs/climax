/**
 * Transform a list of raw CLI arguments into a trio of:
 * command, option/value pairs and values list.
 */

import * as R from 'ramda'
import * as yargs from 'yargs'

import { BNS, BNSObject } from '../types'

export type ParsedArgs = [string | null, BNSObject, BNS[]]

export default function (commands: string[], args: string[]): ParsedArgs {
  const parsedArgs = yargs.parse(args)

  const options = { ...R.omit(['_', '$0'], parsedArgs) } as BNSObject

  // If there is at least one value (that could be a command)
  // and the first value matches the first argument, it may be a command
  if (
    parsedArgs._.length > 0 &&
    parsedArgs._[0] === args[0] &&
    commands.includes(args[0])
  ) {
    return [args[0], options, R.slice(1, Infinity, parsedArgs._)]
  }

  return [null, options, parsedArgs._]
}
