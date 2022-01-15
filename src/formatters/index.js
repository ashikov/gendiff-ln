import elegantRender from './elegantRender.js';
import plainRender from './plainRender.js';
import jsonRender from './jsonRender.js';

const formatters = {
  default: elegantRender,
  plain: plainRender,
  json: jsonRender,
};

export default (format) => formatters[format];
