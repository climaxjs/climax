import * as Command from './command/types'

export type ProgramCommands = {
  [slug: string]: Command.Command
}

export interface Program extends Command.Command {
  name(name: string): this
  version(version: string): this

  command(slug: string): Command.Command

  init(): void
}
