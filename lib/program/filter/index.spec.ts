import is from '.'

describe(`is`, () => {
  describe(`#aMandatory`, () => {
    const filter = is.aMandatory

    it(`should return a class instance of IsType`, () => expect(filter.constructor.name).toBe('IsType'))

    describe(`#boolean`, () => {
      const filter = is.aMandatory.boolean

      it(`should return a class instance of IsBoolean`, () => expect(filter.constructor.name).toBe('IsBoolean'))

      describe(`#isBoolean()`, () => {
        it(`should be TRUE`, () => expect((filter as any).isBoolean()).toBe(true))
      })
    })

    describe(`#float`, () => {
      const filter = is.aMandatory.float

      it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

      describe(`#isBoolean()`, () => {
        it(`should be FALSE`, () => expect((filter as any).isBoolean()).toBe(false))
      })
    })

    describe(`#integer`, () => {
      const filter = is.aMandatory.integer

      it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
      it(`should invalidate a float string`, () => expect(() => filter.process('1.2')).toThrow())
      it(`should invalidate a letters string`, () => expect(() => filter.process('foo')).toThrow())
      it(`should return the expected result`, () => expect(filter.process('1')).toBe(1))

      describe(`#isBoolean()`, () => {
        it(`should be FALSE`, () => expect((filter as any).isBoolean()).toBe(false))
      })

      describe(`#between()`, () => {
        describe(`with -1, 1`, () => {
          const filter = is.aMandatory.integer.between(-1, 1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
          it(`should invalidate -2`, () => expect(() => filter.process(-2)).toThrow())
          it(`should invalidate -1`, () => expect(() => filter.process(-1)).toThrow())
          it(`should validate 0`, () => expect(() => filter.process(0)).not.toThrow())
          it(`should invalidate 1`, () => expect(() => filter.process(1)).toThrow())
          it(`should invalidate 2`, () => expect(() => filter.process(2)).toThrow())
        })

        describe(`with -1, 1, true`, () => {
          const filter = is.aMandatory.integer.between(-1, 1, true)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
          it(`should invalidate -2`, () => expect(() => filter.process(-2)).toThrow())
          it(`should validate -1`, () => expect(() => filter.process(-1)).not.toThrow())
          it(`should validate 0`, () => expect(() => filter.process(0)).not.toThrow())
          it(`should validate 1`, () => expect(() => filter.process(1)).not.toThrow())
          it(`should invalidate 2`, () => expect(() => filter.process(2)).toThrow())
        })
      })

      describe(`#greaterThan()`, () => {
        describe(`with -1`, () => {
          const filter = is.aMandatory.integer.greaterThan(-1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
          it(`should invalidate -2`, () => expect(() => filter.process(-2)).toThrow())
          it(`should invalidate -1`, () => expect(() => filter.process(-1)).toThrow())
          it(`should validate 0`, () => expect(() => filter.process(0)).not.toThrow())
        })

        describe(`with -1, true`, () => {
          const filter = is.aMandatory.integer.greaterThan(-1, true)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
          it(`should invalidate -2`, () => expect(() => filter.process(-2)).toThrow())
          it(`should validate -1`, () => expect(() => filter.process(-1)).not.toThrow())
          it(`should validate 0`, () => expect(() => filter.process(0)).not.toThrow())
        })
      })

      describe(`#lessThan()`, () => {
        describe(`with -1`, () => {
          const filter = is.aMandatory.integer.lessThan(-1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
          it(`should validate -2`, () => expect(() => filter.process(-2)).not.toThrow())
          it(`should invalidate -1`, () => expect(() => filter.process(-1)).toThrow())
          it(`should invalidate 0`, () => expect(() => filter.process(0)).toThrow())
        })

        describe(`with -1, true`, () => {
          const filter = is.aMandatory.integer.lessThan(-1, true);

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
          it(`should validate -2`, () => expect(() => filter.process(-2)).not.toThrow())
          it(`should validate -1`, () => expect(() => filter.process(-1)).not.toThrow())
          it(`should invalidate 0`, () => expect(() => filter.process(0)).toThrow())
        })
      })
    })

    describe(`#string`, () => {
      const filter = is.aMandatory.string

      it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))

      describe(`#isBoolean()`, () => {
        it(`should be FALSE`, () => expect((filter as any).isBoolean()).toBe(false))
      })

      describe(`#longerThan()`, () => {
        describe(`with 0`, () => {
          const filter = is.aMandatory.string.longerThan(0)

          it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))
          it(`should invalidate ""`, () => expect(() => filter.process("")).toThrow())
          it(`should validate "a"`, () => expect(() => filter.process("a")).not.toThrow())
        })

        describe(`with 0, true`, () => {
          const filter = is.aMandatory.string.longerThan(0, true)

          it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))
          it(`should validate ""`, () => expect(() => filter.process("")).not.toThrow())
          it(`should validate "a"`, () => expect(() => filter.process("a")).not.toThrow())
        })
      })

      describe(`#shorterThan()`, () => {
        describe(`with 2`, () => {
          const filter = is.aMandatory.string.shorterThan(2)

          it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))
          it(`should validate "a"`, () => expect(() => filter.process("a")).not.toThrow())
          it(`should invalidate "ab"`, () => expect(() => filter.process("ab")).toThrow())
        })

        describe(`with 2, true`, () => {
          const filter = is.aMandatory.string.shorterThan(2, true)

          it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))
          it(`should validate "a"`, () => expect(() => filter.process("a")).not.toThrow())
          it(`should validate "ab"`, () => expect(() => filter.process("ab")).not.toThrow())
        })
      })
    })

    describe(`#list()`, () => {
      const filter = is.aMandatory.list(['foo', 'bar'])

      it(`should return a class instance of IsList`, () => expect(filter.constructor.name).toBe('IsList'))
      it(`should invalidate "Foo"`, () => expect(() => filter.process("Foo")).toThrow())
      it(`should validate "foo"`, () => expect(() => filter.process("foo")).not.toThrow())

      describe(`#isBoolean()`, () => {
        it(`should be FALSE`, () => expect((filter as any).isBoolean()).toBe(false))
      })

      describe(`#else()`, () => {
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
