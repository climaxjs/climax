/**
 * Transform a list of raw CLI arguments into a pair of command string and its
 * option/value pairs as a key/value object.
 *
 * TODO Handle unprocessable args lists.
 */

import * as R from 'ramda'

export type RawArgs = [
  string | null,
  { [option: string]: string | true } | {},
  string[]
]

const filterOptions = R.filter<string>(R.startsWith('-'))
const filterValues = R.filter<string>(R.complement(R.startsWith('-')))
const maybeRemoveCommand = (command: string | null) =>
  command !== null ? R.drop(1) : R.identity
const pairizeOption = R.ifElse(
  R.test(/.+=/),
  R.split('='),
  arg => R.pair(arg, true),
)
const pairizeOptions = R.reduce<string, [string, string | true][]>(
  (acc, arg) => R.append(R.pipe(removeDashes, pairizeOption)(arg), acc),
  [],
)
const removeDashes = R.replace(/^-{1,2}/, '')

export default function parseArgs(args: string[]): RawArgs {
  if (args.length === 0) return [null, {}, []]

  const command = args[0].startsWith('-') ? null : args[0]
  const argsWithoutCommand = maybeRemoveCommand(command)(args)
  const options = R.pipe(
    filterOptions,
    pairizeOptions,
    R.fromPairs,
  )(argsWithoutCommand)
  const values = filterValues(argsWithoutCommand)

  return [command, options, values]
}
