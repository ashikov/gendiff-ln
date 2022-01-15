# Gendiff

[![Node.js CI](https://github.com/ashikov/gendiff-ln/actions/workflows/nodejs.yml/badge.svg)](https://github.com/ashikov/gendiff-ln/actions/workflows/nodejs.yml)

This package includes CLI app which compares two configuration files and shows a difference

## Requirements

* Node.js >= 14
* npm >= 6

## Installation from npm registry

```shell
npm install -g gendiff-ln
```

## Usage

To see the help, use the **h** option.

```shell
gendiff -h
```

The application supports 3 output diff formats:

* default (indented format)
* plain
* json

You can choose one of them.

```shell
gendiff -f plain ./file1.json ./file2.json
```

## Asciinema examples

[gendiff default output examlpe](https://asciinema.org/a/RbqQ2EKxKdbkFNW5WkaXuupEs)

[gendiff plain output examlpe](https://asciinema.org/a/QTk4G8OlUpZupuH1aDIeT76FL)

[gendiff JSON output examlpe](https://asciinema.org/a/EpnC5jFukKUysugzXJDmS05wm)
