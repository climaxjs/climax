/**
 * TODO Validate <slug> uniqueness.
 */

import errors from '../../errors'
import { throwF, validateOptionSlug } from '../../utils'

import * as T from './types'
const { error: E } = errors

export default class Option implements T.Option {
  public readonly slug: string
  public readonly slugLetter: string | null

  constructor(
    slug: string,
    public readonly description: string,
    public readonly filter?: T.Filter,
  ) {
    switch (true) {
      case typeof slug !== 'string':
        throw E.ERR_OPT_SLUG_V_TYP

      case slug.length === 0:
        throw E.ERR_OPT_SLUG_V_LEN

      case !validateOptionSlug(slug):
        throwF(E.ERR_OPT_SLUG_V_FMT, slug)

      case typeof description !== 'string':
        throwF(E.ERR_OPT_DESC_V_TYP, slug)

      case description.length === 0:
        throwF(E.ERR_OPT_DESC_V_LEN, slug)

      case filter !== undefined:
        switch (true) {
          case this.isUnusableInternalFilter(filter):
            throwF(E.ERR_OPT_FILT_V_TYP, slug)

          case !this.isInternalFilter(filter) && typeof filter !== 'function':
            throwF(E.ERR_OPT_FILT_V_TYP_C, slug)
        }
    }

    const slugs = slug
      .split(', ')
      .map(slug =>
        slug
          .replace(/-+/, '')
          .replace(/-([a-z])/g, match => match[1].toUpperCase()))

    this.slug = slugs.length === 2 ? slugs[1] : slugs[0]
    this.slugLetter = slugs.length === 2 ? slugs[0] : null
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
