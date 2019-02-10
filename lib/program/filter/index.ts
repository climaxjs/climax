/**
 * TODO Add paramaters check on all the public methods.
 */

import * as R from 'ramda'

import errors from '../../errors'
const { error: E } = errors

import * as T from './types'
import * as U from '../../types'

abstract class Filter implements T.Filter {
  protected _defaultValue: U.BNS | null = null
  protected _isMandatory: boolean
  protected _type: T.TYPE
  protected _validators: T.Validator[] = []

  constructor(context?: Filter) {
    if (context === undefined) return

    this._isMandatory = context._isMandatory
    this._type = context._type
    this._validators = [...context._validators]
  }
}

/**
 * Mixin for final filter class methods.
 */
class IsFinal extends Filter {
  public else(defaultValue: boolean | number | string): void {
    this._defaultValue = defaultValue
  }

  /**
   * Validate and coerce the related value.
   */
  // public process(value: U.BNS): boolean {
  // }

  /**
   * Coerce the related value.
   */
  // public coerce(value: U.BNS): U.BNS {
  // }

  /**
   * Validate the related value.
   */
  public validate(value: U.BNS): boolean {
    for (let i = 0; i < this._validators.length; i += 1) {
      if (!this._validators[i].test(value)) return false
    }

    return true
  }

  /**
   * This is a helper method to quick-check if this filter forces expect its
   * related option to be a boolean.
   *
   * @ignore
   * This method should not appear in any documentation or types declaration
   * since it's only useful for internal checkings.
   */
  public isBoolean(): boolean {
    switch (true) {
      case this._type === undefined:
        throw E.ERR_FLT_TYPE_I_UND
    }

    return typeof this._type === 'boolean'
  }
}

class IsObligation extends Filter implements T.IsObligation {
  get aMandatory(): T.IsType {
    this._isMandatory = true

    return new IsType(this)
  }

  get anOptional(): T.IsType {
    this._isMandatory = false

    return new IsType(this)
  }
}

class IsType extends Filter implements T.IsType {
  get boolean(): T.IsBoolean {
    this._type = T.TYPE.BOOLEAN
    this._defaultValue = false

    return new IsBoolean(this)
  }

  get float(): T.IsNumber {
    this._type = T.TYPE.NUMBER

    return new IsNumber(this)
  }

  get integer(): T.IsNumber {
    this._type = T.TYPE.NUMBER
    this._validators.push({
      errorMessage: `must be an integer.`,
      test: (value: number) => value === Math.round(value),
    })

    return new IsNumber(this)
  }

  get string(): T.IsString {
    this._type = T.TYPE.STRING

    return new IsString(this)
  }

  public list(list: string[]): T.IsList {
    this._type = T.TYPE.STRING
    this._validators.push({
      errorMessage: `must be be one of: ${list.join(`, `)}.`,
      test: R.includes(R.__, list as any) as any,
    })

    return new IsList(this)
  }
}

class IsBoolean extends IsFinal implements T.IsBoolean {}

class IsList extends IsFinal implements T.IsList {}

class IsNumber extends IsFinal implements T.IsNumber {
  public between(
    min: number,
    max: number,
    included: boolean = false,
  ): T.IsNumber {
    this._validators.push(included
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
    this._validators.push(included
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
    this._validators.push(included
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

class IsString extends IsFinal implements T.IsString {
  public longerThan(min: number, included: boolean = false): T.IsString {
    this._validators.push(included
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
    this._validators.push(included
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

/**
 * Program command option filter factory.
 */
const is = new IsObligation()
export default is
