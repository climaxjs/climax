import { BNS } from '../../types'
import * as Filter from '../filter/types'

export type Filter = Filter.IsFinal | FilterCustom
export type FilterCustom = (value: BNS) => BNS | null

export interface Value {
  readonly name: string
  readonly description: string
  readonly filter?: Filter
}
