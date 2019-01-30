import errors from '../errors'
import Option from '../option'
import Value from '../value'

import * as T from './types'
import * as OptionT from '../option/types'
import * as ValueT from '../value/types'

export default class Command implements T.Command {
  protected _action: T.CommandAction
  protected _description: string
  protected _options: OptionT.Option[] = []
  protected _values: ValueT.Value[] = []

  constructor(
    private readonly _slug: string,
  ) {}

  /**
   * Getter/Setter for the command (or program) description.
   */
  public description(description?: string): string | this {
    if (typeof description === 'undefined') {
      switch (true) {
        case this._description === undefined:
          throw errors.error.ERR_CMD_DESC_V_UND
      }

      return this._description
    }

    switch (true) {
      case typeof description !== 'string':
        throw errors.error.ERR_CMD_DESC_V_TYP

      case description.length === 0:
        throw errors.error.ERR_CMD_DESC_V_LEN
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
        throw errors.error.ERR_CMD_ACTN_V_TYP
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
    switch (true) {
      case typeof slug !== 'string':
        throw errors.error.ERR_CMD_OPT_SLUG_V_TYP

      case slug.length === 0:
        throw errors.error.ERR_CMD_OPT_SLUG_V_LEN

      case typeof description !== 'string':
        throw errors.error.ERR_OPT_DESC_V_TYP

      case description.length === 0:
        throw errors.error.ERR_OPT_DESC_V_LEN
    }

    this._options.push(new Option(slug, description, filter))

    return this
  }

  /**
   * Declare a new command (or program) value.
   *
   * @description
   * The <name> parameter MUST be in camelCase and will be used as a placeholder
   * for the help description of this command (or program).
   */
  public value(name: string, desc: string): this {
    this._values.push(new Value(name, desc))

    switch (true) {
      case typeof name !== 'string':
        throw errors.error.ERR_CMD_VLUE_NAME_V_TYP

      case name.length === 0:
        throw errors.error.ERR_CMD_VLUE_NAME_V_LEN

      case typeof name !== 'string':
        throw errors.error.ERR_CMD_VLUE_DESC_V_TYP

      case name.length === 0:
        throw errors.error.ERR_CMD_VLUE_DESC_V_LEN
    }

    return this
  }

  /**
   * Run the action callback passing it the command options and values.
   */
  public run(): void {
    this._action({ options: {}, values: {} })
  }
}
