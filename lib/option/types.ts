import * as Filter from '../filter/types'

export type Filter = Filter.IsUsable | FilterCustom
export type FilterCustom = (value?: string) => boolean | number | string

export interface Option {
  description: string
  slug: string
  filter?: Filter
}
