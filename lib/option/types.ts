import * as Filter from '../filter/types'

export type OptionFilter = Filter.IsUsable | OptionFilterCustom
export type OptionFilterCustom = (value?: string) => boolean | number | string

export interface Option {
  description: string
  slug: string
  filter?: OptionFilter
}
