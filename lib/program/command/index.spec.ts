import Command from '.'
import { is } from '../..'
import errors from '../../errors'

const _ = undefined as any

describe(`Command`, () => {
  const command = new Command('foo')

  describe(`#description`, () => {
    it(`should fail to be gotten with an unset description`, () =>
      expect(() => command.description()).toThrow(errors.dictionary.ERR_CMD_DESC_V_UND))
    it(`should fail with a wrong type`, () =>
      expect(() => command.description(123 as any)).toThrow(errors.dictionary.ERR_CMD_DESC_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => command.description('')).toThrow(errors.dictionary.ERR_CMD_DESC_V_LEN))

    it(`should pass with a valid description`, () => expect(() => command.description('test')).not.toThrow())
    it(`should have set the valid description`, () => expect(command.description()).toStrictEqual('test'))
  })

  describe(`#option()`, () => {
    it(`should fail with a wrong typed <slug>`, () =>
      expect(() => command.option(1337 as any, _))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_OPT_SLUG_V_TYP))
    it(`should fail with an empty string <slug>`, () =>
      expect(() => command.option('', _))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_OPT_SLUG_V_LEN))
    it(`should fail with a malformed <slug>`, () =>
      expect(() => command.option('foo', _))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_OPT_SLUG_V_FMT.replace(/%s/, 'foo')))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => command.option('-f, --foo', 1337 as any))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_OPT_DESC_V_TYP.replace(/%s/, '-f, --foo')))
    it(`should fail with an empty string <description>`, () =>
      expect(() => command.option('-f, --foo', ''))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_OPT_DESC_V_LEN.replace(/%s/, '-f, --foo')))
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => command.option('-f, --foo', 'bar', is))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_OPT_FILT_V_TYP.replace(/%s/, '-f, --foo'))
      expect(() => command.option('-f, --foo', 'bar', is.aMandatory))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_OPT_FILT_V_TYP.replace(/%s/, '-f, --foo'))
    })
    it(`should fail with a wrong typed custom <filter>`, () =>
      expect(() => command.option('-f, --foo', 'bar', 1337 as any))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_OPT_FILT_V_TYP_C.replace(/%s/, '-f, --foo')))
  })

  describe(`#value()`, () => {
    it(`should fail with a wrong typed <name>`, () =>
      expect(() => command.value(1337 as any, _))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_VAL_NAME_V_TYP))
    it(`should fail with an empty string <name>`, () =>
      expect(() => command.value('', _))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_VAL_NAME_V_LEN))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => command.value('-f, --foo', 1337 as any))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_VAL_DESC_V_TYP.replace(/%s/, '-f, --foo')))
    it(`should fail with an empty string <description>`, () =>
      expect(() => command.value('-f, --foo', ''))
        .toThrow(`[Command: "foo"]` + errors.dictionary.ERR_VAL_DESC_V_LEN.replace(/%s/, '-f, --foo')))
  })
})
