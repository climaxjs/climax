import Option from '.'
import { is } from '..'
import errors from '../errors'

const _ = undefined as any

describe(`Option`, () => {
  describe(`#constructor()`, () => {
    it(`should fail with a wrong typed <slug>`, () =>
      expect(() => new Option(1337 as any, _)).toThrow(errors.dictionary.ERR_OPT_SLUG_V_TYP))
    it(`should fail with an empty string <slug>`, () =>
      expect(() => new Option('', _)).toThrow(errors.dictionary.ERR_OPT_SLUG_V_LEN))
    it(`should fail with a malformed <slug>`, () =>
      expect(() => new Option('foo', _)).toThrow(errors.dictionary.ERR_OPT_SLUG_V_FMT.replace(/%s/, 'foo')))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => new Option('-f, --foo', 1337 as any)).toThrow(errors.dictionary.ERR_OPT_DESC_V_TYP.replace(/%s/, '-f, --foo')))
    it(`should fail with an empty string <description>`, () =>
      expect(() => new Option('-f, --foo', '')).toThrow(errors.dictionary.ERR_OPT_DESC_V_LEN.replace(/%s/, '-f, --foo')))
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => new Option('-f, --foo', 'bar', is)).toThrow(errors.dictionary.ERR_OPT_FILT_V_TYP.replace(/%s/, '-f, --foo'))
      expect(() => new Option('-f, --foo', 'bar', is.aMandatory)).toThrow(errors.dictionary.ERR_OPT_FILT_V_TYP.replace(/%s/, '-f, --foo'))
    })
    it(`should fail with a wrong typed custom <filter>`, () =>
      expect(() => new Option('-f, --foo', 'bar', 1337 as any)).toThrow(errors.dictionary.ERR_OPT_FILT_V_TYP_C.replace(/%s/, '-f, --foo')))

    it(`should return the expected instance`, () =>
      expect({ ...new Option('-f, --foo', 'bar') }).toEqual({ slug: '-f, --foo', description: 'bar', filter: undefined }))
  })
})
