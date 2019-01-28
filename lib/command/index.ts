import errors from '../errors'
import Option from '../option/Option'

import * as T from './types'
import * as OptionT from '../option/types'

export default class Command implements T.Command {
  protected _description: string
  protected _options: Option[] = []

  public description(description?: string): string | Command {
    if (typeof description === 'undefined') {
      switch (true) {
        case this._description === undefined:
          throw errors.error.ERR_COMMAND_DESCRIPTION_UNDEFINED
      }

      return this._description
    }

    switch (true) {
      case typeof description !== 'string':
        throw errors.error.ERR_COMMAND_DESCRIPTION_VALIDATION_TYPE

      case description.length === 0:
        throw errors.error.ERR_COMMAND_DESCRIPTION_VALIDATION_LENGTH
    }

    this._description = description

    return this
  }

  public option(
    slug: string,
    description: string,
    filter?: OptionT.OptionFilter,
  ): Command {
    this._options.push(new Option(slug, description, filter))

    return this
  }
}
