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
| out | '.' | Base path where `RELEASE-NOTES` will be generated |
| name | `RELEASE-NOTES` | Output file name |
| labels | [ 'release-note' ] | Only PRs with these labels will be used in generation process |
| split | `false` | If `true` one file will be generated per iteration, and will be stored under a `release_notes` folder in `out` directory |
| publish | `false` | If `true` the output file will be commited to repo |
| message | `chore: update RELEASE-NOTES` | Commit message |
| branch | `main` | Branch where output will be uploaded |
| title | `RELEASE NOTES` | Title used in output markdown |
| decoration | [Decoration object](#decoration-object) | Icon decoration for each issue type |

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

For a pr tagged with `enhancement` label this will generate:

```markdown
## :zap: Issue title
```

#### CLI

:construction: under construction

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
