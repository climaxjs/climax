/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import rorre from 'rorre'

export default rorre.declare({
  ERR_PROGRAM_NAME_VALIDATION_LENGTH:     `The program name can't be empty.`,
  ERR_PROGRAM_NAME_VALIDATION_TYPE:       `The program name must be a string.`,
  ERR_PROGRAM_VERSION_UNDEFINED:          `The version has never been set yet. ` +
                                          `You must set the program version in order to get this property value.`,
  ERR_PROGRAM_VERSION_VALIDATION_V:       `The version you set must not start by a "v". ` +
                                          `If you want to declare "vX.Y.Z", just declare "X.Y.Z".`,
  ERR_PROGRAM_VERSION_VALIDATION_SEMVER:  `The version you set doesn't look like a valid SemVer string. ` +
                                          `Please check https://semver.org for more information.`,
  ERR_PROGRAM_VERSION_VALIDATION_TYPE:    `The program version must be a string.`,
})
