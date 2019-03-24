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
    // Since Program is also a Command, we arbitrary assign an underscore as its command slug in
    // order to better customize error messages.
    super('_')
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
    this.name(npmInfo.name)
    this.description(npmInfo.description)
    this.version(npmInfo.version)

    return this
  }

  /**
   * Set the program name.
   *
   * @description
   * Unless explicitly set, the package.json name is the default value.
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
   *
   * @description
   * Unless explicitly set, the package.json version will be the default value.
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
    super.validate()

    switch (true) {
      case this._name === undefined:
        throwWith(E.ERR_PRG_NAME_V_UND, `[Program] `)

      case this._version === undefined:
        throwWith(E.ERR_PRG_VERS_V_UND, `[Program] `)
    }
  }

  /**
   * Initiate the program once all the commands, options and values has been set.
   */
  public init(): void {
    this.validate()
    this.validateCommands()

    const [command, options, values] = this.parseArgs();

    // Run the command
    (command === null ? this : this._commands[command]).run(options, values)
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
   * This parsing operation only splits the command, options and values. It doesn't match them with
   * options, values and their related filters.
   */
  private parseArgs(): ParsedArgs {
    // Check for any inconsistent structure in the process arguments
    switch (true) {
      case !Array.isArray(process.argv):
        throw E.ERR_PRG_ARGS_V_TYP

      case process.argv.length < 2:
        throw E.ERR_PRG_ARGS_V_LEN
    }

    if (process.argv.length === 2) return [null, {}, []]

    const commands = R.keys(this._commands) as string[]
    const rawArgs = R.slice(2, Infinity, process.argv)

    return parseArgs(commands, rawArgs)
  }
}

const program = new Program()
export default program
