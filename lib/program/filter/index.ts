/**
 * TODO Add paramaters check on all the public methods.
 * TODO Add mandatory validation.
 */

import * as R from 'ramda'

import * as T from './types'
import * as U from '../../types'

abstract class Filter implements T.Filter {
  constructor(
    protected _defaultValue: U.BNS | null = null,
    protected _isMandatory: boolean = false,
    protected _type: T.TYPE = T.TYPE.STRING,
    protected _validators: T.Validator[] = [],
  ) {}
}

/**
 * Mixin for final filter class methods.
 */
class IsFinal extends Filter {
  /**
   * Set the default value for the related value.
   *
   * TODO Handle wrong-typed default value cases.
   */
  public else(defaultValue: U.BNS): this {
    this._defaultValue = defaultValue

    return this
  }

  /**
   * Validate and coerce the value.
   */
  public process(value?: U.BNS): U.BNS | null {
    if (value !== undefined) {
      try {
        const typedValue = this.coerce(value)
        this.validate(typedValue)

        return typedValue
      } catch (e) { throw e }
    }

    if (this._isMandatory) {
      throw `is mandatory.`
    }

    return this._defaultValue
  }

  /**
   * Helper method to quick-check if this filter forces expect its related option to be a boolean.
   *
   * @ignore
   * This method should not appear in any documentation or types declaration since it's only useful
   * for internal checkings.
   */
  public isBoolean(): boolean {
    return this._type === T.TYPE.BOOLEAN
  }

  /**
   * Coerce the value.
   */
  protected coerce(value: U.BNS): U.BNS {
    switch (this._type) {
      case T.TYPE.BOOLEAN:
        return Boolean(value)

      case T.TYPE.NUMBER:
        if (isNaN(Number(value))) throw `must be a processable number.`
        return Number(value)

      case T.TYPE.STRING:
        return String(value)
    }
  }

  /**
   * Validate the value, throwing a string error in case of invalidation.
   */
  protected validate(value: U.BNS): void {
    for (let i = 0; i < this._validators.length; i += 1) {
      if (!this._validators[i].test(value)) {
        throw this._validators[i].errorMessage
      }
    }
  }
}

class IsObligation extends Filter implements T.IsObligation {
  /**
   * Make the related value mandatory.
   */
  get aMandatory(): T.IsType {
    return new IsType(this._defaultValue, false, this._type)
  }

  /**
   * Make the related value optional.
   */
  get anOptional(): T.IsType {
    return new IsType(this._defaultValue, false, this._type)
  }
}

class IsType extends Filter implements T.IsType {
  /**
   * Coerce the related value into a boolean.
   */
  get boolean(): T.IsBoolean {
    return new IsBoolean(false, this._isMandatory, T.TYPE.BOOLEAN)
  }

  /**
   * Coerce the related value into a number and invalidate NaN cases.
   */
  get float(): T.IsNumber {
    return new IsNumber(this._defaultValue, this._isMandatory, T.TYPE.NUMBER)
  }

  /**
   * Coerce the related value into a number and invalidate NaN cases as well as floats.
   */
  get integer(): T.IsNumber {
    return new IsNumber(
      this._defaultValue,
      this._isMandatory,
      T.TYPE.NUMBER,
      [{
        errorMessage: `must be an integer.`,
        test: (value: number) => value === Math.round(value),
      }],
    )
  }

  /**
   * Coerce the related value into a string.
   */
  get string(): T.IsString {
    return new IsString(this._defaultValue, this._isMandatory, T.TYPE.STRING)
  }

  /**
   * Coerce the related value into a string and validate the result against the provided list.
   *
   * TODO Handle empty lists.
   */
  public list(list: string[]): T.IsList {
    this._type = T.TYPE.STRING
    this._validators.push({
      errorMessage: `must be be one of: ${list.join(`, `)}.`,
      test: R.includes(R.__, list as any) as any,
    })

    return new IsList(this._defaultValue, this._isMandatory, this._type, this._validators)
  }
}

class IsBoolean extends IsFinal implements T.IsBoolean {}

class IsList extends IsFinal implements T.IsList {}

class IsNumber extends IsFinal implements T.IsNumber {
  /**
   * Expect the coerced number to be between <min> and <max>.
   */
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

  /**
   * Expect the coerced number to be greater than <min>.
   */
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

  /**
   * Expect the coerced number to be lesser than <max>.
   */
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
  /**
   * Expect the coerced string to be longer than <min>.
   */
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

  /**
   * Expect the coerced string to be shorter than <max>.
   */
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
 * Filter factory for command (or program) options and values.
 */
const is = new IsObligation()
export default is
