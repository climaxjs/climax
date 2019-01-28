import parseArgs from './parseArgs'

const MATCHES = [
  [ [],                                             [null, {}, []]],
  [ ['--bar'],                                      [null, { bar: true }, []]],
  [ ['--bar=barValue'],                             [null, { bar: 'barValue' }, []]],
  [ ['--bar=barValue', '--bar2'],                   [null, { bar: 'barValue', bar2: true }, []]],
  [ ['--bar=barValue', '--bar2=bar2Value'],         [null, { bar: 'barValue', bar2: 'bar2Value' }, []]],
  [ ['--bar', '--bar2'],                            [null, { bar: true, bar2: true }, []]],
  [ ['--bar', '--bar2=bar2Value'],                  [null, { bar: true, bar2: 'bar2Value' }, []]],

  [ ['foo'],                                        ['foo', {}, []]],
  [ ['foo', '--bar'],                               ['foo', { bar: true }, []]],
  [ ['foo', '--bar=barValue'],                      ['foo', { bar: 'barValue' }, []]],
  [ ['foo', '--bar=barValue', '--bar2'],            ['foo', { bar: 'barValue', bar2: true }, []]],
  [ ['foo', '--bar=barValue', '--bar2=bar2Value'],  ['foo', { bar: 'barValue', bar2: 'bar2Value' }, []]],
  [ ['foo', '--bar', '--bar2'],                     ['foo', { bar: true, bar2: true }, []]],
  [ ['foo', '--bar', '--bar2=bar2Value'],           ['foo', { bar: true, bar2: 'bar2Value' }, []]],

  [ ['foo', 'val'],                                 ['foo', {}, ['val']]],
  [ ['foo', 'val', 'val2'],                         ['foo', {}, ['val', 'val2']]],
  [['foo', '--bar', 'val'],                         ['foo', { bar: true }, ['val']]],
  [['foo', '--bar=barValue', 'val'],                ['foo', { bar: 'barValue' }, ['val']]],
  [['foo', 'val', '--bar'],                         ['foo', { bar: true }, ['val']]],
  [['foo', 'val', '--bar=barValue'],                ['foo', { bar: 'barValue' }, ['val']]],
]

MATCHES.map(match => test(`should return the expected result`, () => expect(parseArgs(match[0] as any)).toEqual(match[1])))
