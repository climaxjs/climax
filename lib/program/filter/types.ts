export enum TYPE {
  BOOLEAN = 1,
  NUMBER = 2,
  STRING = 3,
}

export type Validator = {
  errorMessage: string
  test: (value: boolean | number | string) => boolean
}

export interface Filter {
  isMandatory: boolean
  type: number
  validators: Validator[]

  validate(value: any): boolean
}

export interface IsFinal {
  else: () => void
}

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

export interface IsBoolean extends Filter, IsFinal {}
export interface IsList extends Filter, IsFinal {}
export interface IsNumber extends Filter, IsFinal {
  between(min: number, max: number, included?: boolean): IsNumber
  greaterThan(min: number, included?: boolean): IsNumber
  lessThan(max: number, included?: boolean): IsNumber
}
export interface IsString extends Filter, IsFinal {
  longerThan(min: number, included?: boolean): IsString
  shorterThan(max: number, included?: boolean): IsString
}

export type IsUsable = IsBoolean | IsNumber | IsString
