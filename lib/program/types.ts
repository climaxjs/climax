import * as CommandT from '../command/types'

export type ProgramCommands = {
  [slug: string]: CommandT.Command
}

export interface Program extends CommandT.Command {
  command(slug: string): CommandT.Command
  name(name?: string): string | Program
  version(version?: string): string | Program
}
