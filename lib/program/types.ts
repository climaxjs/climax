namespace Program {
  export type OptionFilter<T extends OptionFilterOutput> = (data: OptionFilterData) => T
  export type OptionFilterData = {
    command: string,
    slug: string,
    value?: string,
  }
  export type OptionFilterOutput = boolean | number | string
}
