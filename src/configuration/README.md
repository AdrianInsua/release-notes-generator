- [Configuration](#configuraion)
  - [summary](#summary)
  - [token](#token)
  - [repo](#repo)
  - [out](#out)
  - [name](#name)
  - [labels](#labels)
  - [ignoredLabels](#ignoredLabels)
  - [split](#split)
  - [publish](#publish)
  - [message](#message)
  - [filter](#filter)
  - [branch](#branch)
  - [useLast](#useLast)
  - [title](#title)
  - [decoration](#decoration)
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

### TOKEN
##### Default value `GITHUB_TOKEN`

Authorization token. This will allow **rng** to access your repo! 

```yml
token: USER_TOKEN
```

### REPO
##### Default value `GITHUB_REPOSITORY`

Environment variable with repository name with `user/repo` format 

```yml
repo: CUSTOM_REPO
```

```
// env file
CUSTOM_REPO: user/repo
```


### OUT
##### Default value `''`

Base path where `RELEASE-NOTES` will be generated. **It must exists.**

```yml
out: '.' # creates release-notes folder in root
```

### NAME
##### Default value `RELEASE-NOTES`

Output file name

```yml
name: RELASE-NOTES-DEMO
```

### LABELS
##### Default value `['release-note']`

Only PRs with these labels will be used in generation process 

```yml
labels:
  - release-note
  - release-note-demo
```

### IGNORED LABELS
##### Default value `[ 'in-release-note' ]`

PRs with these labels will be ignored 

```yml
ignoredLabels:
  - in-release-note
  - in-release-note-demo
```


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

