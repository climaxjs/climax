import program from '.'
import errors from '../errors'

describe(`Program`, () => {
  describe(`#validate()`, () => {
    it(`should fail because the description is not set`, () =>
      expect(() => program.validate()).toThrow(errors.dictionary.ERR_CMD_DESC_V_UND))
  })

  describe(`#init()`, () => {
    it(`should fail because the description is not set`, () =>
      expect(() => program.init()).toThrow(errors.dictionary.ERR_CMD_DESC_V_UND))
  })

  describe(`#description()`, () => {
    it(`should fail with a wrong type`, () =>
      expect(() => program.description(123 as any)).toThrow(errors.dictionary.ERR_CMD_DESC_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => program.description('')).toThrow(errors.dictionary.ERR_CMD_DESC_V_LEN))

    it(`should pass with a valid description`, () =>
      expect(() => program.description('foo')).not.toThrow())
    it(`should return a class instance of Program`, () =>
      expect(program.description('foo').constructor.name).toBe('Program'))
  })

  describe(`#validate()`, () => {
    it(`should fail because the name is not set`, () => {
      expect(() => program.validate()).toThrow(errors.dictionary.ERR_PRG_NAME_V_UND)
    })
  })

  describe(`#init()`, () => {
    it(`should fail because the name is not set`, () =>
      expect(() => program.init()).toThrow(errors.dictionary.ERR_PRG_NAME_V_UND))
  })

  describe(`#name()`, () => {
    it(`should fail with a wrong type`, () =>
      expect(() => program.name(123 as any)).toThrow(errors.dictionary.ERR_PRG_NAME_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => program.name('')).toThrow(errors.dictionary.ERR_PRG_NAME_V_LEN))

    it(`should pass with a valid name`, () =>
      expect(() => program.name('foo')).not.toThrow())
    it(`should return a class instance of Program`, () =>
      expect(program.name('foo').constructor.name).toBe('Program'))
  })

  describe(`#validate()`, () => {
    it(`should fail because the version is not set`, () =>
      expect(() => program.validate()).toThrow(errors.dictionary.ERR_PRG_VERS_V_UND))
  })

  describe(`#init()`, () => {
    it(`should fail because the version is not set`, () =>
      expect(() => program.init()).toThrow(errors.dictionary.ERR_PRG_VERS_V_UND))
  })

  describe(`#version()`, () => {
    it(`should fail with a wrong type`, () =>
      expect(() => program.version(123 as any)).toThrow(errors.dictionary.ERR_PRG_VERS_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => program.version('')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEM))
    it(`should fail with a valid version starting with a "v"`, () =>
      expect(() => program.version('v1.2.3')).toThrow(errors.dictionary.ERR_PRG_VERS_V_NOV))
    it(`should fail with a valid version starting with a "V"`, () =>
      expect(() => program.version('V1.2.3')).toThrow(errors.dictionary.ERR_PRG_VERS_V_NOV))
    it(`should fail with a some invalid versions`, () => {
      expect(() => program.version('0')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEM)
      expect(() => program.version('1')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEM)
      expect(() => program.version('0.0')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEM)
      expect(() => program.version('1.2')).toThrow(errors.dictionary.ERR_PRG_VERS_V_SEM)
    })

    it(`should pass with a valid version`, () =>
      expect(() => program.version('0.0.0')).not.toThrow())
    it(`should return a class instance of Program`, () =>
      expect(program.version('0.0.0').constructor.name).toBe('Program'))
  })

  describe(`#validate()`, () => {
    it(`should pass`, () => expect(() => program.validate()).not.toThrow())
  })

  describe(`#command()`, () => {
    it(`should fail with an undefined slug`, () =>
      expect(() => (program as any).command()).toThrow(errors.dictionary.ERR_CMD_SLUG_V_TYP))
    it(`should fail with a wrong typed slug`, () =>
      expect(() => program.command(123 as any)).toThrow(errors.dictionary.ERR_CMD_SLUG_V_TYP))
    it(`should fail with an empty slug`, () =>
      expect(() => program.command('')).toThrow(errors.dictionary.ERR_CMD_SLUG_V_LEN))

    it(`should pass with a valid slug`, () => expect(() => program.command('foo')).not.toThrow())
    it(`should fail with an already declared slug`, () =>
      expect(() => program.command('foo')).toThrow(errors.dictionary.ERR_CMD_SLUG_V_CFT))
    it(`should return a class instance of Command`, () =>
      expect(program.command('bar').constructor.name).toBe('Command'))
  })
})
