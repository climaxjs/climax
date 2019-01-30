/**
 * TODO Validate <slug> uniqueness.
 */

import errors from '../errors'
import { logT } from '../utils'
import validateOptionSlug from '../utils/validateOptionSlug'

import * as T from './types'

export default class Option {
  public description: string
  public slug: string
  public filter?: T.Filter

  constructor(slug: string, description: string, filter?: T.Filter) {
    const logM = `Option: ${slug}`
    switch (true) {
      case typeof slug !== 'string':
        throw errors.error.ERR_OPT_SLUG_V_TYP

      case slug.length === 0:
        throw errors.error.ERR_OPT_SLUG_V_LEN

      case !validateOptionSlug(slug):
        logT(logM, errors.error.ERR_OPT_SLUG_V_FMT)

      case typeof description !== 'string':
        logT(logM, errors.error.ERR_OPT_DESC_V_TYP)

      case description.length === 0:
        logT(logM, errors.error.ERR_OPT_DESC_V_LEN)

      case filter !== undefined:
        switch (true) {
          case this.isUnusableInternalFilter(filter):
            logT(logM, errors.error.ERR_OPT_FILT_V_TYP)

          case !this.isInternalFilter(filter) && typeof filter !== 'function':
            logT(logM, errors.error.ERR_OPT_FILT_V_TYP_C)
        }
    }

    this.description = description
    this.slug = slug
    this.filter = filter
  }

  private isInternalFilter(filter: any): boolean {
    return typeof filter === 'object' && (
      ['IsBoolean', 'IsNumber', 'IsString'].includes(filter.constructor.name)
    )
  }

  private isUnusableInternalFilter(filter: any): boolean {
    return typeof filter === 'object' && (
      ['Is', 'IsObligation', 'IsType'].includes(filter.constructor.name)
    )
  }
}
