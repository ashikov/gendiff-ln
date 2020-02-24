const stringify = (value) => {
  if (typeof value === 'number') {
    return String(value);
  }

  return value;
};

const jsonRender = (ast) => {
  const result = JSON.stringify(ast, (key, value) => stringify(value), 2);

  return result;
};

export default jsonRender;
