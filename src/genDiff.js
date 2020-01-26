import _ from 'lodash';
import parser from './parsers';

const genDiff = (path1, path2) => {
  const file1 = parser(path1);
  const file2 = parser(path2);

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();

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

  const result = `{\n${keys.reduce(cb, '')}}`;

  return result;
};

export default genDiff;
