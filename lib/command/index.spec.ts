import Command from '.'
import errors from '../errors'

describe(`Command`, () => {
  describe(`#description`, () => {
    const command = new Command()

    it(`should fail to be gotten with an unset description`, () =>
      expect(() => command.description()).toThrow(errors.dictionary.ERR_COMMAND_DESCRIPTION_UNDEFINED))

    it(`should fail with a wrong type`, () =>
      expect(() => command.description(123 as any)).toThrow(errors.dictionary.ERR_COMMAND_DESCRIPTION_VALIDATION_TYPE))
    it(`should fail with an empty string`, () =>
      expect(() => command.description('')).toThrow(errors.dictionary.ERR_COMMAND_DESCRIPTION_VALIDATION_LENGTH))

    it(`should pass with a valid description`, () => expect(() => command.description('test')).not.toThrow())
    it(`should have set the valid description`, () => expect(command.description()).toStrictEqual('test'))
  })
})
