import * as Option from '../option/types'

export interface Command {
  description(value?: string): string | this

  action(callback: CommandAction): this
  option(slug: string, description: string, filter?: Option.Filter): this
  run(values: {}, options: {}): void
  value(name: string, description: string): this
}

export type CommandAction = (args: CommandActionArgs) => void | Promise<void>
export type CommandActionArgs = {
  options: { [name: string]: boolean | number | string }
  values: { [name: string]: boolean | number | string }
}
