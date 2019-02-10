import { BNS } from '../../types'
import * as Filter from '../filter/types'

export type Filter = Filter.IsFinal | FilterCustom
export type FilterCustom = (value: BNS) => BNS | null

export interface Option {
  readonly description: string
  readonly slug: string
  readonly slugLetter: string | null
  readonly filter?: Filter
}
