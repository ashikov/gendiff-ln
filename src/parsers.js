import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

const parsers = {
  json: ((file) => JSON.parse(file)),
  yml: ((file) => yaml.safeLoad(file)),
  ini: ((file) => ini.parse(file)),
};

const parser = (pathToFile) => {
  const extension = path.extname(pathToFile).substr(1);
  const rawFile = fs.readFileSync(pathToFile, 'utf-8');

  return parsers[extension](rawFile);
};

export default parser;
