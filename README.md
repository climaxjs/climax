# [Climax][link-website] &middot; [![License][img-license]][link-license] <!-- [![npm version][img-npm]][link-npm] --> [![Build Status][img-travis]][link-travis] [![Coverage Status][img-coveralls]][link-coveralls] [![JavaScript Style Guide][img-styleguide]][link-styleguide]

You can think Climax as the "Electron for CLI applications". But in fact it does
even a bit more than that:

- **CLI-based Development**<br>
  We provide a CLI to help you generate (almost) everything. Fun fact: the
  Climax CLI utilizes Climax. We do eat our own :hamburger:.<br>
- **Cross-Platform Build & Release**<br>
  Generate and release cross-platform signed binaries in a matter of minutes
  with just a little bit of config, whether it inludes a npm package or not.<br>
- **Auto-Update Feature**<br>
  Adding auto-update capabilities to your CLI clients has never been that easy:
  it is already implemented to work with your CI. And it's obviously fully
  secured.<br>
- **Conventions**<br>
  We provide a set of conventions regarding your CLI architecture in order to
  remove the pain of looking around for some.

## Features

- [Commander](https://github.com/commander-rb/commander)-like declaration
- Options and value filters
- Single and list prompts
- Loading bars and spinners
- Auto-update
- Binaries generation

## Getting started

> ### :warning: Attention
> **As long as the first beta phase won't be reached, the releases may be proven
highly unstable and may include multiple breaking changes.**

> ### :zap: Info
> This entire process will be automatically generated via [Climax CLI][link-cli]
as soon as its first alpha version will be released.

### Installation

```bash
npm i climaxjs/climax#v1.0.0-alpha.0
```

### Hello World

First, let's declare the binary path:

_package.json_

```js
{
  // ...

  "bin": {
    "say": "./bin/say.js"
  },

  // ...
}
```

Then let's write our first piece of code:

_bin/say.js_

```js
#!/usr/bin/env node

program
  .value('message', 'What do you want to say?', is.aMandatory.string.longerThan(0))
  .option('-t, --twice', 'Say it twice.', is.anOptional.boolean.greaterThan(0))
  .action((values, options) => {
    for (let i = 0; i <= Number(options); i++) {
      process.stdout.write(values.message)
    }
  })

program.command('hello')
  .description('Generate a new Climax project.')
  .value('name', 'Whom do you want to say hello to?', is.aMandatory.string.longerThan(0))
  .option('-l, --language', 'In which language?', is.aMandatory.list(['en', 'fr']).else('en'))
  .action((values, options) => {
    const greeting = options.language === 'en'
      ? `Hello ${values.name}!`
      : `Bonjour ${values.name}!`

    process.stdout.write(greeting)
  })

program.init({
  hasAutoUpdate: true,
})
```

Finally we can link our local "binary" file (not compiled yet since they are
interprated by NodeJS thanks to the Sha-Bang):

```bash
npm link
```

### Let's test it

_In progress..._

## Current Work Progress

- [x] Initial Climax project config
- [x] Initial Climax project CI
- [x] Basic Program bootstrap with commands, options and values
- [ ] Basic options and values filters
- [ ] 1st alpha release
- [ ] [CLI][link-cli]: Basic scaffold generation
- [ ] [CLI][link-cli]: 1st alpha release
- [ ] Cross-platform binaries
- [ ] Auto-update via (Travis + Github)
- [ ] 2nd alpha release
- [ ] [CLI][link-cli]: Binaries scripts generation (Travis + Github)
- [ ] [CLI][link-cli]: Auto-update config generation (Travis + Github)
- [ ] [CLI][link-cli]: 2nd alpha release
- [ ] Single prompt
- [ ] List prompt
- [ ] 4th alpha release

## Documentation

_In progress..._

## Contributing

_In progress..._

### License

Climax is [MIT licensed](./LICENSE).

[img-coveralls]: https://img.shields.io/coveralls/github/climaxjs/climax.svg?style=flat-square
[img-license]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[img-npm]: https://img.shields.io/npm/v/climax.svg?style=flat-square
[img-styleguide]: https://img.shields.io/badge/code_style-airbnb-brightgreen.svg?style=flat-square
[img-travis]: https://img.shields.io/travis/climaxjs/climax.svg?style=flat-square
[link-cli]: https://github.com/climaxjs/climax-cli
[link-coveralls]: https://coveralls.io/github/climaxjs/climax
[link-license]: https://github.com/climaxjs/climax/blob/master/LICENSE
[link-npm]: https://www.npmjs.com/package/climax
[link-styleguide]: https://github.com/airbnb/javascript#airbnb-javascript-style-guide-
[link-travis]: https://travis-ci.org/climaxjs/climax
[link-website]: https://climaxjs.com
