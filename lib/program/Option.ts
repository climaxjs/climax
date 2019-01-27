/**
 * TODO Validate <slug> uniqueness.
 */

import errors from '../errors'
import validateOptionSlug from '../utils/validateOptionSlug'

/// <reference path="./type.ts" />

export default class Option {
  public description: string
  public slug: string
  public filter?: Filter.Is | Program.OptionFilter<Program.OptionFilterOutput>

  constructor(
    slug: string,
    description: string,
    filter?: Filter.Is | Program.OptionFilter<Program.OptionFilterOutput>,
  ) {
    console.log(typeof filter)
    if (filter !== undefined && typeof filter === 'object') console.log(filter.constructor.name)
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

      case filter !== undefined:
        switch (true) {
          case this.isUnusableInternalFilter(filter) :
            throw errors.error.ERR_OPTION_FILTER_INTERNAL_VALIDATION_TYPE

          case !this.isInternalFilter(filter) && typeof filter !== 'function':
            throw errors.error.ERR_OPTION_FILTER_CUSTOM_VALIDATION_TYPE
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
