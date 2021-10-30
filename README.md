[![Build & Test][build-badge]][build-link]
[![GitHub license][license-image]][repo-link]
[![Version][version-image]][repo-version-link]

<p align="center">
  <img alt="RNG" src="./assets/RNG.png">
</p>

<center><h1 align="center">:rocket: RELEASE NOTES GENERATOR :rocket:</h1></center>

**RELEASE NOTES GENERATOR** automates the creation of a customized release note.

This is not a changelog generator, it will not generate simple changelog notes about what changes
are included.

A complete markdown file will be created with using your pull request descriptions, so final users can have
a deeply description of the changes published in the release.

This project was born to automate the communication between developers and final users.

<details>
	<summary>How Release Notes are done</summary>

- Parse every PR **since last RELEASE**.
- Include PR title and description's markdown in `RELEASE-NOTE.md`
- The parser will use Pull Request labels for:
	- **Filter** wich labels will be used in `RELEASE-NOTES.md`. i.e: `type/releas-note`
	- **Mark** Release note section as feature, bug, refactor, etc.
- If you set `publish: true` 
    - Flag all changes will be commited to your repo.
    - Tag pull requests with `in-release-note` label.
- Execute plugins, like TEAMS webhooks
	
</details>

<details>
	<summary>Supported Repos</summary

Currently we are only supporting **GITHUB** via [@octokit](https://github.com/octokit/octokit.js) and TEAMS notifications using webhooks.
		
</details>

---

# Documentation

- [Usage](#usage)
	- [Installation](#installation)
	- [Configuration](#configuration)
        - [Configuration file](#configuration-file)
        - [Decoration object](#decoration-object)
    	- [CI Configuration](#ci-configuration)
	- [Cli commands](#cli)
- [Examples](#examples)
	- [Configuration](#configuration-example)
	- [PullRequest](#pull-request)
	- [Output](#output)
<br/>
		
# Usage

## Installation

```bash
npm i -D "@adrian.insua/relase-notes-generator"
```

## Configuration

Relase notes generator can be configured in a variety of ways. You can pass options directly to **rng** using cli commands, or create a configuration file in your `<root>` folder.

### Configuration file

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
| useLast | 2 | Gets data from release `n` to release 0 |
| title | `RELEASE NOTES` | Title used in output markdown |
| decoration | [Decoration object](#decoration-object) | Icon decoration for each issue type |
| webhooks | `{}` | List of [webhooks](#webhooks) to execute |
| notification | [Notification customization](#customized-notification) | Object that allows you to customize your webhook notification |


#### Webhooks

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


#### Decoration object 

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

#### Customized notification

You can customize your webhook notification using `notification.style` attribute.

This is an object where each key is a htm tag like `<div>` with a style object as value.

By default we modify some classes to make notification more readable, we encourage yo to use this yml example as a base for your customizations

```yml
notification:
  style:
    h1:
      font-size: 3rem
      margin-top: 2rem
    h2:
      font-size: 2rem
      margin-top: 3rem 
    h3:
      font-size: 1.8rem
      margin: 2rem 0
    h6:
      font-size: .9em
      opacity: .7
    p:
      font-size: 1.4rem
    li:
      margin-bottom: 8px
    pre: 
      margin-bottom: .7rem
```

#### CI Configuration

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

<br/>

## CLI

:computer: You can use **RNG** in command-line with `rng`!

```bash
// rng --help

Comandos:
  rng generate  Generates Release Note markdown                  [alias: gen]
  rng publish   Pubish Release Note in your repo                 [alias: pub]

Opciones:
  --version  Muestra número de versión                                [booleano]
  --help     Muestra ayuda                                            [booleano]
```

There are two available commands `generate` and `publish`.

##### Generate

```bash
// rng generate --help

Generates Release Note markdown

Opciones:
      --version         Muestra número de versión                     [booleano]
      --help            Muestra ayuda                                 [booleano]
  -c, --configuration   Configuration file path           [cadena de caracteres]
  -o, --output, --out   Output path                       [cadena de caracteres]
  -n, --name            Output file name                  [cadena de caracteres]
  -a, --auth            Manual creadentials input                     [booleano]
  -r, --repo            Repo in format user/repo          [cadena de caracteres]
  -f, --filter          Filter to apply in Pull request query
                                                          [cadena de caracteres]
  -s, --since           Start date in pull request filter query
                                                          [cadena de caracteres]
  -u, --use, --useLast  Uses last n releases                            [número]
  -m, --message         Commit message                    [cadena de caracteres]
  -p, --publish         Publish output to your repo                   [booleano]
      --assets          File to upload in publish process [cadena de caracteres]
  -v, --verbose         Makes the script verbose                      [booleano]
  -i, --interactive     Executes interactive version of the script    [booleano]
```

##### Publish

```bash
// rng publish --help

Pubish Release Note in your repo

Opciones:
      --version         Muestra número de versión                     [booleano]
      --help            Muestra ayuda                                 [booleano]
  -c, --configuration   Configuration file path           [cadena de caracteres]
  -a, --auth            Manual creadentials input                     [booleano]
  -r, --repo            Repo in format user/repo          [cadena de caracteres]
  -f, --filter          Filter to apply in Pull request query
                                                          [cadena de caracteres]
  -s, --since           Start date in pull request filter query
                                                          [cadena de caracteres]
  -u, --use, --useLast  Uses last n releases                            [número]
  -m, --message         Commit message                    [cadena de caracteres]
  -p, --publish         Publish output to your repo                   [booleano]
      --assets          File to upload in publish process [cadena de caracteres]
  -v, --verbose         Makes the script verbose                      [booleano]
  -i, --interactive     Executes interactive version of the script    [booleano]
```
<br/>
		
---
		
<br/>

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
