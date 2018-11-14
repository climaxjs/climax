import program from './Program'
import errors from '../errors'

describe(`Program`, () => {
  describe(`#description`, () => {
    it(`should fail to be gotten with an unset description`, () =>
      expect(() => program.description).toThrowError(errors.dictionary.ERR_PROGRAM_DESCRIPTION_UNDEFINED))

    it(`should fail with a wrong type`, () =>
      expect(() => program.description = 123).toThrowError(errors.dictionary.ERR_PROGRAM_DESCRIPTION_VALIDATION_TYPE))
    it(`should fail with an empty string`, () =>
      expect(() => program.description = '').toThrowError(errors.dictionary.ERR_PROGRAM_DESCRIPTION_VALIDATION_LENGTH))

    it(`should pass with a valid description`, () => expect(() => program.description = 'test').not.toThrow())
    it(`should have set the valid description`, () => expect(program.description).toStrictEqual('test'))
  })

  describe(`#name`, () => {
    it(`should fail to be gotten with an unset version`, () =>
      expect(() => program.name).toThrowError(errors.dictionary.ERR_PROGRAM_NAME_UNDEFINED))

    it(`should fail with a wrong type`, () =>
      expect(() => program.name = 123).toThrowError(errors.dictionary.ERR_PROGRAM_NAME_VALIDATION_TYPE))
    it(`should fail with an empty string`, () =>
      expect(() => program.name = '').toThrowError(errors.dictionary.ERR_PROGRAM_NAME_VALIDATION_LENGTH))

    it(`should pass with a valid name`, () => expect(() => program.name = 'test').not.toThrow())
    it(`should have set the valid name`, () => expect(program.name).toStrictEqual('test'))
  })

  describe(`#version`, () => {
    it(`should fail to be gotten an unset version`, () =>
      expect(() => program.version).toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_UNDEFINED))

    it(`should fail with a wrong type`, () =>
      expect(() => program.version = 123).toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_TYPE))
    it(`should fail with an empty string`, () =>
      expect(() => program.version = '').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_SEMVER))
    it(`should fail with a valid version starting with a "v"`, () =>
      expect(() => program.version = 'v1.2.3').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_V))
    it(`should fail with a valid version starting with a "V"`, () =>
      expect(() => program.version = 'V1.2.3').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_V))
    it(`should fail with a some invalid versions`, () => {
      expect(() => program.version = '0').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_SEMVER)
      expect(() => program.version = '1').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_SEMVER)
      expect(() => program.version = '0.0').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_SEMVER)
      expect(() => program.version = '1.2').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_SEMVER)
    })

    it(`should pass with a valid version`, () => expect(() => program.version = '0.0.0').not.toThrow())
    it(`should have set the valid version`, () => expect(program.version).toStrictEqual('0.0.0'))
  })
})
