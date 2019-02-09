import log from '@inspired-beings/log'
import * as R from 'ramda'

import errors from '../../errors'
import { throwWith } from '../../utils'
import Option from '../option'
import Value from '../value'

import * as T from './types'
import * as U from '../../types'
import * as OptionT from '../option/types'
import * as ValueT from '../value/types'
const { error: E } = errors

export default class Command implements T.Command {
  protected _action: T.CommandAction
  protected _description: string
  protected _options: OptionT.Option[] = []
  protected _values: ValueT.Value[] = []

  /** Errors message prefix */
  protected _e: string

  /**
   * TODO Validate the slug.
   */
  constructor(
    protected readonly _slug: string,
  ) {
    this._e = this._slug === '_' ? `[Program] ` : `[Command: "${this._slug}"] `
  }

  /**
   * Set for the command (or program) description.
   */
  public description(description: string): this {
    switch (true) {
      case typeof description !== 'string':
        throw E.ERR_CMD_DESC_V_TYP

      case description.length === 0:
        throw E.ERR_CMD_DESC_V_LEN
    }

    this._description = description

    return this
  }

  /**
   * Declare the callback to run for this command (or program).
   */
  public action(callback: T.CommandAction): this {
    switch (true) {
      case typeof callback !== 'function':
        throw E.ERR_CMD_ACTN_V_TYP
    }

    this._action = callback

    return this
  }

  /**
   * Declare a new command (or program) option.
   *
   * @description
   * The <slug> parameter must be a valid slug, i.e.: "-s, --sluggy-slug" or
   * "--sluggy-slug".
   */
  public option(
    slug: string,
    description: string,
    filter?: OptionT.Filter,
  ): this {
    try {
      this._options.push(new Option(slug, description, filter))
    } catch (err) {
      throwWith(err, this._e)
    }

    return this
  }

  /**
   * Declare a new command (or program) value.
   *
   * @description
   * The <name> parameter MUST be in camelCase and will be used as a placeholder
   * for the help description of this command (or program).
   */
  public value(name: string, description: string): this {
    try {
      this._values.push(new Value(name, description))
    } catch (err) {
      throwWith(err, this._e)
    }

    return this
  }

  /**
   * Validate this command mandatory properties.
   */
  public validate(): void {
    switch (true) {
      case this._description === undefined:
        throwWith(E.ERR_CMD_DESC_V_UND, this._e)
    }
  }

  /**
   * Run the action callback passing it the command options and values.
   */
  public run(rawOptions: U.BNSObject, rawValues: U.BNS[]): void {
    const preOptions = this.matchOptionsName(rawOptions)
    const preValues = this.matchValuesName(rawValues)

    // Now, we may have some values following boolean options that have been
    // parsed as being those options values. We thus need to clean them by
    // switching back their values to the lone values list.
    // TODO Add the pre-options cleaning.

    this._action({ options: preOptions, values: preValues })
  }

  /**
   * Translate short slug names and remove undeclared options.
   */
  private matchOptionsName(rawOptions: U.BNSObject): U.BNSObject {
    return R.compose(
      R.reduce(
        (acc, [slug, value]) => {
          if (slug.length > 1) {
            if (R.contains({ slug }, this._options)) {
              return R.assoc(slug, value, acc)
            }

            log.warn(`Unknow option %s. Please run --help.`, `--${slug}`)

            return { ...acc }
          }

          const found = R.find(R.propEq('slugLetter', slug), this._options)
          if (found !== undefined) {
            return R.assoc(found.slug, value, acc)
          }

          log.warn(`Unknow option %s. Please run --help.`, `-${slug}`)

          return { ...acc }
        },
        {}),
      R.toPairs,
    )(rawOptions)
  }

  /**
   * Match values with their declared names and remove undeclared values.
   */
  private matchValuesName(rawValues: U.BNS[]): U.BNSObject {
    return rawValues.reduce(
      (acc, value, index) => {
        if (this._values[index]) {
          return R.assoc(this._values[index].name, value, acc)
        }

        log.warn(`Too many values ("%s"). Please run --help.`, String(value))

        return { ...acc }
      },
      {},
    )
  }
}
