import * as rorre from 'rorre'

import getErrorWith from './getErrorWith'

class RorreError extends Error implements rorre.RorreError<string, string> {}

test(`should be an object`, () =>
  expect(typeof getErrorWith(new RorreError(''))).toBe('object'))
test(`should be an instance of Error`, () =>
  expect(getErrorWith(new RorreError('')).constructor.name).toBe('Error'))
test(`should output a % arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %%.`)).message).toBe(`This error is %.`))
test(`should output a binary arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %b.`), 0b10).message).toBe(`This error is 10.`))
test(`should output a boolean arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %t.`), true).message).toBe(`This error is true.`))
test(`should output a float arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %f.`), 1.23445678901).message).toBe(`This error is 1.23445678901.`))
test(`should output an hexadecimal arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %x.`), 0xa).message).toBe(`This error is a.`))
test(`should output an object arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %j.`), { foo: 'bar' }).message).toBe(`This error is {"foo":"bar"}.`))
test(`should output an octal arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %o.`), 0o10).message).toBe(`This error is 10.`))
test(`should output a string arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %s.`), 'foo').message).toBe(`This error is foo.`))
test(`should output a type arg`, () =>
  expect(getErrorWith(new RorreError(`This error is %T.`), undefined).message).toBe(`This error is undefined.`))
