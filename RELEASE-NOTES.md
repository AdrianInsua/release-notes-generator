# RELEASE NOTES



















































































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




