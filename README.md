# 🚀 release-notes-generator

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
	- [Configuration](#configExample)
	- [PullRequest](#pullRequest)
	- [Output]("#output")


## Examples

### Configuration

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

> # RELEASE NOTESjkkj
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
