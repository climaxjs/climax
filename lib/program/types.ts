import * as Command from '../command/types'

export type ProgramCommands = {
  [slug: string]: Command.Command
}

export interface Program extends Command.Command {
  command(slug: string): Command.Command
  name(name?: string): string | Program
  version(version?: string): string | Program
}
