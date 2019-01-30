import logT from './logT'

console.log = jest.fn()

test(`should throw the expected error message`, () =>
  expect(() => logT(`This is the error log.`, new Error(`This is the error.`))).toThrow(`This is the error.`))

test(`should have logged the expected message`, () =>
  expect((console.log as any).mock.calls[0][0]).toMatch(`This is the error log.`))
