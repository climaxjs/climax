/**
 * TODO Validate <slug> uniqueness.
 */

import errors from '../../errors'
import { validateOptionSlug, throwWith } from '../../utils'
import Value from '../value'

import * as T from './types'
import * as ValueT from '../value/types'
const { error: E } = errors

export default class Option extends Value implements T.Option {
  public readonly slug: string
  public readonly slugLetter: string | null

  constructor(
    slug: string,
    public readonly description: string,
    public readonly filter?: ValueT.Filter,
  ) {
    super(slug, description, filter)

    switch (true) {
      case !validateOptionSlug(slug):
        throwWith(E.ERR_OPT_SLUG_V_FMT, this._e)
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
}
