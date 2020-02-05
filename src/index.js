import { has, union, isObject } from 'lodash';
// util for console.log objects
// import util from 'util';
import parser from './parsers';

const isChildren = (value1, value2) => isObject(value1) && isObject(value2);

const getAST = (object1, object2) => {
  const keysOfObj1 = Object.keys(object1);
  const keysOfObj2 = Object.keys(object2);
  const keys = union(keysOfObj1, keysOfObj2).sort();

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
          { name: key, status: 'updated', value: { valueBefore: value1, valueAfter: value2 } },
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

const ident = '    ';

const stringify = (value, offset) => {
  if (!isObject(value)) {
    return value;
  }

  const result = Object.keys(value).sort().map((key) => {
    const string = `    ${key}: ${stringify(value[key], offset + 1)}`;
    return `${ident.repeat(offset)}${string}`;
  });

  return `{\n${result.join('\n')}\n${ident.repeat(offset)}}`;
};

const render = (ast) => {
  const iter = (tree, offset) => {
    const getString = {
      saved: (node, level) => `    ${node.name}: ${stringify(node.value, level + 1)}`,
      added: (node, level) => `  + ${node.name}: ${stringify(node.value, level + 1)}`,
      deleted: (node, level) => `  - ${node.name}: ${stringify(node.value, level + 1)}`,
      updated: (node, level) => `  - ${node.name}: ${stringify(node.value.valueBefore, level + 1)}\n`
        + `${ident.repeat(level)}  + ${node.name}: ${stringify(node.value.valueAfter, level + 1)}`,
    };

    const result = tree.map((node) => {
      if (node.children !== undefined) {
        return `${ident.repeat(offset)}    ${node.name}: ${iter(node.children, offset + 1)}`;
      }

      return `${ident.repeat(offset)}${getString[node.status](node, offset)}`;
    });

    return ['{', ...result, `${ident.repeat(offset)}}`].join('\n');
  };

  return iter(ast, 0);
};

const genDiff = (path1, path2) => {
  const file1 = parser(path1);
  const file2 = parser(path2);

  const ast = getAST(file1, file2);
  // console.log(util.inspect(ast, { depth: 5 }));

  const string = render(ast);
  // console.log(string);
  return string;
};

export default genDiff;
