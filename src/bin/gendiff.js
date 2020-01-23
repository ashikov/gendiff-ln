#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<f> <path1> <path2>')
//  .action((f, path1, path2) => {
//    const format = f;
//    const pathToFile1 = path1;
//    const pathToFole2 = path2;
//  })
  .parse(process.argv);
