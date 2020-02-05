import program from 'commander';

import pjson from '../package.json';
import genDiff from '.';

program
  .version(pjson.version)
  .description(pjson.description)
  .option('-f, --format [type]', 'output format')
  .arguments('<path1> <path2>')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2, program.format));
  });

export default () => program.parse(process.argv);
