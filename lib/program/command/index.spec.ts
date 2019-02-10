import Command from '.'
import { is } from '../..'
import errors from '../../errors'

const _ = undefined as any

describe(`Command`, () => {
  const command = new Command('foo')

  describe(`#validate()`, () => {
    it(`should fail because the description is not set`, () =>
      expect(() => command.validate()).toThrow(errors.dictionary.ERR_CMD_DESC_V_UND))
  })

  describe(`#description()`, () => {
    it(`should fail with a wrong type`, () =>
      expect(() => command.description(123 as any)).toThrow(errors.dictionary.ERR_CMD_DESC_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => command.description('')).toThrow(errors.dictionary.ERR_CMD_DESC_V_LEN))

    it(`should pass with a valid description`, () => expect(() => command.description('foo')).not.toThrow())

    it(`should return a class instance of Command`, () =>
      expect(command.description('foo').constructor.name).toBe('Command'))
  })

  describe(`#validate()`, () => {
    it(`should pass`, () => expect(() => command.validate()).not.toThrow())
  })

  describe(`#option()`, () => {
    it(`should fail with a wrong typed <slug>`, () =>
      expect(() => command.option(1337 as any, _))
        .toThrow(`[Command: "foo"] ` + errors.dictionary.ERR_VAL_NAME_V_TYP))
    it(`should fail with an empty string <slug>`, () =>
      expect(() => command.option('', _))
        .toThrow(`[Command: "foo"] ` + errors.dictionary.ERR_VAL_NAME_V_LEN))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => command.option('-b, --bar', 1337 as any))
        .toThrow(`[Command: "foo"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_DESC_V_TYP))
    it(`should fail with an empty string <description>`, () =>
      expect(() => command.option('-b, --bar', ''))
        .toThrow(`[Command: "foo"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_DESC_V_LEN))
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => command.option('-b, --bar', 'lambda', is as any))
        .toThrow(`[Command: "foo"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP)
      expect(() => command.option('-b, --bar', 'lambda', is.aMandatory as any))
        .toThrow(`[Command: "foo"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP)
    })
    it(`should fail with a wrong typed custom <filter>`, () =>
      expect(() => command.option('-b, --bar', 'lambda', 1337 as any))
        .toThrow(`[Command: "foo"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP_C))
    it(`should fail with a malformed <slug>`, () =>
      expect(() => command.option('bar', 'lambda'))
        .toThrow(`[Command: "foo"] [Option: "bar"] ` + errors.dictionary.ERR_OPT_SLUG_V_FMT))

    it(`should return a class instance of Command`, () =>
      expect(command.option('-b, --bar', 'lambda').constructor.name).toBe('Command'))
  })

  describe(`#value()`, () => {
    it(`should fail with a wrong typed <name>`, () =>
      expect(() => command.value(1337 as any, _))
        .toThrow(`[Command: "foo"] ` + errors.dictionary.ERR_VAL_NAME_V_TYP))
    it(`should fail with an empty string <name>`, () =>
      expect(() => command.value('', _))
        .toThrow(`[Command: "foo"] ` + errors.dictionary.ERR_VAL_NAME_V_LEN))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => command.value('bar', 1337 as any))
        .toThrow(`[Command: "foo"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_DESC_V_TYP))
    it(`should fail with an empty string <description>`, () =>
      expect(() => command.value('bar', ''))
        .toThrow(`[Command: "foo"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_DESC_V_LEN))
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => command.value('bar', 'lambda', is as any))
        .toThrow(`[Command: "foo"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP)
      expect(() => command.value('bar', 'lambda', is.aMandatory as any))
        .toThrow(`[Command: "foo"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP)
    })
    it(`should fail with a wrong typed custom <filter>`, () =>
      expect(() => command.value('bar', 'lambda', 1337 as any))
        .toThrow(`[Command: "foo"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP_C))

    it(`should return a class instance of Command`, () =>
      expect(command.value('-f, --foo', 'bar').constructor.name).toBe('Command'))
  })

  describe(`#action()`, () => {
    it(`should fail with a wrong typed <callback>`, () =>
      expect(() => command.action(1337 as any))
        .toThrow(errors.dictionary.ERR_CMD_ACTN_V_TYP))

    it(`should return a class instance of Command`, () =>
      expect(command.value('-f, --foo', 'bar').constructor.name).toBe('Command'))
  })
})
