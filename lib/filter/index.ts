// tslint:disable-next-line:import-name
import * as R from 'ramda'

import * as T from './types'

abstract class Filter implements T.Filter {
  public isMandatory: boolean
  public type: T.TYPE
  public validators: T.FilterValidator[] = []

  constructor(context?: Filter) {
    if (context === undefined) return

    this.isMandatory = context.isMandatory
    this.type = context.type
    this.validators = [...context.validators]
  }

  public validate(value: any): boolean {
    for (let i = 0; i < this.validators.length; i += 1) {
      if (!this.validators[i].test(value)) return false
    }

    return true
  }
}

class IsObligation extends Filter implements T.IsObligation {
  get aMandatory(): IsType {
    this.isMandatory = true

    return new IsType(this)
  }

  get anOptional(): IsType {
    this.isMandatory = false

    return new IsType(this)
  }
}

class IsType extends Filter implements T.IsType {
  get boolean(): IsBoolean {
    this.type = T.TYPE.BOOLEAN

    return new IsBoolean(this)
  }

  get float(): IsNumber {
    this.type = T.TYPE.NUMBER

    return new IsNumber(this)
  }

  get integer(): IsNumber {
    this.type = T.TYPE.NUMBER
    this.validators.push({
      errorMessage: `.`,
      test: R.curry(value => value === Math.round(value)),
    })

    return new IsNumber(this)
  }

  get string(): IsString {
    this.type = T.TYPE.STRING

    return new IsString(this)
  }
}

class IsBoolean extends Filter implements T.IsBoolean {}

class IsNumber extends Filter implements T.IsNumber {
  public between(min: number, max: number, included: boolean = false) {
    this.validators.push(included
      ? {
        errorMessage: `must be between ${min} and ${max} (both included).`,
        test: R.both(R.gte(R.__, min), R.lte(R.__, max)),
      }
      : {
        errorMessage: `must be between ${min} and ${max} (both excluded).`,
        test: R.both(R.gt(R.__, min), R.lt(R.__, max)),
      },
    )

    return this
  }

  public greaterThan(min: number, included: boolean = false) {
    this.validators.push({
      errorMessage: `must be greater than ${min}.`,
      test: included ? R.gte(R.__, min) : R.gt(R.__, min),
    })

    return this
  }

  public lessThan(max: number, included: boolean = false) {
    this.validators.push({
      errorMessage: `must be less than ${max}.`,
      test: included ? R.lte(R.__, max) : R.lt(R.__, max),
    })

    return this
  }
}

class IsString extends Filter implements T.IsString {}

/**
 * Program command option filter factory.
 */
const is = new IsObligation()
export default is
