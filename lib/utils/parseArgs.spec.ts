import parseArgs from './parseArgs'

const MATCHES = [
  [ [],       [],                                             [null, {}, []]],
  [ [],       ['--bar'],                                      [null, { bar: true }, []]],
  [ [],       ['--bar=barValue'],                             [null, { bar: 'barValue' }, []]],
  [ [],       ['--bar=barValue', '--bar2'],                   [null, { bar: 'barValue', bar2: true }, []]],
  [ [],       ['--bar=barValue', '--bar2=bar2Value'],         [null, { bar: 'barValue', bar2: 'bar2Value' }, []]],
  [ [],       ['--bar', '--bar2'],                            [null, { bar: true, bar2: true }, []]],
  [ [],       ['--bar', '--bar2=bar2Value'],                  [null, { bar: true, bar2: 'bar2Value' }, []]],
  [ [],       ['--bar', 'barValue'],                          [null, { bar: 'barValue' }, []]],
  [ [],       ['--bar', 'barValue', '--bar2'],                [null, { bar: 'barValue', bar2: true }, []]],
  [ [],       ['--bar', 'barValue', '--bar2', 'bar2Value'],   [null, { bar: 'barValue', bar2: 'bar2Value' }, []]],
  [ [],       ['--bar', '--bar2'],                            [null, { bar: true, bar2: true }, []]],
  [ [],       ['--bar', '--bar2', 'bar2Value'],               [null, { bar: true, bar2: 'bar2Value' }, []]],

  [ [],       ['foo'],                                        [null, {}, ['foo']]],
  [ [],       ['foo', '--bar'],                               [null, { bar: true }, ['foo']]],
  [ [],       ['foo', '--bar=barValue'],                      [null, { bar: 'barValue' }, ['foo']]],
  [ [],       ['foo', '--bar=barValue', '--bar2'],            [null, { bar: 'barValue', bar2: true }, ['foo']]],
  [ [],       ['foo', '--bar=barValue', '--bar2=bar2Value'],  [null, { bar: 'barValue', bar2: 'bar2Value' }, ['foo']]],
  [ [],       ['foo', '--bar', '--bar2'],                     [null, { bar: true, bar2: true }, ['foo']]],
  [ [],       ['foo', '--bar', '--bar2=bar2Value'],           [null, { bar: true, bar2: 'bar2Value' }, ['foo']]],

  [ ['foo'],  ['foo', 'val'],                                 ['foo', {}, ['val']]],
  [ ['foo'],  ['foo', 'val', 'val2'],                         ['foo', {}, ['val', 'val2']]],
  // Misleading case: is "val" the value of --bar option or is --bar a boolean option followed by a lone "val" value?
  [ ['foo'],  ['foo', '--bar', 'val'],                        ['foo', { bar: 'val' }, []]],
  [ ['foo'],  ['foo', '--bar=barValue', 'val'],               ['foo', { bar: 'barValue' }, ['val']]],
  [ ['foo'],  ['foo', 'val', '--bar'],                        ['foo', { bar: true }, ['val']]],
  [ ['foo'],  ['foo', 'val', '--bar=barValue'],               ['foo', { bar: 'barValue' }, ['val']]],
]

MATCHES.map(match =>
  test(`should return the expected result`, () =>
    expect(parseArgs(match[0] as string[], match[1] as string[])).toEqual(match[2])))
