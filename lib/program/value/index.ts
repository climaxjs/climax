import errors from '../../errors'
import { throwWith } from '../../utils'

import * as T from './types'
const { error: E } = errors

/**
 * TODO Validate the name format.
 * TODO Find a proper way to distinguish the value name and the option slug.
 */
export default class Value implements T.Value {
  /** Errors message prefix for developers. */
  protected _e: string

  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly filter?: T.Filter,
  ) {
    switch (true) {
      case typeof name !== 'string':
        throw E.ERR_VAL_NAME_V_TYP

      case name.length === 0:
        throw E.ERR_VAL_NAME_V_LEN
    }

    this._e = this.constructor.name === 'Value'
      ? `[Value: "${name}"] `
      : `[Option: "${name}"] `

    switch (true) {
      case typeof description !== 'string':
        throwWith(E.ERR_VAL_DESC_V_TYP, this._e)

      case description.length === 0:
        throwWith(E.ERR_VAL_DESC_V_LEN, this._e)

      case filter !== undefined:
        switch (true) {
          case this.isUnusableInternalFilter(filter):
            throwWith(E.ERR_VAL_FILT_V_TYP, this._e)

          case !this.isInternalFilter(filter) && typeof filter !== 'function':
            throwWith(E.ERR_VAL_FILT_V_TYP_C, this._e)
        }
    }
  }

  /**
   * Is this filter the instance of a usable internal filter?
   */
  private isInternalFilter(filter: any): boolean {
    return typeof filter === 'object' && (
      [
        'Is',
        'IsObligation',
        'IsType',
        'IsBoolean',
        'IsNumber',
        'IsString',
      ].includes(filter.constructor.name)
    )
  }

  /**
   * Is this filter the instance of an unusable (= not final) internal filter?
   */
  private isUnusableInternalFilter(filter: any): boolean {
    return typeof filter === 'object' && (
      ['Is', 'IsObligation', 'IsType'].includes(filter.constructor.name)
    )
  }
}
