#!/usr/bin/env node

import program from 'commander';

import pjson from '../../package.json';
import genDiff from '..';

program
  .version(pjson.version)
  .description(pjson.description)
  .option('-f, --format [type]', 'output format')
  .arguments('<f> <path1> <path2>')
  .action((format, path1, path2) => {
    console.log(genDiff(path1, path2, format));
  })
  .parse(process.argv);
