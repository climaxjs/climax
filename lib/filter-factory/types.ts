// tslint:disable

namespace Filter {
  export enum TYPE {
    BOOLEAN = 1,
    NUMBER = 2,
    STRING = 3,
  }

  export type IsValidator = {
    errorMessage: string
    test: (...params: any[]) => boolean
  }

  export interface Is {
    isMandatory: boolean
    type: number
    validators: IsValidator[]
  }
  export interface IsObligation extends Is {
    aMandatory(): IsType
    anOptional(): IsType
  }
  export interface IsType extends Is {
    boolean(): IsBoolean
    float(): IsNumber
    number(): IsNumber
    string(): IsString
  }
  export interface IsBoolean extends Is {}
  export interface IsNumber extends Is {
    between(min: number, max: number, included: boolean): IsNumber
    greaterThan(min: number, included: boolean): IsNumber
    lessThan(max: number, included: boolean): IsNumber
  }
  export interface IsString extends Is {}

  export type IsUsable = IsBoolean | IsNumber | IsString
}
