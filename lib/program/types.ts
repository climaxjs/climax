import * as Command from '../command/types'
import * as Option from '../option/types'

export type ProgramCommands = {
  [slug: string]: Command.Command
}

export interface Program {
  description(slug: string): string | Program
  name(name?: string): string | Program
  version(version?: string): string | Program

  command(slug: string): Command.Command
  option(slug: string, description: string, filter?: Option.OptionFilter): Program

  init(): void
}
