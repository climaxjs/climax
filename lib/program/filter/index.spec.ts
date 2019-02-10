import is from '.'

describe(`is`, () => {
  describe(`#aMandatory`, () => {
    const filter = is.aMandatory

    it(`should return a class instance of IsType`, () => expect(filter.constructor.name).toBe('IsType'))

    describe(`#boolean`, () => {
      const filter = is.aMandatory.boolean

      it(`should return a class instance of IsBoolean`, () => expect(filter.constructor.name).toBe('IsBoolean'))
    })

    describe(`#float`, () => {
      const filter = is.aMandatory.float

      it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
    })

    describe(`#integer`, () => {
      const filter = is.aMandatory.integer

      it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

      it(`should invalidate a float`, () => expect(() => filter.validate(1.2)).toThrow())
      it(`should validate an integer`, () => expect(() => filter.validate(1)).not.toThrow())

      describe(`#between()`, () => {
        describe(`with -1, 1`, () => {
          const filter = is.aMandatory.integer.between(-1, 1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should invalidate -2`, () => expect(() => filter.validate(-2)).toThrow())
          it(`should invalidate -1`, () => expect(() => filter.validate(-1)).toThrow())
          it(`should validate 0`, () => expect(() => filter.validate(0)).not.toThrow())
          it(`should invalidate 1`, () => expect(() => filter.validate(1)).toThrow())
          it(`should invalidate 2`, () => expect(() => filter.validate(2)).toThrow())
        })

        describe(`with -1, 1, true`, () => {
          const filter = is.aMandatory.integer.between(-1, 1, true)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should invalidate -2`, () => expect(() => filter.validate(-2)).toThrow())
          it(`should validate -1`, () => expect(() => filter.validate(-1)).not.toThrow())
          it(`should validate 0`, () => expect(() => filter.validate(0)).not.toThrow())
          it(`should validate 1`, () => expect(() => filter.validate(1)).not.toThrow())
          it(`should invalidate 2`, () => expect(() => filter.validate(2)).toThrow())
        })
      })

      describe(`#greaterThan()`, () => {
        describe(`with -1`, () => {
          const filter = is.aMandatory.integer.greaterThan(-1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should invalidate -2`, () => expect(() => filter.validate(-2)).toThrow())
          it(`should invalidate -1`, () => expect(() => filter.validate(-1)).toThrow())
          it(`should validate 0`, () => expect(() => filter.validate(0)).not.toThrow())
        })

        describe(`with -1, true`, () => {
          const filter = is.aMandatory.integer.greaterThan(-1, true)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should invalidate -2`, () => expect(() => filter.validate(-2)).toThrow())
          it(`should validate -1`, () => expect(() => filter.validate(-1)).not.toThrow())
          it(`should validate 0`, () => expect(() => filter.validate(0)).not.toThrow())
        })
      })

      describe(`#lessThan()`, () => {
        describe(`with -1`, () => {
          const filter = is.aMandatory.integer.lessThan(-1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should validate -2`, () => expect(() => filter.validate(-2)).not.toThrow())
          it(`should invalidate -1`, () => expect(() => filter.validate(-1)).toThrow())
          it(`should invalidate 0`, () => expect(() => filter.validate(0)).toThrow())
        })

        describe(`with -1, true`, () => {
          const filter = is.aMandatory.integer.lessThan(-1, true);

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should validate -2`, () => expect(() => filter.validate(-2)).not.toThrow())
          it(`should validate -1`, () => expect(() => filter.validate(-1)).not.toThrow())
          it(`should invalidate 0`, () => expect(() => filter.validate(0)).toThrow())
        })
      })
    })

    describe(`#string`, () => {
      const filter = is.aMandatory.string

      it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))

      describe(`#longerThan()`, () => {
        describe(`with 0`, () => {
          const filter = is.aMandatory.string.longerThan(0)

          it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))

          it(`should invalidate ""`, () => expect(() => filter.validate("")).toThrow())
          it(`should validate "a"`, () => expect(() => filter.validate("a")).not.toThrow())
        })

        describe(`with 0, true`, () => {
          const filter = is.aMandatory.string.longerThan(0, true)

          it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))

          it(`should validate ""`, () => expect(() => filter.validate("")).not.toThrow())
          it(`should validate "a"`, () => expect(() => filter.validate("a")).not.toThrow())
        })
      })

      describe(`#shorterThan()`, () => {
        describe(`with 2`, () => {
          const filter = is.aMandatory.string.shorterThan(2)

          it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))

          it(`should validate "a"`, () => expect(() => filter.validate("a")).not.toThrow())
          it(`should invalidate "ab"`, () => expect(() => filter.validate("ab")).toThrow())
        })

        describe(`with 2, true`, () => {
          const filter = is.aMandatory.string.shorterThan(2, true)

          it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))

          it(`should validate "a"`, () => expect(() => filter.validate("a")).not.toThrow())
          it(`should validate "ab"`, () => expect(() => filter.validate("ab")).not.toThrow())
        })
      })
    })

    describe(`#list()`, () => {
      describe(`with ['foo', 'bar']`, () => {
        const filter = is.aMandatory.list(['foo', 'bar'])

        it(`should return a class instance of IsList`, () => expect(filter.constructor.name).toBe('IsList'))

        it(`should invalidate "Foo"`, () => expect(() => filter.validate("Foo")).toThrow())
        it(`should validate "foo"`, () => expect(() => filter.validate("foo")).not.toThrow())
      })

      describe(`#process()`, () => {
        describe(`with is.aMandatory.list(['foo', 'bar']).else('bar')`, () => {
          const filter = is.aMandatory.list(['foo', 'bar']).else('bar')

          it(`should return a class instance of IsList`, () => expect(filter.constructor.name).toBe('IsList'))

          it(`should return "bar" when no value is provided`, () => expect(filter.process()).toBe('bar'))
        })
      })
    })
  })

  describe(`#anOptional`, () => {
    const filter = is.anOptional

    it(`should return a class instance of IsType`, () => expect(filter.constructor.name).toBe('IsType'))
  })
})
