import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parsers = {
  json: ((file) => JSON.parse(file)),
  yml: ((file) => yaml.safeLoad(file)),
};

const parser = (pathToFile) => {
  const extension = path.extname(pathToFile).substr(1);
  const rawFile = fs.readFileSync(pathToFile);

  return parsers[extension](rawFile);
};

export default parser;
