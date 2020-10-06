# [Climax][link-website] &middot; [![npm version][img-npm]][link-npm] [![Build Status][img-travis]][link-travis] [![Coverage Status][img-coveralls]][link-coveralls] [![JavaScript Style Guide][img-styleguide]][link-styleguide] [![Gitter Climax Community][img-gitter]][link-gitter]

You can think Climax as the "Electron for CLI applications". But in fact it does
even a bit more than that:

- **CLI-based Development**<br>
  We provide a CLI to help you generate (almost) everything. Fun fact: the Climax CLI utilizes Climax. We do eat our own
  :hamburger:.<br>
- **Cross-Platform Build & Release**<br>
  Generate and release cross-platform signed binaries in a matter of minutes with just a little bit of config, whether
  it includes a npm package or not.<br>
- **Auto-Update Feature**<br>
  Adding auto-update capabilities to your CLI clients has never been that easy: it is already implemented to work with
  your CI. And it's obviously fully secured.<br>
- **Conventions**<br>
  We provide a set of conventions regarding your CLI architecture in order to remove the pain of looking around for
  some.

## Features

- [Commander](https://github.com/commander-rb/commander)-like declaration
- Options and value filters
- Single and list prompts
- Loading bars and spinners
- Auto-update
- Binaries generation

## Getting started

> ### :warning: Attention
> **As long as the first beta releases won't be published, the alpha releases may be proven highly unstable and WILL
> include multiple breaking changes.**

> ### :zap: Info
> This entire process will be automatically generated via [Climax CLI][link-cli] as soon as its first alpha version will
> be released.

### Installation

```bash
npm i @climax/core
# or:
yarn add @climax/core
```

### Hello World

First, let's fill the meta info and declare the binary path:

_package.json_

```js
{
  // ...

  "name": "say.js",
  "description": "A dummy program repeating what you type.",
  "version": "1.0.0",
  "bin": {
    "say": "./bin/say.js"
  },

  // ...
}
```

> ### :zap: Info
> The name, description and version specified within your package.json are the ones used by default by Climax once you
> pass its source to `program#info()`. The `bin` key is also used to show help, warning and error messages.

Then let's write our first piece of code:

_bin/say.js_

```js
#!/usr/bin/env node

const { is, program } = require('@climax/core')
const info = require('../package.json')

program.info(info)
  .value('message', 'What do you want to say?', is.aMandatory.string.longerThan(0))
  .option('-t, --twice', 'Say it twice.', is.anOptional.boolean)
  .action(({ options, values }) => {
    for (let i = 0; i <= Number(options.twice); i++) {
      console.log(values.message)
    }
  })

program.command('hello')
  .description('Say hi to whoever you want.')
  .value('name', 'Whom do you want to say hello to?', is.aMandatory.string.longerThan(0))
  .option('-L, --in-language', 'In which language?', is.anOptional.list(['en', 'fr']).else('en'))
  .action(({ options, values }) => {
    const greeting = options.inLanguage === 'en'
      ? `Hello ${values.name}!`
      : `Bonjour ${values.name}!`

    console.log(greeting)
  })

program.init()
```

Finally we can link our local "binary" file (not compiled yet since they are interpreted by NodeJS thanks to the
Sha-Bang):

```bash
npm link
```

### Let's try it

```bash
$ say Bazinga!
Bazinga!

$ say hello E.T -L fr
Bonjour E.T!
```

## Current Working Progress

- [x] Initial Climax project config
- [x] Initial Climax project CI
- [x] Basic Program bootstrap with commands, options and values
- [x] Basic options and values filters
- [x] 0.1.0-beta release
- [ ] Help integration
- [ ] 0.2.0-beta release
- [ ] Cross-platform binaries
- [ ] Auto-update via (Travis + Github)
- [ ] [CLI][link-cli]: Binaries scripts generation (Travis + Github)
- [ ] [CLI][link-cli]: Auto-update config generation (Travis + Github)
- [ ] [CLI][link-cli]: Basic scaffold generation
- [ ] [CLI][link-cli]: 0.1.0-beta release
- [ ] 0.3.0-beta release
- [ ] Single prompt
- [ ] 0.4.0-beta release
- [ ] List prompt
- [ ] 0.5.0-beta release

## Documentation

_In progress..._

## Contributing

### Getting Started

```
git clone https://github.com/climax/core.git
cd core
yarn
```

### Running Tests

It is recommended to work in TDD mode, including continuously running tests while writing your code:

```
yarn test:watch
```

### License

Climax is [MIT licensed][link-license].

[img-coveralls]: https://img.shields.io/coveralls/github/climax/core/master?style=flat-square
[img-gitter]: https://img.shields.io/gitter/room/climax/community?style=flat-square
[img-npm]: https://img.shields.io/npm/v/@climax/core?style=flat-square
[img-styleguide]: https://img.shields.io/badge/code_style-airbnb-brightgreen?style=flat-square
[img-travis]: https://img.shields.io/travis/com/climax/core/master?style=flat-square
[link-cli]: https://github.com/climax/cli
[link-coveralls]: https://coveralls.io/github/climax/core
[link-license]: https://github.com/climax/climax/blob/master/LICENSE
[link-npm]: https://www.npmjs.com/package/@climax/core
[link-styleguide]: https://github.com/airbnb/javascript#airbnb-javascript-style-guide-
[link-travis]: https://travis-ci.com/climax/core
[link-website]: https://climaxjs.com
[link-gitter]: https://gitter.im/climax/community
