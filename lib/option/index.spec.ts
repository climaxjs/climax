import Option from '.'
import { is } from '..'
import errors from '../errors'

const _ = undefined as any

describe(`Option`, () => {
  describe(`#constructor()`, () => {
    it(`should fail with a wrong typed <slug>`, () =>
      expect(() => new Option(1337 as any, _)).toThrow(errors.dictionary.ERR_OPTION_SLUG_VALIDATION_TYPE))
    it(`should fail with an empty string <slug>`, () =>
      expect(() => new Option('', _)).toThrow(errors.dictionary.ERR_OPTION_SLUG_VALIDATION_LENGTH))
    it(`should fail with a malformed <slug>`, () =>
      expect(() => new Option('foo', _)).toThrow(errors.dictionary.ERR_OPTION_SLUG_VALIDATION_FORMAT))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => new Option('-f, --foo', 1337 as any)).toThrow(errors.dictionary.ERR_OPTION_DESCRIPTION_VALIDATION_TYPE))
    it(`should fail with an empty string <description>`, () =>
      expect(() => new Option('-f, --foo', '')).toThrow(errors.dictionary.ERR_OPTION_DESCRIPTION_VALIDATION_LENGTH))
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => new Option('-f, --foo', 'foo', is)).toThrow(errors.dictionary.ERR_OPTION_FILTER_INTERNAL_VALIDATION_TYPE)
      expect(() => new Option('-f, --foo', 'foo', is.aMandatory)).toThrow(errors.dictionary.ERR_OPTION_FILTER_INTERNAL_VALIDATION_TYPE)
    })
    it(`should fail with a wrong typed custom <filter>`, () =>
      expect(() => new Option('-f, --foo', 'foo', 1337 as any)).toThrow(errors.dictionary.ERR_OPTION_FILTER_CUSTOM_VALIDATION_TYPE))
  })
})
