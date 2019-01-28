// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581

import * as ramda from 'ramda'

declare module 'ramda' {
  interface Filter {
    <T>(fn: (value: T) => boolean): (list: ReadonlyArray<T>) => T[];
    <T>(fn: (value: T) => boolean, list: ReadonlyArray<T>): T[];
  }
}
