[![Build & Test][build-badge]][build-link]
[![GitHub license][license-image]][repo-link]
[![Version][version-image]][repo-version-link]

<p align="center">
  <img alt="RNG" src="./assets/RNG.png">
</p>

---

This project was born to **automate the communication between developers and final users.**

A **complete markdown** file will be created using your pull request descriptions. 

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

- **GITHUB** via [@octokit](https://github.com/octokit/octokit.js).
- **TEAMS** via Webhooks.
		
</details>

---

# Documentation

- [Install](#install)
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
		
# Install

```bash
npm i -D "@adrian.insua/relase-notes-generator"
```
		
<br/>

# Example

```yml
# releasenotesrc.yml

message: "chore: update RELEASE-NOTES [skip ci]"
token: TOKEN
repo: RELEASE_NOTES_TEST
split: true
out: '.'
ignored-labels:
  - in-release-note
  - released
assets:
  - CHANGELOG.md
  - package.json
decoration:
  type/feature: '## :zap: '
  type/bug: '## :bug: '
```

```
// .env

TOKEN=<your-repo-token>
RELEASE_NOTES_TEST=adrianiy/release-notes-generator
```

### Output

```markdown
# RELEASE NOTES

# :rocket: Mock testing issue 
###### 2021-10-13

## :zap: Test Issue

This issue is used by release-notes-generator for test purposes
```

Check out our [RELEASE NOTES](/release-notes)

[build-badge]: https://github.com/adrianiy/release-notes-generator/workflows/Build%20&%20Test/badge.svg
[build-link]: https://github.com/adrianiy/release-notes-generator/actions?query=workflow%3A"Build+%26+Test"
[license-image]: https://badgen.net/github/license/adrianiy/release-notes-generator
[version-image]: https://badgen.net/github/release/adrianiy/release-notes-generator/stable
[repo-link]: https://github.com/adrianiy/release-notes-generator
[repo-version-link]: https://github.com/adrianiy/release-notes-generator/releases
