# CLI

:computer: You can use **RNG** in command-line with `rng`!

```bash
// rng --help

Comandos:
  rng generate  Generates Release Note markdown                  [alias: gen]
  rng publish   Pubish Release Note in your repo                 [alias: pub]

Opciones:
  --version  Muestra número de versión                                [booleano]
  --help     Muestra ayuda                                            [booleano]
```

There are two available commands `generate` and `publish`.

#### Generate

```bash
// rng generate --help

Generates Release Note markdown

Opciones:
      --version         Muestra número de versión                     [booleano]
      --help            Muestra ayuda                                 [booleano]
  -c, --configuration   Configuration file path           [cadena de caracteres]
  -o, --output, --out   Output path                       [cadena de caracteres]
  -n, --name            Output file name                  [cadena de caracteres]
  -a, --auth            Manual creadentials input                     [booleano]
  -r, --repo            Repo in format user/repo          [cadena de caracteres]
  -f, --filter          Filter to apply in Pull request query
                                                          [cadena de caracteres]
  -s, --since           Start date in pull request filter query
                                                          [cadena de caracteres]
  -u, --use, --useLast  Uses last n releases                            [número]
  -m, --message         Commit message                    [cadena de caracteres]
  -p, --publish         Publish output to your repo                   [booleano]
      --assets          File to upload in publish process [cadena de caracteres]
  -v, --verbose         Makes the script verbose                      [booleano]
  -i, --interactive     Executes interactive version of the script    [booleano]
```

#### Publish

```bash
// rng publish --help

Pubish Release Note in your repo

Opciones:
      --version         Muestra número de versión                     [booleano]
      --help            Muestra ayuda                                 [booleano]
  -c, --configuration   Configuration file path           [cadena de caracteres]
  -a, --auth            Manual creadentials input                     [booleano]
  -r, --repo            Repo in format user/repo          [cadena de caracteres]
  -f, --filter          Filter to apply in Pull request query
                                                          [cadena de caracteres]
  -s, --since           Start date in pull request filter query
                                                          [cadena de caracteres]
  -u, --use, --useLast  Uses last n releases                            [número]
  -m, --message         Commit message                    [cadena de caracteres]
  -p, --publish         Publish output to your repo                   [booleano]
      --assets          File to upload in publish process [cadena de caracteres]
  -v, --verbose         Makes the script verbose                      [booleano]
  -i, --interactive     Executes interactive version of the script    [booleano]
```
