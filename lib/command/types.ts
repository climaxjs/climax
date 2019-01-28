import * as Filter from '../filter/types'

export interface Command {
  description(description?: string): string | Command
  option(slug: string, description: string, filter ?: Filter.Is | OptionFilter<OptionFilterOutput>): Command
}

export type OptionFilter<T extends OptionFilterOutput> = Filter.IsUsable | OptionFilterCustom<T>
export type OptionFilterCustom<T extends OptionFilterOutput> = (value?: string) => T
export type OptionFilterOutput = boolean | number | string

export interface Option {
  description: string
  slug: string
  filter?: Filter.Is | OptionFilter<OptionFilterOutput>
}
