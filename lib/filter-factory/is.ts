/// <reference path="../program/types.ts" />
/// <reference path="./type.ts" />

import chalk from 'chalk'
// tslint:disable-next-line:import-name
import R from 'ramda'

import errors from '../errors'

abstract class Is implements Filter.Is {
  public isMandatory: boolean
  public type: Filter.TYPE
  public validators: Filter.IsValidator[] = []

  protected validate() {

  }

  protected next<T extends Filter.IsProp, U extends Filter.Is>(prop: T, value: Is[T], child: U): U {
    this[prop] = value
    child.isMandatory = this.isMandatory
    child.type = this.type

    return child
  }

  protected makeCaster<T extends boolean>(): Program.OptionFilter<boolean>
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
  }
}

class IsObligation extends Is {
  get aMandatory(): IsType {
    return this.next('isMandatory', true, new IsType())
  }

  get anOptional(): IsType {
    return this.next('isMandatory', false, new IsType())
  }
}

class IsType extends Is {
  get boolean(): Program.OptionFilter<boolean> {
    return this.makeCaster<boolean>()
  }

  get integer(): Filter.IsFilter<IsNumber> {
    this

    return {
      context: this.next('type', Filter.TYPE.NUMBER, new IsNumber()),
      filter: this.makeCaster<number>(),
    }
  }

  get number(): Filter.IsFilter<IsNumber> {
    return {
      context: this.next('type', Filter.TYPE.NUMBER, new IsNumber()),
      filter: this.makeCaster<number>(),
    }
  }

  get string(): Filter.IsFilter<Is> {
    return {
      context: this.next('type', Filter.TYPE.STRING, new IsType()),
      filter: this.makeCaster<string>(),
    }
  }
}

class IsNumber extends Is {
  public between(min: number, max: number, included: boolean = true) {
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

  public greaterThan(min: number) {
    this.validators.push({
      errorMessage: `must be greater than ${min}.`,
      test: R.gt(R.__, min),
    })

    return this
  }

  public greaterThanOrEqualTo(min: number) {
    this.validators.push({
      errorMessage: `must be greater than or equal to ${min}.`,
      test: R.gte(R.__, min),
    })

    return this
  }

  public lessThan(max: number) {
    this.validators.push({
      errorMessage: `must be less than ${max}.`,
      test: R.lt(R.__, max),
    })

    return this
  }

  public lessThanOrEqualTo(max: number) {
    this.validators.push({
      errorMessage: `must be less than or equal to ${max}.`,
      test: R.lte(R.__, max),
    })

    return this
  }
}

/**
 * Program command option filter factory.
 */
const is = new IsObligation()

export default is
