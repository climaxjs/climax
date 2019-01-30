import throwF from './throwF'

const MATCHES: any = [
  [`This error is %b.`, 0b10,           `This error is 10.`],
  [`This error is %t.`, true,           `This error is true.`],
  [`This error is %f.`, 1.23445678901,  `This error is 1.23445678901.`],
  [`This error is %x.`, 0xa,            `This error is a.`],
  [`This error is %j.`, { foo: 'bar' }, `This error is {"foo":"bar"}.`],
  [`This error is %o.`, 0o10,           `This error is 10.`],
  [`This error is %s.`, 'foo',          `This error is foo.`],
  [`This error is %T.`, undefined,      `This error is undefined.`],
]

test(`should output a % arg`, () =>
  expect(() => throwF(new Error(`This error is %%.`))).toThrow(`This error is %.`))

MATCHES.forEach((match: any) =>
  test(`should throw the expected error`, () =>
    expect(() => throwF(new Error(match[0]), match[1])).toThrow(match[2])))
