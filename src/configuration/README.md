- [Configuration file](#configuration-file)
  - [summary](#summary)
  - [token](#token)
  - [repo](#repo)
  - [name](#name)
  - [out](#out)
  - [split](#split)
  - [filter](#filter)
  - [snapshot](#snapshot)
  - [labels](#labels)
  - [title](#title)
  - [decoration](#decoration)
  - [preview](#preview)
  - [publish](#publish)
  - [branch](#branch)
  - [message](#message)
  - [webhooks](#webhooks)
  - [notification](#notification)

# Configuration

Relase notes generator can be configured in a variety of ways. You can pass options directly to **rng** using cli commands, or create a configuration file in your `<root>` folder.

## Configuration file

We'll search for a config. file named `.releasenotesrc` by default, you can set a different name using `-c` CLI command.

We support `.yml` and `.json` formats with these options:

### Summary

| Options | Default | Description |
|---------|---------|-------------|
| [token](#token) | `GITHUB_TOKEN` | Authorization token. This will allow **rng** to access your repo! |
| [repo](#repo) | `GITHUB_REPOSITORY` | Environment variable with repository name with `user/repo` format |
| [name](#name) | `RELEASE-NOTES` | Output file name |
| [out](#out) | `'.'` | Base path where `RELEASE-NOTES` will be generated |
| [split](#split) | `false` | If `true` one file will be generated per iteration, and will be stored under a `release_notes` folder in `out` directory |
| [filter](#filter) | `is:closed` | Filter applied on pull request query |
| [snapshot](#snapshot) | `false` | Generates snapshot release notes using Pull Request since latest release |
| [labels](#labels) | `[ 'release-note' ]` | Only PRs with these labels will be used in generation process |
| [title](#title) | `RELEASE NOTES` | Title used in output markdown |
| [decoration](#decoration) | [Decoration object](#decoration-object) | Icon decoration for each issue type |
| [preview](#preview) | [Preview object](#preview-object) | Customize preview comment |
| [publish](#publish) | `false` | If `true` the output file will be commited to repo |
| [branch](#branch) | `main` | Branch where output will be uploaded |
| [message](#message) | `chore: update RELEASE-NOTES` | Commit message |
| [webhooks](#webhooks) | `{}` | List of [webhooks](#webhooks) to execute |
| [notification](#notification) | [Notification customization](#customized-notification) | Object that allows you to customize your webhook notification |

---

### TOKEN
##### Default value `GITHUB_TOKEN`

Authorization token. This will allow **rng** to access your repo! 

```yml
token: USER_TOKEN
```

### REPO
##### Default value `GITHUB_REPOSITORY`

Environment variable with repository name with `user/repo` format.

```yml
repo: CUSTOM_REPO
```

```
// env file
CUSTOM_REPO: user/repo
```

---

### NAME
##### Default value `RELEASE-NOTES`

Output file name.

```yml
name: RELASE-NOTES-DEMO
```


### OUT
##### Default value `''`

Base path where `RELEASE-NOTES` will be generated. **It must exists.**

```yml
out: '.' # creates release-notes folder in root
```

### SPLIT
##### Default value `false`

If `true` one file will be generated per iteration, and will be stored under a `release-notes` folder in `out` directory.

```yml
split: true
out: '.'
```

---

### FILTER
##### Default value `is:closed`

Filter applied on pull request query.

Default value looks for **closed** Pull Requests.

```yml
filter: "is:open" # looks for open PRs
```

### SNAPSHOT
##### Default value `false`

Generates snapshot release notes using Pull Request since latest release.

```yml
snapshot: true # RELEASE-NOTES for unpublished release
```

### LABELS
##### Default value [Label object](#label-object)

Configuration object to set wich labels will be **included**, **ignored** and used to **tag parsed** Pull Requests

- include: Only Pull Requests with these labels will be included in release notes.
- ignore: Pull Requests with these label will be ignored.
- end: Once release notes are generated, Pull Requests will be tagged with these labels.

#### Label object

Default labels configuration.

```yml
labels:
  include: release-note
  ignore: in-release-note
  end: in-release-note
```

---

### TITLE
##### Default value `RELEASE NOTES`

Title used in output markdown


```yml
title: RELEASE NOTES DEMO
```

### DECORATION
##### Default value [Decoration object](#decoration-object)

Icon decoration for each issue type.

#### Decoration object 

`key: value` object.

- key: issue type
- value: decoration string

```yml
// default value
decoration: 
  enhancement: ':zap: '
  bug: ':bug: '
  refactor: ':abacus: '
  release: ':rocket: '
  style: ':nailcare: '
  documentation: ':book: '
```

Markdown for a pr tagged with `enhancement` label:

```markdown
## :zap: Issue title
```

---

### PREVIEW
##### Defaul value [Preview object](#preview-object)

Customize `header` and `footer` of release note preview comment.

Preview comment will be published only if `issue` attribute is informed.

You can configure `issue` dinamically using `--issue` CLI command.

#### Preview object

Default preview configuration.

```yml
preview:
  issue: undefined # if informed the generation script will try to publish a comment in `issue`
  header: '### :book::rocket: RELEASE NOTES Preview'
  footer: 'Generated with [RNG](https://github.com/adrianiy/release-notes-generator) bot :robot:'
```

### PUBLISH
##### Default value `false`

If `true` the output file will be commited to repo.

> GITHUB_TOKEN should have enough permissions if you are trying to update a protected branch!

```yml
publish: true
```

### BRANCH
##### Default value `main`

Branch where output will be updloaded

```
branch: develop
```

### MESSAGE
##### Default value `chore: update RELEASE-NOTES`

Commit message

```yml
message: "chore: update RELEASE-NOTES [skip ci]"
```

---

### WEBHOOKS
##### Default value `{}`

List of webhooks to execute.

#### TEAMS

Notificate your partners via [TEAMS webhook integration!](https://docs.microsoft.com/es-es/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook).

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

### Notification
##### Default value [Configuration object](#default-configuration)

You can customize your webhook notification using `notification.style` attribute.

This is an object where each key is a htm tag like `<div>` with a style object as value.

By default we modify some classes to make notification more readable, we encourage yo to use this yml example as a base for your customizations

#### Default configuration

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

