import parseArgs from './parseArgs'

const MATCHES = [
  [[], [null, {}]],
  [['--bar'], [null, { bar: null }]],
  [['--bar', 'barValue'], [null, { bar: 'barValue' }]],
  [['--bar', 'barValue', '--bar2'], [null, { bar: 'barValue', bar2: null }]],
  [['--bar', 'barValue', '--bar2', 'bar2Value'], [null, { bar: 'barValue', bar2: 'bar2Value' }]],
  [['--bar', 'barValue', 'barOtherValue'], [null, { bar: 'barOtherValue' }]],
  [['foo'], ['foo', {}]],
  [['foo', '--bar'], ['foo', { bar: null }]],
  [['foo', '--bar', 'barValue'], ['foo', { bar: 'barValue' }]],
  [['foo', '--bar', 'barValue', '--bar2'], ['foo', { bar: 'barValue', bar2: null }]],
  [['foo', '--bar', 'barValue', '--bar2', 'bar2Value'], ['foo', { bar: 'barValue', bar2: 'bar2Value' }]],
  [['foo', '--bar', 'barValue', 'barOtherValue'], ['foo', { bar: 'barOtherValue' }]],
]

MATCHES.map(match => test(`should return the expected result`, () => expect(parseArgs(match[0] as any)).toEqual(match[1])))
