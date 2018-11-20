/**
 * Validate a version against Semantic Versioning 2.0.0 RFC.
 *
 * @description
 * We allow some particular cases:
 * - forbid starting "v"
 * - forbid uppercase letters
 *
 * @see https://semver.org
 */

export default function validateSemVer(version: string): boolean {
  // Not used as a dependency because of our above distinctive characteristics:
  // https://github.com/sindresorhus/semver-regex
  // tslint:disable-next-line:max-line-length
  return /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?$/
    .test(version)
}
