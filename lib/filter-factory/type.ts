/// <reference path="../program/types.ts" />

namespace Filter {
  export enum TYPE {
    BOOLEAN = 1,
    NUMBER = 2,
    STRING = 3,
  }

  export interface Is {
    isMandatory: boolean
    type: TYPE
  }

  export type IsProp = keyof Is

  export type IsFilter<T extends Is> = {
    context: T
    // tslint:disable-next-line:trailing-comma
    filter: Program.OptionFilter<Program.OptionFilterOutput>
  }
  export type IsValidator = {
    errorMessage: string
    // tslint:disable-next-line:trailing-comma
    test: (...params: any[]) => boolean
  }
}
