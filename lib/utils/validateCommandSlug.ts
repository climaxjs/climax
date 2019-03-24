/**
 * Validate a command option slug declaration.
 *
 * @example
 * "-f, --foo"
 * "-F, --foo-bar"
 */

export default function validateCommandSlug(slug: string): boolean {
  return /^[a-zA-Z]+(([a-zA-Z]+-)*[a-zA-Z]+)?$/.test(slug)
}
