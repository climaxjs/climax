import program from './Program'
import errors from '../errors'

describe(`Program`, () => {
  describe(`#name`, () => {
    it(`should fail with a wrong type`, () =>
      expect(() => program.name = 123).toThrowError(errors.dictionary.ERR_PROGRAM_NAME_VALIDATION_TYPE))
    it(`should fail with an empty name`, () =>
      expect(() => program.name = '').toThrowError(errors.dictionary.ERR_PROGRAM_NAME_VALIDATION_LENGTH))

    it(`should pass with a valid name`, () => expect(() => program.name = 'test').not.toThrow())
    it(`should have set the valid name`, () => expect(program.name).toStrictEqual('test'))
  })

  describe(`#version`, () => {
    it(`should fail to get with an unset version`, () =>
      expect(() => program.version).toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_UNDEFINED))
    it(`should fail with an empty version`, () =>
      expect(() => program.version = '').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_SEMVER))
    it(`should fail with a version starting with a "v"`, () =>
      expect(() => program.version = 'v1.2.3').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_V))
    it(`should fail with a version starting with a "V"`, () =>
      expect(() => program.version = 'V1.2.3').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_V))
    it(`should fail with a version "0"`, () =>
      expect(() => program.version = '0').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_SEMVER))
    it(`should fail with a version "0.0"`, () =>
      expect(() => program.version = '0.0').toThrowError(errors.dictionary.ERR_PROGRAM_VERSION_VALIDATION_SEMVER))

    it(`should pass with a valid version`, () => expect(() => program.version = '0.0.0').not.toThrow())
    it(`should have set the valid version`, () => expect(program.version).toStrictEqual('0.0.0'))
  })
})
