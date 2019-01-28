import * as R from 'ramda'

import Command from '../command'
import errors from '../errors'
import validateSemVer from '../utils/validateSemVer'

import * as T from './types'
import * as CommandT from '../command/types'

class Program extends Command implements T.Program {
  private _commands: T.ProgramCommands = {}
  private _name: string
  private _version: string

/**
 * Customize the program name, replacing the package.json name.
 */
  public name(name?: string): string | Program {
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
   * Customize the program version, replacing the package.json description.
   */
  public version(version?: string): string | Program {
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

      case !validateSemVer(version):
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
  public run(): void {
    this.validateCommands()
  }

  /**
   * Validate program and commands required properties.
   */
  private validateCommands(): void {
    this.description()
    this.name()

    for (const command in this._commands) {
      this._commands[command].description()
    }
  }
}

const program = new Program()
export default program
