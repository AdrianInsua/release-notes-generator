# RELEASE NOTES

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




