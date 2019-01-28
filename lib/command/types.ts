import * as Filter from '../filter/types'
import * as Option from '../option/types'

export interface Command {
  description(description?: string): string | Command
  option(slug: string, description: string, filter?: Filter.Is | Option.OptionFilter<Option.OptionFilterOutput>): Command
}
