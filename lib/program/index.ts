// import log from '@inspired-beings/log'
import * as R from 'ramda'

import errors from '../errors'
import { parseArgs, throwWith, validateSemVer } from '../utils'
import Command from './command'

import * as T from './types'
import * as CommandT from './command/types'
import { ParsedArgs } from '../utils/parseArgs'
const { error: E } = errors

class Program extends Command implements T.Program {
  private _commands: T.ProgramCommands = {}
  private _name: string
  private _version: string

  constructor() {
    super('', true)
  }

  /**
   * Parse the content of the `package.json` file to extract the program's:
   * - name,
   * - description,
   * - version,
   * - binary name (deduced through the "bin" object first key).
   *
   * TODO Handle the binary name.
   */
  public info(npmInfo: T.NpmInfo): this {
    switch(true) {
      case !R.is(Object, npmInfo) || npmInfo.constructor.name !== "Object":
        throw E.ERR_PRG_INFO_V_TYP
    }

    this.name(npmInfo.name)
    this.description(npmInfo.description)
    this.version(npmInfo.version)


    return this
  }

  /**
   * Set the program name.
   */
  public name(name: string): this {
    switch (true) {
      case typeof name !== 'string':
        throw E.ERR_PRG_NAME_V_TYP

      case name.length === 0:
        throw E.ERR_PRG_NAME_V_LEN
    }

    this._name = name

    return this
  }

  /**
   * Set the program version.
   */
  public version(version: string): this {
    switch (true) {
      case typeof version !== 'string':
        throw E.ERR_PRG_VERS_V_TYP

      case version.length !== 0 && version[0].toLocaleLowerCase() === 'v':
        throw E.ERR_PRG_VERS_V_NOV

      case !validateSemVer(version):
        throw E.ERR_PRG_VERS_V_SEM
    }

    this._version = version

    return this
  }

  /**
   * Add a new command.
   */
  public command(slug: string): CommandT.Command {
    switch (true) {
      // Prevent the use of Program reseved underscore character:
      case slug === '_':
        throw E.ERR_CMD_SLUG_V_FMT

      case R.hasPath([String(slug)], this._commands):
        throwWith(E.ERR_CMD_SLUG_V_CFT, `[Command: "${slug}"] `)
    }

    try {
      this._commands = R.assoc(slug, new Command(slug), this._commands)
    } catch (error) {
      throw error
    }

    return R.prop(slug, this._commands)
  }

  /**
   * Validate this program mandatory properties.
   */
  public validate(): void {
    switch (true) {
      case this._name === undefined:
        throw E.ERR_PRG_NAME_V_UND

      case this._version === undefined:
        throw E.ERR_PRG_VERS_V_UND
    }

    super.validate()
  }

  /**
   * Initiate the program once all the commands, options and values has been
   * set.
   */
  public init(): void {
    this.validate()
    this.validateCommands()

    const [command, options, values] = this.parseArgs();

    if (command === null) {
      if (this._action === undefined) {
        // TODO Show help

        return
      }

      // Run the program action
      this.run(options, values)

      return
    }

    // Run the command action
    this._commands[command].run(options, values)
  }

  /**
   * Validate the commands required properties.
   */
  private validateCommands(): void {
    for (const command in this._commands) {
      this._commands[command].validate()
    }
  }

  /**
   * Parse the CLI arguments and attempt to extract the potential command.
   *
   * @description
   * This parsing operation only splits the command, options and values. It
   * doesn't match them with options, values and their related filters.
   */
  private parseArgs(): ParsedArgs {
    if (process.argv.length === 2) return [null, {}, []]

    const commands = R.keys(this._commands) as string[]
    const rawArgs = R.slice(2, Infinity, process.argv)

    return parseArgs(commands, rawArgs)
  }
}

const program = new Program()
export default program
