// import chalk from 'chalk'
// tslint:disable-next-line:import-name
import * as R from 'ramda'

// import errors from '../errors'

import * as T from './types'

abstract class Is implements T.Is {
  public isMandatory: boolean
  public type: T.TYPE
  public validators: T.IsValidator[] = []

  constructor(context?: Is) {
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

  /*protected makeCaster<T extends boolean>(): Program.OptionFilter<boolean>
  protected makeCaster<T extends string>(): Program.OptionFilter<string>
  protected makeCaster<T extends number>(): Program.OptionFilter<number>
  protected makeCaster(): Program.OptionFilter<Program.OptionFilterOutput> {
    switch (true) {
      case this.isMandatory && this.type === Filter.TYPE.BOOLEAN:
        throw errors.error.ERR_FILTERS_IS_CONFLICT_MANDATORY_BOOLEAN
    }

    return (data: Program.OptionFilterData): Program.OptionFilterOutput => {
      const pre = `  ${chalk.red('›')}   `
      const start = `${pre}Error: `
      const end = `\n${pre}Run "${data.command} --help" (or -h) to get help.`

      switch (true) {
        case this.isMandatory && data.value === undefined:
          console.error(`${start}--${data.slug} is mandatory.${end}`)
          process.exit(0)
      }

      switch (true) {
        case this.type === Filter.TYPE.BOOLEAN:
          return data.hasOwnProperty('value')

        case this.type === Filter.TYPE.NUMBER:
          return Number(data.value)

        default:
          return String(data.value)
      }
    }
  }*/
}

class IsObligation extends Is {
  get aMandatory(): IsType {
    this.isMandatory = true

    return new IsType(this)
  }

  get anOptional(): IsType {
    this.isMandatory = false

    return new IsType(this)
  }
}

class IsType extends Is {
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

class IsBoolean extends Is implements T.IsBoolean {}

class IsNumber extends Is implements T.IsNumber {
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

class IsString extends Is implements T.IsString {}

/**
 * Program command option filter factory.
 */
const is = new IsObligation()

export default is
