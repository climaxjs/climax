// tslint:disable-next-line:import-name
import Command from '../command'
import errors from '../errors'
import validateSemVer from '../utils/validateSemVer'

class Program extends Command {
  private _name: string
  private _version: string

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
}

const program = new Program()
export default program
