/**
 * TODO Add paramaters check on all the public methods.
 */

import * as R from 'ramda'

import { applyMixins } from '../../utils'

import * as T from './types'

abstract class Filter implements T.Filter {
  public isMandatory: boolean
  public type: T.TYPE
  public validators: T.Validator[] = []
  protected _defaultValue: boolean | number | string | null = null

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

/**
 * Mixin for final filter class methods.
 */
class IsFinal extends Filter {
  public else(defaultValue: boolean | number | string): void {
    this._defaultValue = defaultValue
  }
}

class IsObligation extends Filter implements T.IsObligation {
  get aMandatory(): T.IsType {
    this.isMandatory = true

    return new IsType(this)
  }

  get anOptional(): T.IsType {
    this.isMandatory = false

    return new IsType(this)
  }
}

class IsType extends Filter implements T.IsType {
  get boolean(): T.IsBoolean {
    this.type = T.TYPE.BOOLEAN
    this._defaultValue = false

    return new IsBoolean(this)
  }

  get float(): T.IsNumber {
    this.type = T.TYPE.NUMBER

    return new IsNumber(this)
  }

  get integer(): T.IsNumber {
    this.type = T.TYPE.NUMBER
    this.validators.push({
      errorMessage: `must be an integer.`,
      test: (value: number) => value === Math.round(value),
    })

    return new IsNumber(this)
  }

  get string(): T.IsString {
    this.type = T.TYPE.STRING

    return new IsString(this)
  }

  public list(list: string[]): T.IsList {
    this.type = T.TYPE.STRING
    this.validators.push({
      errorMessage: `must be be one of: ${list.join(`, `)}.`,
      test: R.includes(R.__, list as any) as any,
    })

    return new IsList(this)
  }
}

class IsBoolean extends Filter implements T.IsBoolean {
  public else: () => void
}

class IsList extends Filter implements T.IsList {
  public else: () => void
}

class IsNumber extends Filter implements T.IsNumber {
  public else: () => void

  public between(
    min: number,
    max: number,
    included: boolean = false,
  ): T.IsNumber {
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

  public greaterThan(min: number, included: boolean = false): T.IsNumber {
    this.validators.push(included
      ? {
        errorMessage: `must be greater or equal to ${min}.`,
        test: R.gte(R.__, min),
      }
      : {
        errorMessage: `must be greater than ${min}.`,
        test: R.gt(R.__, min),
      },
    )

    return this
  }

  public lessThan(max: number, included: boolean = false): T.IsNumber {
    this.validators.push(included
      ? {
        errorMessage: `must be lesser or equal to ${max}.`,
        test: R.lte(R.__, max),
      }
      : {
        errorMessage: `must be lesser than ${max}.`,
        test: R.lt(R.__, max),
      },
    )

    return this
  }
}

class IsString extends Filter implements T.IsString {
  public else: () => void

  public longerThan(min: number, included: boolean = false): T.IsString {
    this.validators.push(included
      ? {
        errorMessage: `must be greater or equal to ${min}.`,
        test: R.compose(R.gte(R.__, min), R.prop('length') as () => number),
      }
      : {
        errorMessage: `must be greater than ${min}.`,
        test: R.compose(R.gt(R.__, min), R.prop('length') as () => number),
      },
    )

    return this
  }

  public shorterThan(max: number, included: boolean = false): T.IsString {
    this.validators.push(included
      ? {
        errorMessage: `must be lesser or equal to ${max}.`,
        test: R.compose(R.lte(R.__, max), R.prop('length') as () => number),
      }
      : {
        errorMessage: `must be lesser than ${max}.`,
        test: R.compose(R.lt(R.__, max), R.prop('length') as () => number),
      },
    )

    return this
  }
}

applyMixins([IsBoolean, IsList, IsNumber, IsString], [IsFinal])

/**
 * Program command option filter factory.
 */
const is = new IsObligation()
export default is
