import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return "'[complex value]'";
  }

  return value === `'${value}'` ? value : `'${value}'`;
};

const getPath = (path) => path.join('.');

const plainRender = (ast) => {
  const iter = (tree, pathToProperty) => {
    const getString = {
      saved: () => null,
      added: (node, fullPath) => `Property '${getPath(fullPath)}' was added with value ${stringify(node.value)}`,
      deleted: (node, fullPath) => `Property '${getPath(fullPath)}' was deleted`,
      updated: (node, fullPath) => (
        `Property '${getPath(fullPath)}' was changed from ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
      ),
      hasChildren: (node, fullPath) => `${iter(node.children, fullPath)}`,
    };

    const result = tree.map((node) => {
      const fullPath = [...pathToProperty, node.name];

      return getString[node.status](node, fullPath);
    });

    return result.filter((string) => string !== null).join('\n');
  };

  return iter(ast, []);
};

export default plainRender;
