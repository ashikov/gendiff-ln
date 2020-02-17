import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: ((data) => JSON.parse(data)),
  yml: ((data) => yaml.safeLoad(data)),
  ini: ((data) => ini.parse(data)),
};

export default (format, data) => parsers[format](data);
