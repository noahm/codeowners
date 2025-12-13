# @nmann/codeowners

[![npm](https://img.shields.io/npm/v/@nmann/codeowners)](https://www.npmjs.com/package/@nmann/codeowners)

A package and CLI for getting more out of 
[CODEOWNERS](https://help.github.com/articles/about-codeowners/) files.

In addition to typical usage, this also allows a CODEOWNERS file to serve as a source of truth for [metadata about teams and individuals](#team-metadata). This is useful for quick reference to things like preferred contact channels, JIRA project names, etc.

This metadata is even more convenient to use via [the companion VS Code extension](https://marketplace.visualstudio.com/items?itemName=noahm.codeowners-extended).

CODEOWNERS files will be auto-detected in all standard locations including `.github`, `.gitlab`, and `.bitbucket` directories.

## Library usage

```js
import Codeowners from '@nmann/codeowners';

// defaults to process.cwd(), but can pass a different directory path to constructor
const owners = new Codeowners(optionalRootDir);
owners.getOwner('path/to/file.js'); // returns array of owners, e.g. ['@noahm']
```

### Team metadata

This library will attempt to parse out contact info for teams if listed in a simple format of space-separated values. Only lines beginning with a double-pound "##" will be parsed.

The first line is a space-separated list of column names, and the following lines provide values for those columns, one line per team.

Example team metadata block:

```sh
## team slack-channel engineering-manager jira-project-key
## @org/admins #project-admins @alice ADMIN
## @org/design #design @bob DESIGN
## @org/monetization #monetization-eng @charlie MONEY

# ... regular codeowners file contents ...
```

This info is parsed and made available in an array of structured objects on the `contactInfo` field of a codeowners class instance:

```js
[
  {
    team: '@org/admins',
    'slack-channel': '#project-admins',
    'engineering-manager': '@alice',
    'jira-project-key': 'ADMIN',
  },
  {
    team: '@org/design',
    'slack-channel': '#design',
    'engineering-manager': '@bob',
    'jira-project-key': 'DESIGN',
  },
  {
    team: '@org/monetization',
    'slack-channel': '#monetization-eng',
    'engineering-manager': '@charlie',
    'jira-project-key': 'MONEY',
  },
];
```

## CLI usage

Find the owner(s) of a given file or files:

```sh
$ codeowners of some/file.ts [...otherfiles]
```

Print a list of each files in the current repo, followed by its owner:

```sh
$ codeowners audit
```

To find a list of files not covered by the `CODEOWNERS` in the project:

```sh
$ codeowners audit --unowned
```

Specify a non-standard CODEOWNERS filename

```sh
$ codeowners audit -c CODEKEEPERS
```

Verify users/teams own a specific path

```sh
$ codeowners verify src/ @foob_ar @contoso/engineers
```

# Developing

This project uses [Bun](https://bun.sh/) to install dependencies and run tests, and it is my personal recommendation that you use [mise](https://mise.jdx.dev/) to manage the installation. Simply type `bun install` within this project to install the expected version of bun.

- `bun install` to install dependencies
- `bun test` to run unit tests
- `bun run lint` to run all linters (Biome)
- `bun run format` to apply formatting (Biome)
- `bun run typecheck` runs `tsc`
- `bun run attw` runs "Are the types wrong" (sanity checks on type resolution issues)
