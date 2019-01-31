import * as Command from './command/types'

export type ProgramCommands = {
  [slug: string]: Command.Command
}

export interface Program extends Command.Command {
  name(value?: string): string | this
  version(version?: string): string | this

  command(slug: string): Command.Command

  init(): void
}
