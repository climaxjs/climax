/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

<<<<<<< HEAD
=======
import errors from '../errors'
>>>>>>> lib/program/Program: create
import validateSemVer from '../utils/validateSemVer'

class Program {
  prop: number

  set version(version: string) {
    switch (true) {
      case version.length !== 0 && version[0].toLocaleLowerCase() === 'v':
      throw errors.error.ERR_PROGRAM_VERSION_VALIDATION_V()

      case !validateSemVer(version):
      throw errors.error.ERR_PROGRAM_VERSION_VALIDATION_SEMVER()
    }
  }
}

export default new Program()
