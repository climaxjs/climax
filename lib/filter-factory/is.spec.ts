import is from './is'

describe(`filter-factory/is`, () => {
  describe(`#aMandatory`, () => {
    const filter = is.aMandatory

    it(`should return a class instance of IsType`, () => expect(filter.constructor.name).toBe('IsType'))
    it(`should be mandatory`, () => expect(filter.isMandatory).toBe(true))

    describe(`#boolean`, () => {
      const filter = is.aMandatory.boolean

      it(`should return a class instance of IsType`, () => expect(filter.constructor.name).toBe('IsBoolean'))
      it(`should be of type boolean`, () => expect(filter.type).toBe(1))
    })

    describe(`#float`, () => {
      const filter = is.aMandatory.float

      it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
      it(`should be of type number`, () => expect(filter.type).toBe(2))
    })

    describe(`#integer`, () => {
      const filter = is.aMandatory.integer

      it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))
      it(`should be of type number`, () => expect(filter.type).toBe(2))

      it(`should invalidate a float`, () => expect(filter.validate(1.2)).toBe(false))
      it(`should validate an integer`, () => expect(filter.validate(1)).toBe(true))

      describe(`#between()`, () => {
        describe(`with -1, 1`, () => {
          const filter = is.aMandatory.integer.between(-1, 1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should invalidate -2`, () => expect(filter.validate(-2)).toBe(false))
          it(`should invalidate -1`, () => expect(filter.validate(-1)).toBe(false))
          it(`should validate 0`, () => expect(filter.validate(0)).toBe(true))
          it(`should invalidate 1`, () => expect(filter.validate(1)).toBe(false))
          it(`should invalidate 2`, () => expect(filter.validate(2)).toBe(false))
        })

        describe(`with -1, 1, true`, () => {
          const filter = is.aMandatory.integer.between(-1, 1, true)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should invalidate -2`, () => expect(filter.validate(-2)).toBe(false))
          it(`should validate -1`, () => expect(filter.validate(-1)).toBe(true))
          it(`should validate 0`, () => expect(filter.validate(0)).toBe(true))
          it(`should validate 1`, () => expect(filter.validate(1)).toBe(true))
          it(`should invalidate 2`, () => expect(filter.validate(2)).toBe(false))
        })
      })

      describe(`#greaterThan()`, () => {
        describe(`with -1`, () => {
          const filter = is.aMandatory.integer.greaterThan(-1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should invalidate -2`, () => expect(filter.validate(-2)).toBe(false))
          it(`should invalidate -1`, () => expect(filter.validate(-1)).toBe(false))
          it(`should validate 0`, () => expect(filter.validate(0)).toBe(true))
        })

        describe(`with -1, true`, () => {
          const filter = is.aMandatory.integer.greaterThan(-1, true)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should invalidate -2`, () => expect(filter.validate(-2)).toBe(false))
          it(`should validate -1`, () => expect(filter.validate(-1)).toBe(true))
          it(`should validate 0`, () => expect(filter.validate(0)).toBe(true))
        })
      })

      describe(`#lessThan()`, () => {
        describe(`with -1`, () => {
          const filter = is.aMandatory.integer.lessThan(-1)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should validate -2`, () => expect(filter.validate(-2)).toBe(true))
          it(`should invalidate -1`, () => expect(filter.validate(-1)).toBe(false))
          it(`should invalidate 0`, () => expect(filter.validate(0)).toBe(false))
        })

        describe(`with -1, true`, () => {
          const filter = is.aMandatory.integer.lessThan(-1, true)

          it(`should return a class instance of IsNumber`, () => expect(filter.constructor.name).toBe('IsNumber'))

          it(`should validate -2`, () => expect(filter.validate(-2)).toBe(true))
          it(`should validate -1`, () => expect(filter.validate(-1)).toBe(true))
          it(`should invalidate 0`, () => expect(filter.validate(0)).toBe(false))
        })
      })
    })

    describe(`#string`, () => {
      const filter = is.aMandatory.string

      it(`should return a class instance of IsString`, () => expect(filter.constructor.name).toBe('IsString'))
      it(`should be of type string`, () => expect(filter.type).toBe(3))
    })
  })

  describe(`#anOptional`, () => {
    const filter = is.anOptional

    it(`should return a class instance of IsType`, () => expect(filter.constructor.name).toBe('IsType'))
    it(`should be optional`, () => expect(filter.isMandatory).toBe(false))
  })
})
