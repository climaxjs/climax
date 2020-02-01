# Contributing

We would love for you to contribute to Climax and help make it better! As a contributor, here are the guidelines we
would like you to follow:

- [Contributing](#contributing)
  - [Commit Message Guidelines](#commit-message-guidelines)
    - [Revert](#revert)
    - [Type](#type)
    - [Scope](#scope)
    - [Subject](#subject)

## Commit Message Guidelines

Each commit message consists of a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
```

The **type** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub
as well as in various git tools.

**Examples:**

- `docs(changelog): update changelog to 1.12.5`
- `fix(release): need to depend on latest rxjs and zone.js`
- `ci: configure dependabot`

Do not hesitate check [existing commits][link-cdtb-commits] to get a better understanding.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies.
- **chore**: Updates and upgrades.
- **ci**: Changes to our CI configuration files and scripts.
- **docs**: Documentation only changes.
- **feat**: A new feature.
- **fix**: A bug fix.
- **perf**: A code change that improves performance.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **style**: Changes that do not affect the meaning of the code.
- **test**: Adding missing tests or correcting existing tests.

### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated
from commit messages).

The following is the list of supported scopes:

- **command**
- **filter**
- **option**
- **program**
- **utils**
- **value**

There are currently a few exceptions to the "use package name" rule:

- **packaging**: Used for changes that change the npm package layout in all of our packages, e.g.
  public path changes, package.json changes done to all packages, d.ts file/format changes, changes
  to bundles, etc.
- **changelog**: Used for updating the release notes in CHANGELOG.md
- none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

### Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes".
- Don't capitalize the first letter.
- No dot (.) at the end.
