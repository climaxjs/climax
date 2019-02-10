import * as Value from '../value/types'

export interface Option extends Value.Value {
  readonly slug: string
  readonly slugLetter: string | null
}
