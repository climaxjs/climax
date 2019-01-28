import * as Option from '../option/types'
import * as Program from '../program/types'

export interface Command {
  description(description?: string): string | Command | Program.Program
  option(slug: string, description: string, filter?: Option.OptionFilter): Command | Program.Program
}
