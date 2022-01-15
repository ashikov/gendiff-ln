import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import render from './formatters/index.js';
import parse from './parsers.js';

const hasChildren = (value1, value2) => _.isObject(value1) && _.isObject(value2);

const getAST = (object1, object2) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2)).sort();

  return keys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (_.has(object1, key) && _.has(object2, key)) {
      if (value1 === value2) {
        return { name: key, status: 'saved', value: value1 };
      }
      if (hasChildren(value1, value2)) {
        return { name: key, status: 'hasChildren', children: getAST(value1, value2) };
      }
      if (value1 !== value2) {
        return {
          name: key, status: 'updated', oldValue: value1, newValue: value2,
        };
      }
    }
    if (!_.has(object1, key) && _.has(object2, key)) {
      return { name: key, status: 'added', value: value2 };
    }

    return { name: key, status: 'deleted', value: value1 };
  }, []);
};

const getFileExtension = (pathToFile) => path.extname(pathToFile).substr(1);

const genDiff = (path1, path2, format = 'default') => {
  const data1 = parse(getFileExtension(path1), fs.readFileSync(path1, 'utf-8'));
  const data2 = parse(getFileExtension(path2), fs.readFileSync(path2, 'utf-8'));

  const ast = getAST(data1, data2);

  return render(format)(ast);
};

export default genDiff;
