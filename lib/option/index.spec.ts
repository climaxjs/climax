import Option from '.'
import { is } from '..'
import errors from '../errors'

const _ = undefined as any
console.log = jest.fn()

describe(`Option`, () => {
  describe(`#constructor()`, () => {
    it(`should fail with a wrong typed <slug>`, () =>
    expect(() => new Option(1337 as any, _)).toThrow(errors.dictionary.ERR_OPT_SLUG_V_TYP))
    it(`should fail with an empty string <slug>`, () =>
    expect(() => new Option('', _)).toThrow(errors.dictionary.ERR_OPT_SLUG_V_LEN))
    it(`should fail with a malformed <slug>`, () => {
      expect(() => new Option('foo', _)).toThrow(errors.dictionary.ERR_OPT_SLUG_V_FMT)
      expect((console.log as any).mock.calls[0][0]).toMatch(`Option: foo`)
    })
    it(`should fail with a wrong typed <description>`, () => {
      expect(() => new Option('-f, --foo', 1337 as any)).toThrow(errors.dictionary.ERR_OPT_DESC_V_TYP)
      expect((console.log as any).mock.calls[1][0]).toMatch(`Option: -f, --foo`)
    })
    it(`should fail with an empty string <description>`, () => {
      expect(() => new Option('-f, --foo', '')).toThrow(errors.dictionary.ERR_OPT_DESC_V_LEN)
      expect((console.log as any).mock.calls[2][0]).toMatch(`Option: -f, --foo`)
    })
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => new Option('-f, --foo', 'foo', is)).toThrow(errors.dictionary.ERR_OPT_FILT_V_TYP)
      expect(() => new Option('-f, --foo', 'foo', is.aMandatory)).toThrow(errors.dictionary.ERR_OPT_FILT_V_TYP)
      expect((console.log as any).mock.calls[3][0]).toMatch(`Option: -f, --foo`)
    })
    it(`should fail with a wrong typed custom <filter>`, () => {
      expect(() => new Option('-f, --foo', 'foo', 1337 as any)).toThrow(errors.dictionary.ERR_OPT_FILT_V_TYP_C)
      expect((console.log as any).mock.calls[4][0]).toMatch(`Option: -f, --foo`)
    })
  })
})
