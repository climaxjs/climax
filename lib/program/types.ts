import * as Command from '../command/types'
import * as Option from '../option/types'

export type ProgramCommands = {
  [slug: string]: Command.Command
}

export interface Program {
  command(slug: string): Command.Command
  description(slug: string): string | Program
  name(name?: string): string | Program
  option(slug: string, description: string, filter?: Option.OptionFilter): Program
  version(version?: string): string | Program
}
