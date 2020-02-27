import defaultRender from './elegantRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const formatters = {
  default: defaultRender,
  plain: plainRender,
  json: jsonRender,
};

export default (format) => formatters[format];
