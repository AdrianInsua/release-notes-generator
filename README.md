[![Build & Test][build-badge]][build-link]
[![GitHub license][license-image]][repo-link]
[![Version][version-image]][repo-version-link]

# :rocket: RELEASE NOTES GENERATOR (RNG)

**RELEASE NOTES GENERATOR** automates the creation of a customized release note.

This is not a changelog generator, it will not generate simple changelog notes about what changes
are included.

A complete markdown file will be created with using your pull request descriptions, so final users can have
a deeply description of the changes published in the release.

This project was born to automate the communication between developers and final users.


## How Release Notes are done

- Parse every PR **since last RELEASE**.
- Include PR title and description's markdown in `RELEASE-NOTE.md`
- The parser will use Pull Request labels for:
	- **Filter** wich labels will be used in `RELEASE-NOTES.md`. i.e: `type/releas-note`
	- **Mark** Release note section as feature, bug, refactor, etc.
- If you set `publish: true` 
    - Flag all changes will be commited to your repo.
    - Tag pull requests with `in-release-note` label.
- Execute plugins, like TEAMS webhooks


## Supported Repos

Currently we are only supporting **GITHUB** via [@octokit](https://github.com/octokit/octokit.js) and TEAMS notifications using webhooks.

# Documentation

- Usage
	- [Installation](#installation)
	- [Configuration](#configuration)
        - [Configuration file](#configuration-file)
        - [Decoration object](#decoration-object)
    	- [CI Configuration](#ci-configuration)
	- [Cli commands](#cli)
- Examples
	- [Configuration](#configuration-example)
	- [PullRequest](#pull-request)
	- [Output](#output)

# Usage

### Installation

```bash
npm i -D "@adrian.insua/relase-notes-generator"
```

### Configuration

Relase notes generator can be configured in a variety of ways. You can pass options directly to **rng** using cli commands, or create a configuration file in your `<root>` folder.

#### Configuration file

We'll search for a config. file named `.releasenotesrc` by default, you can set a different name using `-c` CLI command.

We support `.yml` and `.json` formats with these options:

| Options | Default | Description |
|---------|---------|-------------|
| token | `GITHUB_TOKEN` | Authorization token. This will allow **rng** to access your repo! |
| repo | `GITHUB_REPOSITORY` | Environment variable with repository name with `user/repo` format |
| out | `'.'` | Base path where `RELEASE-NOTES` will be generated |
| name | `RELEASE-NOTES` | Output file name |
| labels | `[ 'release-note' ]` | Only PRs with these labels will be used in generation process |
| ignoredLabels | `[ 'in-release-note' ]` | PRs with these labels will be ignored |
| split | `false` | If `true` one file will be generated per iteration, and will be stored under a `release_notes` folder in `out` directory |
| publish | `false` | If `true` the output file will be commited to repo |
| message | `chore: update RELEASE-NOTES` | Commit message |
| filter | `is:closed` | Filter applied on pull request query |
| branch | `main` | Branch where output will be uploaded |
| title | `RELEASE NOTES` | Title used in output markdown |
| decoration | [Decoration object](#decoration-object) | Icon decoration for each issue type |
| webhooks | `{}` | List of [webhooks](#webhooks) to execute |


##### Webhooks

Notificate your partners via [TEAMS webhook integration!](https://docs.microsoft.com/es-es/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

```yml
webhooks:
  teams:
    url: # <your webhook url>
    activityTitle: "Release notification!"
    activitySubtitle: "Generated with [@adrian.insua/release-notes-generator](https://github.com/adrianiy/release-notes-generator)"
    activityImage: "<image url>"
    actions:
      - "@type": "OpenUri"
        name: "View Changes"
        targets:
          - os: default
            uri: "https://github.com/inditex/adrianiy/blob/develop/CHANGELOG.md"
```

> Only url parameter is mandatory!

> [Microsoft Docs for activity cards](https://docs.microsoft.com/es-es/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cconnector-html#format-cards-with-html)


##### Decoration object 

This object of `key:value` have as key the issue type and value desired decotaion

```js
// default value
decoration: {
	enhancement: ':zap: ',
	bug: ':bug: ',
	refactor: ':abacus: ',
	release: ':rocket: ',
	style: ':nailcare: ',
	documentation: ':book: ',
},
```

This is the result markdown for a pr tagged with `enhancement` label:

```markdown
## :zap: Issue title
```

##### CI Configuration

This configuration depends entirely on your necessities, just keep in mind that PRs are parsed since last release so you'll need to execute **RNG** before new release step.

> GITHUB_TOKEN should have enough permissions if you are trying to update a protected branch!

If you are trying to push to a **protected_branch** you can create a personal access token in your profile with enough permissions and use it in your workflow

1. Create a **personal access token**.
2. Add it as a secret in your project configuration.
3. Update your workflow to use it as auth token for **rng**

```yml
  run: npm run rng
  env:
    GITHUB_TOKEN: ${ secrets.ADMIN_TOKEN }
```

#### CLI

:computer: You can use **RNG** in command-line with `rng`!

```bash
// rng --help

Comandos:
  bin.js generate  Generates Release Note markdown                  [alias: gen]
  bin.js publish   Pubish Release Note in your repo                 [alias: pub]

Opciones:
  --version  Muestra número de versión                                [booleano]
  --help     Muestra ayuda                                            [booleano]
```

There are two available commands `generate` and `publish`.

###### Generate

```bash
// rng generate --help

Generates Release Note markdown

Opciones:
      --version        Show version number                             [boolean]
      --help           Show help                                       [boolean]
  -c, --configuration  Configuration file path                          [string]
  -o, --output, --out  Output path                                      [string]
  -n, --name           Output file name                                 [string]
  -a, --auth           Manual creadentials input                       [boolean]
  -r, --repo           Repo in format user/repo                         [string]
  -f, --filter         Filter to apply in Pull request query            [string]
  -s, --since          Start date in pull request filter query          [string]
  -m, --message        Commit message                                   [string]
  -p, --publish        Publish output to your repo                     [boolean]
      --assets         File to upload in publish process                [string]
  -v, --verbose        Makes the script verbose                        [boolean]
  -i, --interactive    Executes interactive version of the script      [boolean]
```

###### Publish

```bash
// rng publish --help

Pubish Release Note in your repo

Opciones:
      --version        Muestra número de versión                      [booleano]
      --help           Muestra ayuda                                  [booleano]
  -c, --configuration  Configuration file path            [cadena de caracteres]
  -a, --auth           Manual creadentials input                      [booleano]
  -r, --repo           Repo in format user/repo           [cadena de caracteres]
  -m, --message        Commit message                     [cadena de caracteres]
  -p, --publish        Publish output to your repo                    [booleano]
      --assets         File to upload in publish process  [cadena de caracteres]
  -v, --verbose        Makes the script verbose                       [booleano]
  -i, --interactive    Executes interactive version of the script     [booleano]
```



# Examples

### Configuration example

This is our test configuarion `.yml`

```yml
# releasenotesrc.yml

token: TOKEN
name: RELEASE_NOTES_TEST
commit: false

```

```
// .env

TOKEN=<your-repo-token>
RELEASE_NOTES_TEST=adrianiy/release-notes-generator
```

### Pull request

This is going to depend on your configuration file, by default we'll look for Pr's labeled with `release-note` like [this](https://github.com/adrianiy/release-notes-generator/pull/12).

### Output

This is an output example of `RELEASE-NOTES.md`

> # RELEASE NOTES
>
> ## :rocket: Mock testing issue 
> ###### 2021-10-13
>
> ### Test Issue
>
> This issue is used by release-notes-generator for test purposes

```markdown
# RELEASE NOTES

## :rocket: Mock testing issue 
###### 2021-10-13

### Test Issue

This issue is used by release-notes-generator for test purposes
```

[build-badge]: https://github.com/adrianiy/release-notes-generator/workflows/Build%20&%20Test/badge.svg
[build-link]: https://github.com/adrianiy/release-notes-generator/actions?query=workflow%3A"Build+%26+Test"
[license-image]: https://badgen.net/github/license/adrianiy/release-notes-generator
[version-image]: https://badgen.net/github/release/adrianiy/release-notes-generator/stable
[repo-link]: https://github.com/adrianiy/release-notes-generator
[repo-version-link]: https://github.com/adrianiy/release-notes-generator/releases
