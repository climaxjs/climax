import * as T from './types'

export default class Value implements T.Value {
  constructor(
    public readonly name: string,
    public readonly description: string,
  ) {}
}
