/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import errors from '../errors'
import validateOptionSlug from '../utils/validateOptionSlug'
import { OptionFilter } from './Option.d'

export default class Option {
  public description: string
  public slug: string
  public filter?: OptionFilter

  constructor(slug: string, description: string, filter?: OptionFilter) {
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
