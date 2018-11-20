import validateSemVer from './validateSemVer'

test('0 is invalid', () => expect(validateSemVer('0')).toBe(false))
test('0.0 is invalid', () => expect(validateSemVer('0.0')).toBe(false))
test('0.0.0 is valid', () => expect(validateSemVer('0.0.0')).toBe(true))
test('1 is invalid', () => expect(validateSemVer('1')).toBe(false))
test('1.2 is invalid', () => expect(validateSemVer('1.2')).toBe(false))
test('1.2.3 is valid', () => expect(validateSemVer('1.2.3')).toBe(true))
