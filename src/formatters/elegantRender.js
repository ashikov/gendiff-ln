import { isObject } from 'lodash';

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

const elegantRender = (ast) => {
  const iter = (tree, offset) => {
    const getString = {
      saved: (node, level) => `    ${node.name}: ${stringify(node.value, level + 1)}`,
      added: (node, level) => `  + ${node.name}: ${stringify(node.value, level + 1)}`,
      deleted: (node, level) => `  - ${node.name}: ${stringify(node.value, level + 1)}`,
      updated: (node, level) => `  - ${node.name}: ${stringify(node.oldValue, level + 1)}\n`
        + `${ident.repeat(level)}  + ${node.name}: ${stringify(node.newValue, level + 1)}`,
      hasChildren: (node, level) => `    ${node.name}: ${iter(node.children, level + 1)}`,
    };

    const result = tree.map((node) => `${ident.repeat(offset)}${getString[node.status](node, offset)}`);

    return ['{', ...result, `${ident.repeat(offset)}}`].join('\n');
  };

  return iter(ast, 0);
};

export default elegantRender;
