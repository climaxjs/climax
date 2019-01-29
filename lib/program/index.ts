import log from '@inspired-beings/log'
import * as R from 'ramda'

import Command from '../command'
import errors from '../errors'
import * as utils from '../utils'

import * as T from './types'
import * as CommandT from '../command/types'

class Program extends Command implements T.Program {
  private _commands: T.ProgramCommands = {}
  private _name: string
  private _version: string

  /**
   * Get/Set the program name.
   *
   * @description
   * Unless explicitly set, the package.json name is the default value.
   */
  public name(name?: string): string | this {
    if (typeof name === 'undefined') {
      switch (true) {
        case this._name === undefined:
          throw errors.error.ERR_PROGRAM_NAME_UNDEFINED
      }

      return this._name
    }

    switch (true) {
      case typeof name !== 'string':
        throw errors.error.ERR_PROGRAM_NAME_VALIDATION_TYPE

      case name.length === 0:
        throw errors.error.ERR_PROGRAM_NAME_VALIDATION_LENGTH
    }

    this._name = name

    return this
  }

  /**
   * Get/Set the program version.
   *
   * @description
   * Unless explicitly set, the package.json version is the default value.
   */
  public version(version?: string): string | this {
    if (typeof version === 'undefined') {
      switch (true) {
        case this._version === undefined:
          throw errors.error.ERR_PROGRAM_VERSION_UNDEFINED
      }

      return this._version
    }

    switch (true) {
      case typeof version !== 'string':
        throw errors.error.ERR_PROGRAM_VERSION_VALIDATION_TYPE

      case version.length !== 0 && version[0].toLocaleLowerCase() === 'v':
        throw errors.error.ERR_PROGRAM_VERSION_VALIDATION_V

      case !utils.validateSemVer(version):
        throw errors.error.ERR_PROGRAM_VERSION_VALIDATION_SEMVER
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
        throw errors.error.ERR_PROGRAM_VERSION_VALIDATION_TYPE

      case slug.length === 0:
        throw errors.error.ERR_PROGRAM_VERSION_VALIDATION_V
    }

    this._commands = R.assoc(slug, new Command(), this._commands)

    return R.prop(slug, this._commands)
  }

  /**
   * Initiate the program once all the commands and options has been set.
   */
  public init(): void {
    this.validateCommandsProps()

    // Check for any inconsistent structure for the process arguments
    switch (true) {
      case !Array.isArray(process.argv):
        throw errors.error.ERR_PROGRAM_ARGS_VALIDATION_TYPE

      case process.argv.length < 2:
        throw errors.error.ERR_PROGRAM_ARGS_VALIDATION_LENGTH
    }

    const args = process.argv.length > 2
      ? process.argv.slice(2, process.argv.length)
      : []

    // Solve the raw arguments (raw = not typed yet)
    const [command/*, _options, _values*/] = utils.parseArgs(args)

    switch (true) {
      case command !== null && !R.has(command, this._commands):
        log.err(`The command %s doesn't exists.`, command as string)
        process.exit()
    }

    // Calls
    (command === null ? this : this._commands[command]).run()
  }

  /**
   * Validate the commands required properties.
   */
  private validateCommandsProps(): void {
    for (const command in this._commands) {
      this._commands[command].description()
    }
  }
}

const program = new Program()
export default program
