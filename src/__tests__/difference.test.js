import fs from 'fs';
import genDiff from '../genDiff';

const cases = {
  json: {
    path1: `${__dirname}/../__fixtures__/json/before1.json`,
    path2: `${__dirname}/../__fixtures__/json/after1.json`,
    expected: fs.readFileSync(`${__dirname}/../__fixtures__/expected1`, 'utf-8'),
  },
  yaml: {
    path1: `${__dirname}/../__fixtures__/yaml/before1.yml`,
    path2: `${__dirname}/../__fixtures__/yaml/after1.yml`,
    expected: fs.readFileSync(`${__dirname}/../__fixtures__/expected1`, 'utf-8'),
  },
};

test('genDiff -> JSON', () => {
  expect(genDiff(cases.json.path1, cases.json.path2)).toEqual(cases.json.expected);
});

test('genDiff -> YAML', () => {
  expect(genDiff(cases.yaml.path1, cases.yaml.path2)).toEqual(cases.yaml.expected);
});
