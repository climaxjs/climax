namespace Program {
  export type OptionFilter = <T>(
    command: string,
    slug: string,
    value: string | undefined,
  ) => T
}
