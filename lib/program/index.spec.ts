import program from '.'
import errors from '../errors'

describe(`Program`, () => {
  describe(`#name`, () => {
    it(`should fail to be gotten with an unset version`, () =>
      expect(() => program.name()).toThrow(errors.dictionary.ERR_PRG_NAME_V_UND))

    it(`should fail with a wrong type`, () =>
      expect(() => program.name(123 as any)).toThrow(errors.dictionary.ERR_PRG_NAME_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => program.name('')).toThrow(errors.dictionary.ERR_PRG_NAME_V_LEN))

    it(`should pass with a valid name`, () => expect(() => program.name('test')).not.toThrow())
    it(`should have set the valid name`, () => expect(program.name()).toStrictEqual('test'))
  })

  describe(`#version`, () => {
    it(`should fail to be gotten an unset version`, () =>
      expect(() => program.version()).toThrow(errors.dictionary.ERR_PRG_VERS_V_UND))

    it(`should fail with a wrong type`, () =>
      expect(() => program.version(123 as any)).toThrow(errors.dictionary.ERR_PRG_VERS_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => program.version('')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEMVER))
    it(`should fail with a valid version starting with a "v"`, () =>
      expect(() => program.version('v1.2.3')).toThrow(errors.dictionary.ERR_PRG_VERS_V_V))
    it(`should fail with a valid version starting with a "V"`, () =>
      expect(() => program.version('V1.2.3')).toThrow(errors.dictionary.ERR_PRG_VERS_V_V))
    it(`should fail with a some invalid versions`, () => {
      expect(() => program.version('0')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEMVER)
      expect(() => program.version('1')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEMVER)
      expect(() => program.version('0.0')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEMVER)
      expect(() => program.version('1.2')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEMVER)
    })

    it(`should pass with a valid version`, () => expect(() => program.version('0.0.0')).not.toThrow())
    it(`should have set the valid version`, () => expect(program.version()).toStrictEqual('0.0.0'))
  })
})
