/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import rorre from 'rorre'

export default rorre.declare({
  ERR_PROGRAM_DESCRIPTION_UNDEFINED: `The program description has not been set.`,
  ERR_PROGRAM_DESCRIPTION_VALIDATION_LENGTH: `The program description can't be empty.`,
  ERR_PROGRAM_DESCRIPTION_VALIDATION_TYPE: `The program description can't be empty.`,
  ERR_PROGRAM_NAME_UNDEFINED: `The name has not been set.`,
  ERR_PROGRAM_NAME_VALIDATION_LENGTH: `The program name can't be empty.`,
  ERR_PROGRAM_NAME_VALIDATION_TYPE: `The program name must be a string.`,
  ERR_PROGRAM_VERSION_UNDEFINED: `The version has not been set.`,
  ERR_PROGRAM_VERSION_VALIDATION_V: `The version you set can't start with a "v" or a "V". If you want to declare "vX.Y.Z", just declare "X.Y.Z".`,
  ERR_PROGRAM_VERSION_VALIDATION_SEMVER: `The program version is not a valid SemVer string. Please check https://semver.org for more info`,
  ERR_PROGRAM_VERSION_VALIDATION_TYPE: `The program version must be a string.`,
})
