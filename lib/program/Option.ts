/**
 * TODO Validate <slug> uniqueness.
 */

import errors from '../errors'
import validateOptionSlug from '../utils/validateOptionSlug'
/// <reference path="./type.ts" />

export default class Option {
  public description: string
  public slug: string
  public filter?: Program.OptionFilter

  constructor(
    slug: string,
    description: string,
    filter?: Program.OptionFilter,
  ) {
    switch (true) {
      case typeof slug !== 'string':
        throw errors.error.ERR_OPTION_SLUG_VALIDATION_TYPE

      case slug.length === 0:
        throw errors.error.ERR_OPTION_SLUG_VALIDATION_LENGTH

      case !validateOptionSlug(slug):
        throw errors.error.ERR_OPTION_SLUG_VALIDATION_FORMAT

      case typeof description !== 'string':
        throw errors.error.ERR_OPTION_DESCRIPTION_VALIDATION_TYPE

      case description.length === 0:
        throw errors.error.ERR_OPTION_DESCRIPTION_VALIDATION_LENGTH

      case typeof filter !== 'undefined' && typeof filter !== 'function':
        throw errors.error.ERR_OPTION_FILTER_VALIDATION_TYPE
    }

    this.description = description
    this.slug = slug
    this.filter = filter
  }
}
