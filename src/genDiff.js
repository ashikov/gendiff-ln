import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';

const formatSelector = {
  json: ((file) => JSON.parse(file)),
  yaml: ((file) => yaml.safeLoad(file)),
};

const genDiff = (format, path1, path2) => {
  const lowerCaseFormat = format.toLowerCase();
  const rawFile1 = fs.readFileSync(path1);
  const rawFile2 = fs.readFileSync(path2);

  const file1 = formatSelector[lowerCaseFormat](rawFile1);
  const file2 = formatSelector[lowerCaseFormat](rawFile2);

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const allKeys = _.union(keys1, keys2).sort();

  const cb = (diff, key) => {
    const existKey1 = _.has(file1, key);
    const existKey2 = _.has(file2, key);
    const value1 = file1[key];
    const value2 = file2[key];

    if (existKey1 === true && existKey2 === true && value1 === value2) {
      return `${diff}    ${key}: ${value1}\n`;
    }
    if (existKey1 === true && existKey2 === true) {
      return `${diff}  + ${key}: ${value2}\n  - ${key}: ${value1}\n`;
    }
    if (existKey2 === true) {
      return `${diff}  + ${key}: ${value2}\n`;
    }

    return `${diff}  - ${key}: ${value1}\n`;
  };

  const result = `{\n${allKeys.reduce(cb, '')}}`;

  return result;
};

export default genDiff;
