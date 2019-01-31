/**
 * TODO Validate <slug> uniqueness.
 */

import errors from '../../errors'
import { throwF, validateOptionSlug } from '../../utils'

import * as T from './types'

export default class Option implements T.Option {
  constructor(
    public readonly slug: string,
    public readonly description: string,
    public readonly filter?: T.Filter,
  ) {
    switch (true) {
      case typeof slug !== 'string':
        throw errors.error.ERR_OPT_SLUG_V_TYP

      case slug.length === 0:
        throw errors.error.ERR_OPT_SLUG_V_LEN

      case !validateOptionSlug(slug):
        throwF(errors.error.ERR_OPT_SLUG_V_FMT, slug)

      case typeof description !== 'string':
        throwF(errors.error.ERR_OPT_DESC_V_TYP, slug)

      case description.length === 0:
        throwF(errors.error.ERR_OPT_DESC_V_LEN, slug)

      case filter !== undefined:
        switch (true) {
          case this.isUnusableInternalFilter(filter):
            throwF(errors.error.ERR_OPT_FILT_V_TYP, slug)

          case !this.isInternalFilter(filter) && typeof filter !== 'function':
            throwF(errors.error.ERR_OPT_FILT_V_TYP_C, slug)
        }
    }
  }

  /**
   * Is this filter the instance of a usable internal filter?
   */
  private isInternalFilter(filter: any): boolean {
    return typeof filter === 'object' && filter.constructor.name === 'IsFinal'
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
