import * as R from 'ramda'

import Command from '../command'
import Option from '../option'
import errors from '../errors'
import validateSemVer from '../utils/validateSemVer'

import * as T from './types'
import * as CommandT from '../command/types'
import * as OptionT from '../option/types'

class Program implements T.Program {
  private _commands: T.ProgramCommands = {}
  private _description: string
  private _name: string
  private _options: OptionT.Option[] = []
  private _version: string

  /**
   * Get/Set the program description.
   *
   * @description
   * Unless explicitly set, the package.json description is the default value.
   */
  public description(description?: string): string | Program {
    if (typeof description === 'undefined') {
      switch (true) {
        case this._description === undefined:
          throw errors.error.ERR_COMMAND_DESCRIPTION_UNDEFINED
      }

      return this._description
    }

    switch (true) {
      case typeof description !== 'string':
        throw errors.error.ERR_COMMAND_DESCRIPTION_VALIDATION_TYPE

      case description.length === 0:
        throw errors.error.ERR_COMMAND_DESCRIPTION_VALIDATION_LENGTH
    }

    this._description = description

    return this
  }

  /**
   * Get/Set the program name.
   *
   * @description
   * Unless explicitly set, the package.json name is the default value.
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
   * Get/Set the program version.
   *
   * @description
   * Unless explicitly set, the package.json version is the default value.
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
   * Add a new program option.
   */
  public option(
    slug: string,
    description: string,
    filter?: OptionT.OptionFilter,
  ): Program {
    this._options.push(new Option(slug, description, filter))

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
    this.validateCommandsProps()
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
