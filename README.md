# onsen-store

## Setup
Install `serverless`

```shell
npm install -g serverless
```

Copy `.envrc` and add configurations.

```shell
cp .envrc.example .envrc
vim .envrc
```

## Local invocation

```shell
npx sls invoke local -f fetchPrograms
```

With path parameters

```shell
npx sls invoke local \
  -f fetchProgram \
  --data '{ "pathParameters": { "name": "hoge" }}'
```

