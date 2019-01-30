import throwWith from './throwWith'

const MATCHES: any = [
  [`This is an error.`, '', '', `This is an error.`],
  [`This is an error.`, '[foo] ', '', `[foo] This is an error.`],
  [`This is an error.`, '', ' [bar]', `This is an error. [bar]`],
  [`This is an error.`, '[foo] ', ' [bar]', `[foo] This is an error. [bar]`],
]

MATCHES.forEach((match: any) =>
  test(`should throw the expected error message`, () =>
    expect(() => throwWith(new Error(match[0]), match[1], match[2])).toThrow(match[3])))
