import { BNS } from '../../types'

export enum TYPE {
  BOOLEAN = 1,
  NUMBER = 2,
  STRING = 3,
}

export type Validator = {
  errorMessage: string
  test: (value: BNS) => boolean
}

export interface Filter {}

export interface IsObligation extends Filter {
  aMandatory: IsType
  anOptional: IsType
}
export interface IsType extends Filter {
  boolean: IsBoolean
  float: IsNumber
  integer: IsNumber
  list(items: string[]): IsList
  string: IsString
}

export interface IsFinal extends Filter {
  else(value: BNS): void

  coerce(value: BNS): BNS
  process(value?: BNS): BNS | null
  validate(value: BNS): void
}

export interface IsBoolean extends IsFinal { }
export interface IsList extends IsFinal { }
export interface IsNumber extends IsFinal {
  between(min: number, max: number, included?: boolean): IsNumber
  greaterThan(min: number, included?: boolean): IsNumber
  lessThan(max: number, included?: boolean): IsNumber
}
export interface IsString extends IsFinal {
  longerThan(min: number, included?: boolean): IsString
  shorterThan(max: number, included?: boolean): IsString
}
