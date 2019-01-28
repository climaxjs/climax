/**
 * Transform a list of raw CLI arguments into a pair of command string and its
 * option/value pairs as a key/value object.
 *
 * TODO Handle unprocessable args lists.
 */

import * as R from 'ramda'

export type RawArgs = [string | null, { [option: string]: string | null } | {}]

export default function parseArgs(args: string[]): RawArgs {
  if (args.length === 0) return [null, {}]
  const command = args[0].startsWith('-') ? null : args[0]

  const options = R.pipe(
    R.reduce<string, any[]>(
      (acc, arg) => R.startsWith('-', arg)
        ? R.append(R.pair(R.replace(/^-{1,2}/, '', arg), null), acc)
        : R.update(acc.length - 1, [acc[acc.length - 1][0], arg], acc),
      [],
    ),
    R.fromPairs,
  )(args.slice(Number(command !== null), args.length))

  return [command, options]
}
