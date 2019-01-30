export enum TYPE {
  BOOLEAN = 1,
  NUMBER = 2,
  STRING = 3,
}

export type FilterValidator = {
  errorMessage: string
  test: (...params: any[]) => boolean
}

export interface Filter {
  isMandatory: boolean
  type: number
  validators: FilterValidator[]
}
export interface IsObligation extends Filter {
  aMandatory: IsType
  anOptional: IsType
}
export interface IsType extends Filter {
  boolean: IsBoolean
  float: IsNumber
  integer: IsNumber
  string: IsString
}
export interface IsBoolean extends Filter {}
export interface IsNumber extends Filter {
  between(min: number, max: number, included: boolean): IsNumber
  greaterThan(min: number, included: boolean): IsNumber
  lessThan(max: number, included: boolean): IsNumber
}
export interface IsString extends Filter {}

export type IsUsable = IsBoolean | IsNumber | IsString
