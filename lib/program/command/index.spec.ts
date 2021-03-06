import log from "@inspired-beings/log"
jest.mock("@inspired-beings/log");

import Command from '.'
import { is } from '../..'
import errors from '../../errors'
import { parseArgs } from '../../utils'

import { BNSObject, BNS } from '../../types';

const _ = undefined as any

describe(`Command`, () => {
  const COMMAND_SLUG = 'a-command'
  const COMMAND_DESCRIPTION = 'A Command Description'

  const command = new Command(COMMAND_SLUG)

  describe(`#constructor()`, () => {
    it(`should fail with a wrong type slug`, () =>
      expect(() => new Command(123 as any)).toThrow(errors.dictionary.ERR_CMD_SLUG_V_TYP))
    it(`should fail with an emprty slug`, () =>
      expect(() => new Command('')).toThrow(errors.dictionary.ERR_CMD_SLUG_V_LEN))
    it(`should fail with a malformed slug`, () =>
      expect(() => new Command('-a')).toThrow(errors.dictionary.ERR_CMD_SLUG_V_FMT))
  })

  describe(`#validate()`, () => {
    it(`should fail because the description is not set`, () =>
      expect(() => command.validate()).toThrow(errors.dictionary.ERR_CMD_DESC_V_UND))
  })

  describe(`#description()`, () => {
    it(`should fail with a wrong type`, () =>
      expect(() => command.description(123 as any)).toThrow(errors.dictionary.ERR_CMD_DESC_V_TYP))
    it(`should fail with an empty string`, () =>
      expect(() => command.description('')).toThrow(errors.dictionary.ERR_CMD_DESC_V_LEN))

    it(`should return a class instance of Command`, () =>
      expect(command.description(COMMAND_DESCRIPTION).constructor.name).toBe('Command'))
  })

  describe(`#validate()`, () => {
    it(`should fail because the action is not set`, () =>
      expect(() => command.validate()).toThrow(errors.dictionary.ERR_CMD_ACTN_V_UND))
  })

  describe(`#option()`, () => {
    it(`should fail with a wrong typed <slug>`, () =>
      expect(() => command.option(1337 as any, _))
        .toThrow(`[Command: "${COMMAND_SLUG}"] ` + errors.dictionary.ERR_VAL_NAME_V_TYP))
    it(`should fail with an empty string <slug>`, () =>
      expect(() => command.option('', _))
        .toThrow(`[Command: "${COMMAND_SLUG}"] ` + errors.dictionary.ERR_VAL_NAME_V_LEN))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => command.option('-b, --bar', 1337 as any))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_DESC_V_TYP))
    it(`should fail with an empty string <description>`, () =>
      expect(() => command.option('-b, --bar', ''))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_DESC_V_LEN))
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => command.option('-b, --bar', 'lambda', is as any))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP)
      expect(() => command.option('-b, --bar', 'lambda', is.aMandatory as any))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP)
    })
    it(`should fail with a wrong typed custom <filter>`, () =>
      expect(() => command.option('-b, --bar', 'lambda', 1337 as any))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Option: "-b, --bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP_C))
    it(`should fail with a malformed <slug>`, () =>
      expect(() => command.option('bar', 'lambda'))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Option: "bar"] ` + errors.dictionary.ERR_OPT_SLUG_V_FMT))

    it(`should return a class instance of Command`, () =>
      expect(command.option('-b, --bar', 'lambda').constructor.name).toBe('Command'))
  })

  describe(`#value()`, () => {
    it(`should fail with a wrong typed <name>`, () =>
      expect(() => command.value(1337 as any, _))
        .toThrow(`[Command: "${COMMAND_SLUG}"] ` + errors.dictionary.ERR_VAL_NAME_V_TYP))
    it(`should fail with an empty string <name>`, () =>
      expect(() => command.value('', _))
        .toThrow(`[Command: "${COMMAND_SLUG}"] ` + errors.dictionary.ERR_VAL_NAME_V_LEN))
    it(`should fail with a wrong typed <description>`, () =>
      expect(() => command.value('bar', 1337 as any))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_DESC_V_TYP))
    it(`should fail with an empty string <description>`, () =>
      expect(() => command.value('bar', ''))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_DESC_V_LEN))
    it(`should fail with an unprocessable internal <filter>`, () => {
      expect(() => command.value('bar', 'lambda', is as any))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP)
      expect(() => command.value('bar', 'lambda', is.aMandatory as any))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP)
    })
    it(`should fail with a wrong typed custom <filter>`, () =>
      expect(() => command.value('bar', 'lambda', 1337 as any))
        .toThrow(`[Command: "${COMMAND_SLUG}"] [Value: "bar"] ` + errors.dictionary.ERR_VAL_FILT_V_TYP_C))

    it(`should return a class instance of Command`, () =>
      expect(command.value('bar', 'lamda').constructor.name).toBe('Command'))
  })

  describe(`#action()`, () => {
    it(`should fail with a wrong typed <callback>`, () =>
      expect(() => command.action(1337 as any))
        .toThrow(errors.dictionary.ERR_CMD_ACTN_V_TYP))

    it(`should return a class instance of Command`, () =>
      expect(command.value('foo', 'bar').constructor.name).toBe('Command'))
  })
})

describe(`Command#run()`, () => {
  const g = (args: string[]) => parseArgs([], args).slice(1) as [BNSObject, BNS[]]
  const COMMAND_ACTION = jest.fn()
  process.exit = jest.fn() as any

  const command = new Command('foo')
    .option('-a, --alpha', 'Alpha option description.', is.aMandatory.boolean)
    .option('-B, --beta', 'Beta option description.', is.aMandatory.integer)
    .option('-g, --gamma', 'Gamma option description.', is.anOptional.float.else(0))
    .option('-d, --delta', 'Delta option description.')
    .option('-z, --zeta', 'Zeta option description.', value => {
      if (value === 42) throw 'Wow!'

      return 'An option custom filter.'
    })
    .option('-k, --kappa', 'Kappa option description.', is.anOptional.float)
    .option('-t, --theta', 'Theta option description.', is.anOptional.boolean)
    .option('-T, --tau', 'Tau option description.', is.anOptional.boolean)
    .option('--lamda', 'Lambda option description.', is.aMandatory.list(['leet', 'l33t', '1337']))
    .value('omega', 'Omega value description', is.aMandatory.string)
    .value('epsilon', 'Epsilon value description', is.anOptional.string.else('Who knows?'))
    .value('sigma', 'Sigma value description', value => {
      if (value === 42) throw 'Wow2!'

      return 'A value custom filter.'
    })
    .action(COMMAND_ACTION)

  beforeEach(() => {
    (log.err as jest.Mock<never>).mockClear();
    (log.warn as jest.Mock<never>).mockClear();
    (process.exit as jest.Mock<never>).mockClear();
  })

  it(`should log the expected message and throw the expected error`, () => {
    const [rawOptions, rawValues] = g(['-aB', '123', '--lamda', 'leet', 'A.', '--zeta', '42'])

    expect(() => command.run(rawOptions, rawValues)).toThrowError(errors.dictionary.ERR_CMD_PROC_X_FLT_C)
    expect(log.err).toHaveBeenLastCalledWith('Wow!')
  })

  it(`should log the expected message and throw the expected error`, () => {
    const [rawOptions, rawValues] = g(['-aB', '123', '--lamda', 'leet', 'Omega', 'Epsilon', '42'])

    expect(() => command.run(rawOptions, rawValues)).toThrowError(errors.dictionary.ERR_CMD_PROC_X_FLT_C)
    expect(log.err).toHaveBeenLastCalledWith('Wow2!')
  })

  it(`should log the expected message`, () => {
    const [rawOptions, rawValues] = g(['-aB', '123', '--lamda', 'leet', 'Omega', '--wth'])

    expect(() => command.run(rawOptions, rawValues)).not.toThrow()
    expect(log.warn)
      .toHaveBeenCalledWith('Unknow option %s. Please run --help.', '--wth')
  })

  it(`should log the expected message`, () => {
    const [rawOptions, rawValues] = g(['-aB', '123', '--lamda', 'leet', 'Omega', '-w'])

    expect(() => command.run(rawOptions, rawValues)).not.toThrow()
    expect(log.warn)
      .toHaveBeenCalledWith('Unknow option %s. Please run --help.', '-w')
  })

  it(`should log the expected message`, () => {
    const [rawOptions, rawValues] = g(['-aB', '123', '--lamda', 'leet', 'Omega', 'Epsilon', 'Sigma', 'WTH?'])

    expect(() => command.run(rawOptions, rawValues)).not.toThrow()
    expect(log.warn)
      .toHaveBeenCalledWith('Too many values ("%s"). Please run --help.', 'WTH?')
  })

  it(`should log the expected message`, () => {
    const [rawOptions, rawValues] = g(['-aB', 'foo', '--lamda', 'leet', 'Omega'])

    expect(() => command.run(rawOptions, rawValues)).not.toThrow()
    expect(log.err).toHaveBeenCalledWith('Error: %s option must be a processable number.', '--beta')
    expect((process.exit as any)).toHaveBeenCalledWith(1)
  })

  it(`should return the expected options and values`, () => {
    const [rawOptions, rawValues] = g(['-TaB', '123', '--lamda', 'leet', 'Omega'])

    command.run(rawOptions, rawValues)
    expect(COMMAND_ACTION).toHaveBeenCalledWith({
      options: {
        alpha: true,
        beta: 123,
        gamma: 0,
        delta: null,
        zeta: 'An option custom filter.',
        kappa: null,
        theta: false,
        tau: true,
        lamda: 'leet',
      },
      values: {
        omega: 'Omega',
        epsilon: 'Who knows?',
        sigma: 'A value custom filter.',
      }
    })
  })
})
