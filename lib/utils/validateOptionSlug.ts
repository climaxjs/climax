/**
 * Validate a command option slug declaration.
 *
 * @example
 * "-f, --foo"
 * "-F, --foo-bar"
 */

export default function validateOptionSlug(slug: string): boolean {
  return /^(-[a-zA-Z]\s)?--([a-z]((-[a-z]+)+)|[a-z]{2,}((-[a-z]+)+)?)(=[\a-zA-Z]+)?$/.test(slug)
}
