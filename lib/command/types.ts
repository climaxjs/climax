/// <reference path="../filter-factory/types.ts">

namespace Program {
  export type OptionFilter<T extends OptionFilterOutput> = Filter.IsUsable | OptionFilterCustom<T>
  export type OptionFilterCustom<T extends OptionFilterOutput> = (value?: string) => T
  export type OptionFilterOutput = boolean | number | string
}
