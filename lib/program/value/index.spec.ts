import Value from '.'
import { is } from '../..'
import errors from '../../errors'

const _ = undefined as any

describe(`Value`, () => {
  describe(`#constructor()`, () => {
    it(`should fail with a wrong typed <name>`, () =>
      expect(() => new Value(1337 as any, _)).toThrow(errors.dictionary.ERR_VAL_NAME_V_TYP))
    it(`should fail with an empty string <name>`, () =>
      expect(() => new Value('', _)).toThrow(errors.dictionary.ERR_VAL_NAME_V_LEN))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => new Value('foo', 1337 as any)).toThrow(errors.dictionary.ERR_VAL_DESC_V_TYP.replace(/%s/, 'foo')))
    it(`should fail with an empty string <description>`, () =>
      expect(() => new Value('foo', '')).toThrow(errors.dictionary.ERR_VAL_DESC_V_LEN.replace(/%s/, 'foo')))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => new Value('foo', 1337 as any))
        .toThrow(errors.dictionary.ERR_VAL_DESC_V_TYP.replace(/%s/, 'foo')))
    it(`should fail with an empty string <description>`, () =>
      expect(() => new Value('foo', ''))
        .toThrow(errors.dictionary.ERR_VAL_DESC_V_LEN.replace(/%s/, 'foo')))
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => new Value('foo', 'bar', is as any))
        .toThrow(errors.dictionary.ERR_VAL_FILT_V_TYP.replace(/%s/, 'foo'))
      expect(() => new Value('foo', 'bar', is.aMandatory as any))
        .toThrow(errors.dictionary.ERR_VAL_FILT_V_TYP.replace(/%s/, 'foo'))
    })
    it(`should fail with a wrong typed custom <filter>`, () =>
      expect(() => new Value('foo', 'bar', 1337 as any))
        .toThrow(errors.dictionary.ERR_VAL_FILT_V_TYP_C.replace(/%s/, 'foo')))

    it(`should return the expected instance`, () =>
      expect({ ...new Value('foo', 'bar') }).toMatchObject({ name: 'foo', description: 'bar' }))
  })
})
