import * as Option from '../option/types'

export interface Command {
  description(description?: string): string | Command
  option(slug: string, description: string, filter?: Option.OptionFilter): Command
}
