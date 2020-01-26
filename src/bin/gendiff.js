#!/usr/bin/env node

import program from 'commander';

import pjson from '../../package.json';
import genDiff from '../genDiff';

program
  .version(pjson.version)
  .description(pjson.description)
  .option('-f, --format [type]', 'output format')
  .arguments('<f> <path1> <path2>')
  .action((f, path1, path2) => {
    console.log(genDiff(f, path1, path2));
  })
  .parse(process.argv);
