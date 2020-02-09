import { has, union, isObject } from 'lodash';

import render from './formatters';
import parser from './parsers';

const isChildren = (value1, value2) => isObject(value1) && isObject(value2);

const getAST = (object1, object2) => {
  const keys = union(Object.keys(object1), Object.keys(object2)).sort();

  return keys.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (has(object1, key) && has(object2, key)) {
      if (value1 === value2) {
        return [...acc,
          { name: key, status: 'saved', value: value1 },
        ];
      }
      if (isChildren(value1, value2)) {
        return [...acc,
          { name: key, children: getAST(value1, value2) },
        ];
      }
      if (value1 !== value2) {
        return [...acc,
          { name: key, status: 'updated', value: { before: value1, after: value2 } },
        ];
      }
    }
    if (!has(object1, key) && has(object2, key)) {
      return [...acc,
        { name: key, status: 'added', value: value2 },
      ];
    }

    return [...acc,
      { name: key, status: 'deleted', value: value1 },
    ];
  }, []);
};

const genDiff = (path1, path2, format = 'default') => {
  const file1 = parser(path1);
  const file2 = parser(path2);

  const ast = getAST(file1, file2);

  return render[format](ast);
};

export default genDiff;
