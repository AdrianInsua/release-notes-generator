# RELEASE NOTES

# :rocket: Release 1.7.0 
###### 2021-10-30

We have a new BRAND LOGO 🥳

---



## :zap: Feat/customize notifications 
###### 2021-10-30

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

💅 Now you can customize your notifications!!

To do this you can configure a set of tag styles using `notification.style` configuration property like this

```yml
notification:
  style:
    h1:
      font-size: 3rem
      margin-top: 2rem
    h2:
      font-size: 2rem
      margin-top: 3rem 
```

### Issues
<!-- Link related issue after close using # notation. `Close #123`-->

Close #67 






# :rocket: Release 1.6.0 
###### 2021-10-21



## :zap: Use last n releases 
###### 2021-10-21

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

New option to process las `N` releases is available!! 🥳 

```yml
useLast: 2
```

Will use the creation date of the 2nd latest release to process pull requests





## :bug: Move section decoration to config 
###### 2021-10-21

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

Release sections have not the required relevance as they are decorated with `##` as any other issue.

To solve this we move section decorators `#` to configuration object, this allow users to configure as many `#` as they want.








## :rocket: Release 1.4.0 
###### 2021-10-19



## :zap: Add since option to change start date filter 
###### 2021-10-19

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

- Added `since` option to modify start date filter in pull requests query








## :rocket: Release 1.3.0 
###### 2021-10-18

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

- Improve teams activity cards styles
- Check for `webhooks` existence instead of publish flag to execute webhooks




## :rocket: Release 1.2.0 
###### 2021-10-18

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

#### ✨ `filter` option is now available in configuration!

With this option you can add any filter you like in pull request query

```yml
filter: 'is:closed'
```



## :rocket: Release 1.1.3 
###### 2021-10-17

We need graphql-import-node to be installed in production

So we moved it from `devDependencies` to `dependencies`








## :rocket: Release 1.1.0 
###### 2021-10-17

This release will add some powerfull options like an asset pusher #27  and TEAMS notificator #15 



## :zap: Add teams webhook 
###### 2021-10-17

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

We are supporting teams notification!! 🥳 🥳 

First [configure webhooks](https://docs.microsoft.com/es-es/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) in your TEAMS channel

Then edit your `releasenotesrc`

```yml
webhooks:
  teams:
    url: # <your webhook url>
```

## :zap: Add assets publishment method 
###### 2021-10-17

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

Now publishment method can publish any file you specify under `assets` property.

```yaml
assets:
    - CHANGELOG.md
    - package.json
```

This is usefull por CI workflows that require to update multiple files like increasing package version or updating changelog.

## :zap: Add ignored labels option 
###### 2021-10-17

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

- Added ignored labels option

```yml
ingoredLabels:
     - in-release-note
```





## :rocket: Release 1.0.0 
###### 2021-10-16

# First package release! :partying_face: :partying_face:

We are glad to announce our first release version **1.0.0**.

With this version you will be able to generate your own `RELEASE-NOTES.md` and share it with your users to give them a deep insight of what's in your latest release :rocket: !!

### Configuration

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

For more info take a look at our [DOCS](https://github.com/adrianiy/release-notes-generator/blob/develop/README.md)




