# :rocket: RNG

**RELEASE NOTES GENERATOR** automates the creation of a customized release note.

This is not a changelog generator, it will not generate simple changelog notes abot what changes
are included, instead of this a complete .MD file will be created with a custom text where you can
explain your newest changes deeply.

This project was born to automate the communication between developers and final users.


## How Release Notes are done

- Parse every PR since last RELEASE.
- Include all PR description's markdown in `RELEASE-NOTE.md`
- The parsing will use PR's labels for:
	- Filter wich labels will be used in `RELEASE-NOTES.md`. i.e: `type/releas-note`
	- Mark Release note section as feature, bug, refactor, etc.
- If you set `CI` flag all changes will be commited to your repo.


## Supported Repos

Currently we are only supporting **GITHUB**.

## Documentation

- Usage
	- [Installation](#installation)
	- [Configuration](#configuration)
    - [CI Configuration](#ci-configuration)
	- [Cli commands](#cli)
- Examples
	- [Configuration](#configuration-example)
	- [PullRequest](#pull-request)
	- [Output](#output)

## Usage

### Installation

```bash
npm i @adrianiy/relase-notes-generator
```

### Configuration

Relase notes generator can be configured in a variety of ways. You can pass options directly to **rng** using cli commands, or create a configuration file in your `<root>` folder.

#### Configuration file

We support `.yml` and `.json` formats with these options

| Options | Default | Description |
|---------|---------|-------------|
| token | `GITHUB_TOKEN` | Authorization token. This will allow **rng** to access your repo! |
| repo | `GITHUB_REPOSITORY` | Repository name with `user/repo` format |
| out | `'.'` | Base path where `RELEASE-NOTES` will be generated |
| name | `RELEASE-NOTES` | Output file name |
| labels | `[ 'release-note' ]` | Only PRs with these labels will be used in generation process |
| split | `false` | If `true` one file will be generated per iteration, and will be stored under a `release_notes` folder in `out` directory |
| publish | `false` | If `true` the output file will be commited to repo |
| message | `chore: update RELEASE-NOTES` | Commit message |
| branch | `main` | Branch where output will be uploaded |
| title | `RELEASE NOTES` | Title used in output markdown |
| decoration | [Decoration object](#decoration-object) | Icon decoration for each issue type |

##### CI Configuration

This configuration depends entirely on your necessities, just keep in mind that PRs are parsed since last release so you'll need to execute **RNG** before new release step.

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

#### CLI

:computer: You can use **RNG** in command-line!

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
      --version        Muestra número de versión                      [booleano]
      --help           Muestra ayuda                                  [booleano]
  -c, --configuration  Configuration file path            [cadena de caracteres]
  -o, --output, --out  Output path                        [cadena de caracteres]
  -n, --name           Output file name                   [cadena de caracteres]
  -a, --auth           Manual creadentials input                      [booleano]
  -r, --repo           Repo in format user/repo           [cadena de caracteres]
  -m, --message        Commit message                     [cadena de caracteres]
  -p, --publish        Publish output to your repo                    [booleano]
  -v, --verbose        Makes the script verbose                       [booleano]
  -i, --interactive    Executes interactive version of the script     [booleano]
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
  -v, --verbose        Makes the script verbose                       [booleano]
  -i, --interactive    Executes interactive version of the script     [booleano]
```

## Examples

### Configuration example

This is our test configuarion `.yml`

```yml
# releasenotes.yml

token: TOKEN
name: RELEASE_NOTES_TEST
commit: false

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
