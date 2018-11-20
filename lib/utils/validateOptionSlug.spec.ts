import validateOptionSlug from './validateOptionSlug'

const INVALID_SLUGS = [
  '',
  '-',
  '--',
  ' -f',
  '-f',
  '-f --foo-',
  '-fo --foo',
  '-f --foo1',
  '-f--foo-bar',
  '-f --foo--bar',
  '-f  --foo-bar',
  '-f --foo-bar-',
  '-f --foo-bar-lambda-',
  ' --foo',
  '--foo=',
]
const VALID_SLUGS = [
  '--foo',
  '--foo=bar',
  '-f --foo',
  '-F --foo-bar',
  '-f --foo-bar-lambda',
  '-f --f-b',
  '-f --f-b-l',
  '-f --foo=bar',
]

INVALID_SLUGS.map(slug => test(`"${slug}" is invalid`, () => expect(validateOptionSlug(slug)).toBe(false)))
VALID_SLUGS.map(slug => test(`"${slug}" is valid`, () => expect(validateOptionSlug(slug)).toBe(true)))
