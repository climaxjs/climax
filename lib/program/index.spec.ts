import program from '.'
import errors from '../errors'

describe(`Program`, () => {
  const PROGRAM_NAME = 'A Program Name'
  const PROGRAM_DESCRIPTION = 'A Program Description'
  const PROGRAM_VERSION = '0.1.2'

  const PROGRAM_INFO = {
    name: PROGRAM_NAME,
    description: PROGRAM_DESCRIPTION,
    version: PROGRAM_VERSION
  }

  // const COMMAND_SLUG = "a-command-slug"
  // const COMMAND_DESCRIPTION = "A Command Description"
  // const COMMAND_ACTION = args => args

  describe(`#init()`, () => {
    it(`should fail because the description is not set`, () =>
      expect(() => program.init()).toThrow(errors.dictionary.ERR_PRG_DESC_V_UND))
  })

  describe(`#description()`, () => {
    it(`should fail with a wrong type`, () =>
      expect(() => program.description(123 as any)).toThrow(errors.dictionary.ERR_CMD_DESC_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => program.description('')).toThrow(errors.dictionary.ERR_CMD_DESC_V_LEN))

    it(`should return a class instance of Program with a valid description`, () =>
      expect(program.description(PROGRAM_DESCRIPTION).constructor.name).toBe('Program'))
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

    it(`should return a class instance of Program with a valid name`, () =>
      expect(program.name(PROGRAM_NAME).constructor.name).toBe('Program'))
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

    it(`should return a class instance of Program with a valid version`, () =>
      expect(program.version(PROGRAM_VERSION).constructor.name).toBe('Program'))
  })

  describe(`#info()`, () => {
    it(`should fail with a wrong type`, () => {
      class Dummy {};

      expect(() => program.info(null as any)).toThrow(errors.dictionary.ERR_PRG_INFO_V_TYP);
      expect(() => program.info(new Dummy() as any)).toThrow(errors.dictionary.ERR_PRG_INFO_V_TYP);
    })
    it(`should fail with missing properties`, () => {
      expect(() => program.info({} as any)).toThrow(errors.dictionary.ERR_PRG_NAME_V_TYP);
      expect(() => program.info({ name: PROGRAM_NAME } as any)).toThrow(errors.dictionary.ERR_CMD_DESC_V_TYP);
      expect(() => program.info({ name: PROGRAM_NAME, description: PROGRAM_DESCRIPTION } as any))
        .toThrow(errors.dictionary.ERR_PRG_VERS_V_TYP);
    })

    it(`should return a class instance of Program with valid properties`, () =>
      expect(program.info(PROGRAM_INFO as any).constructor.name).toBe('Program'))
  })

  describe(`#init()`, () => {
    it(`should pass`, () => expect(program.init()).toBe(void 0))
  })

  describe(`#command()`, () => {
    const COMMAND_SLUG = 'an-undescribed-command-action'

    it(`should fail with an undefined slug`, () =>
      expect(() => (program as any).command()).toThrow(errors.dictionary.ERR_CMD_SLUG_V_TYP))
    it(`should fail with a wrong typed slug`, () =>
      expect(() => program.command(123 as any)).toThrow(errors.dictionary.ERR_CMD_SLUG_V_TYP))
    it(`should fail with an empty slug`, () =>
      expect(() => program.command('')).toThrow(errors.dictionary.ERR_CMD_SLUG_V_LEN))
    it(`should fail with the reserved slug keyword "_"`, () =>
      expect(() => program.command('_')).toThrow(errors.dictionary.ERR_CMD_SLUG_V_FMT))

    it(`should return a class instance of Command with a valid slug`, () =>
      expect(program.command(COMMAND_SLUG).constructor.name).toBe('Command'))
    it(`should fail with an already declared slug`, () =>
      expect(() => program.command(COMMAND_SLUG)).toThrow(errors.dictionary.ERR_CMD_SLUG_V_CFT))
  })

  describe(`#init()`, () => {
    const COMMAND_SLUG = 'an-undescribed-command-action'

    it(`should fail because the command description is not set`, () =>
      expect(() => program.init()).toThrow(`[Command: "${COMMAND_SLUG}"] ` + errors.dictionary.ERR_CMD_DESC_V_UND))
  })
})
