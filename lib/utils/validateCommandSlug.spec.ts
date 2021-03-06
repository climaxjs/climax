import validateCommandSlug from './validateCommandSlug'

const INVALID_SLUGS = [
  '',
  '-',
  '-foo',
  'foo-',
  '-foo-',
  '-foo-bar',
  'foo-bar-',
  '-foo-bar-',
  '-foo-bar-',
  '-foo-bar-gam',
  'foo-bar-gam-',
  '-a',
  'a-',
  '-a-',
  '-a-b',
  'a-b-',
  '-a-b-',
  '-a-b-c',
  'a-b-c-',
  '-a-b-c-',
]
const VALID_SLUGS = [
  'foo',
  'fooBar',
  'foo-bar',
  'fooBarGam',
  'foo-bar-gam',
  'a',
  'a-b',
  'a-b-c',
]

INVALID_SLUGS.map(slug => test(`"${slug}" is invalid`, () => expect(validateCommandSlug(slug)).toBe(false)))
VALID_SLUGS.map(slug => test(`"${slug}" is valid`, () => expect(validateCommandSlug(slug)).toBe(true)))
