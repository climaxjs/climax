import log from '@inspired-beings/log'
import * as R from 'ramda'

import errors from '../errors'
import * as utils from '../utils'
import Command from './command'

import * as T from './types'
import * as CommandT from './command/types'
const { error: E } = errors

class Program extends Command implements T.Program {
  private _commands: T.ProgramCommands = {}
  private _name: string
  private _version: string

  constructor() {
    // Since Program is also a Command, we arbitrary assign an underscore as its
    // command slug in order to better customize error messages.
    super('_')
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
        throw E.ERR_PRG_VERS_V_V

      case !utils.validateSemVer(version):
        throw E.ERR_PRG_VERS_V_SEMVER
    }

    this._version = version

    return this
  }

  /**
   * Add a new command.
   */
  public command(slug: string): CommandT.Command {
    switch (true) {
      case typeof slug !== 'string':
        throw E.ERR_PRG_VERS_V_TYP

      case slug.length === 0:
        throw E.ERR_PRG_VERS_V_V
    }

    this._commands = R.assoc(slug, new Command(slug), this._commands)

    return R.prop(slug, this._commands)
  }

  /**
   * Validate this program mandatory properties.
   */
  public validate(): void {
    super.validate()

    switch (true) {
      case this._name === undefined:
        utils.throwWith(E.ERR_PRG_NAME_V_UND, `[Program] `)

      case this._version === undefined:
        utils.throwWith(E.ERR_PRG_VERS_V_UND, `[Program] `)
    }
  }

  /**
   * Initiate the program once all the commands and options has been set.
   */
  public init(): void {
    this.validate()
    this.validateCommands()

    // Check for any inconsistent structure for the process arguments
    switch (true) {
      case !Array.isArray(process.argv):
        throw E.ERR_PRG_ARGS_V_TYP

      case process.argv.length < 2:
        throw E.ERR_PRG_ARGS_V_LEN
    }

    const args = process.argv.length > 2
      ? process.argv.slice(2, process.argv.length)
      : []

    // Solve the raw arguments (raw = not typed yet)
    const [command, options, values] = utils.parseArgs(args)

    switch (true) {
      case command !== null && !R.has(command, this._commands):
        log.err(`The command %s doesn't exists.`, command as string)
        process.exit()
    }

    // Calls
    (command === null ? this : this._commands[command]).run(values, options)
  }

  /**
   * Validate the commands required properties.
   */
  private validateCommands(): void {
    for (const command in this._commands) {
      this._commands[command].validate()
    }
  }
}

const program = new Program()
export default program
