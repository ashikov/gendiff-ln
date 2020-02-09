const jsonRender = (ast) => {
  const result = JSON.stringify(ast, (key, value) => {
    if (typeof value === 'number') {
      return String(value);
    }

    return value;
  }, 2);

  return result;
};

export default jsonRender;
