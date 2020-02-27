import elegantRender from './elegantRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const formatters = {
  default: elegantRender,
  plain: plainRender,
  json: jsonRender,
};

export default (format) => formatters[format];
