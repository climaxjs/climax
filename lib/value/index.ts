import errors from '../errors'
import { throwF } from '../utils'

import * as T from './types'

export default class Value implements T.Value {
  constructor(
    public readonly name: string,
    public readonly description: string,
  ) {
    switch (true) {
      case typeof name !== 'string':
        throw errors.error.ERR_VAL_NAME_V_TYP

      case name.length === 0:
        throw errors.error.ERR_VAL_NAME_V_LEN

      case typeof description !== 'string':
        throwF(errors.error.ERR_VAL_DESC_V_TYP, name)

      case description.length === 0:
        throwF(errors.error.ERR_VAL_DESC_V_LEN, name)
    }
  }
}
