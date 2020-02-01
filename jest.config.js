// https://basarat.gitbooks.io/typescript/docs/testing/jest.html

module.exports = {
  bail: true,
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  preset: 'ts-jest',
  roots: ['<rootDir>/lib'],
  testRegex: `(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$`,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
}
