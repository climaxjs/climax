import Command from '.'
import errors from '../errors'

describe(`Command`, () => {
  describe(`#description`, () => {
    const command = new Command()

    it(`should fail to be gotten with an unset description`, () =>
      expect(() => command.description()).toThrow(errors.dictionary.ERR_CMD_DESC_V_UND))

    it(`should fail with a wrong type`, () =>
      expect(() => command.description(123 as any)).toThrow(errors.dictionary.ERR_CMD_DESC_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => command.description('')).toThrow(errors.dictionary.ERR_CMD_DESC_V_LEN))

    it(`should pass with a valid description`, () => expect(() => command.description('test')).not.toThrow())
    it(`should have set the valid description`, () => expect(command.description()).toStrictEqual('test'))
  })
})
