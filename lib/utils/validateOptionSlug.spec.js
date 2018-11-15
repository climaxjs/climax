import validateOptionSlug from './validateOptionSlug'

const INVALID_SLUGS = [
  '-f',
  '--foo',
  '-f --foo-',
  '-fo --foo',
  '-f --foo1',
  '-f--foo-bar',
  '-f --foo--bar',
  '-f  --foo-bar',
  '-f --foo-bar-',
  '-f --foo-bar-lambda-',
]
const VALID_SLUGS = [
  '-f --foo',
  '-F --foo-bar',
  '-f --foo-bar-lambda',
  '-f --f-b',
  '-f --f-b-l',
]

INVALID_SLUGS.map(slug => test(`"${slug}" is invalid`, () => expect(validateOptionSlug(slug)).toBe(false)))
VALID_SLUGS.map(slug => test(`"${slug}" is valid`, () => expect(validateOptionSlug(slug)).toBe(true)))
