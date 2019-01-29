import * as Option from '../option/types'
import * as Program from '../program/types'

export interface Command {
  description(description?: string): string | Command | Program.Program

  action(callback: CommandAction): Command | Program.Program
  option(slug: string, description: string, filter?: Option.OptionFilter): Command | Program.Program
  value(helpName: string, description: string): Command | Program.Program
}

export type CommandAction = (args: CommandActionArgs) => void | Promise<void>
export type CommandActionArgs = {
  options: { [name: string]: boolean | number | string }
  values: Array<number | string>
}
