import Option from '.'
import errors from '../../errors'

describe(`Option`, () => {
  describe(`#constructor()`, () => {
    it(`should fail with a malformed <slug>`, () =>
      expect(() => new Option('foo', 'bar'))
        .toThrow(errors.dictionary.ERR_OPT_SLUG_V_FMT.replace(/%s/, 'foo')))

    it(`should return the expected instance with a slugs pair`, () =>
      expect({ ...new Option('-f, --foo', 'bar') })
        .toMatchObject({ slug: 'foo', slugLetter: 'f', description: 'bar', filter: undefined }))

    it(`should return the expected instance with a lone slug`, () =>
      expect({ ...new Option('--foo', 'bar') })
        .toMatchObject({ slug: 'foo', slugLetter: null, description: 'bar', filter: undefined }))

    it(`should return the expected instance with a camel slug`, () =>
      expect({ ...new Option('--foo-bar', 'lambda') })
        .toMatchObject({ slug: 'fooBar', slugLetter: null, description: 'lambda', filter: undefined }))
  })
})
