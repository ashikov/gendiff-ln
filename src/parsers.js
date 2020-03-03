import yaml from 'js-yaml';
import ini from 'ini';
import { isNaN } from 'lodash';

const isNumeric = (value) => {
  if (typeof value === 'boolean') {
    return false;
  }

  const convertedValue = +value;

  if (isNaN(convertedValue)) {
    return false;
  }

  return true;
};

const iniParser = (data) => {
  const jsonString = JSON.stringify(ini.parse(data));

  const parsed = JSON.parse(jsonString, (_k, v) => (isNumeric(v) ? Number(v) : v));

  return parsed;
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: iniParser,
};

export default (format, data) => parsers[format](data);
