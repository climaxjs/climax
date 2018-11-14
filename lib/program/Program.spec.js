import program from './Program'
import errors from '../errors'

describe(`Program`, () => {
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

    it(`should pass with a version "0.0.0"`, () => expect(() => program.version = '0.0.0').not.toThrow())
    it(`should have saved the correct version`, () => expect(program.version).toStrictEqual('0.0.0'))
  })
})
