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

- [Installation](#installation)
- [Configuration](/src/configuration#readme)
    - [Configuration file](/src/configuration#configuraition-file)
    - [Decoration object](/src/configuration#decoration-object)
    - [Customized notification](/src/configuration#customized-notification)
    - [CI Configuration](#ci-configuration)
- [Cli commands](/src/commander#readme)
- [Examples](#examples)
	- [Configuration](#configuration-example)
	- [PullRequest](#pull-request)
	- [Output](#output)
<br/>
		
# Installation

```bash
npm i -D "@adrian.insua/relase-notes-generator"
```
		
<br/>

# CI Configuration

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
