import fs from 'fs';
import genDiff from '../genDiff';

test('genDiff -> JSON', () => {
  const format = 'json';
  const path1 = `${__dirname}/../__fixtures__/json/before1.json`;
  const path2 = `${__dirname}/../__fixtures__/json/after1.json`;

  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/expected1`, 'utf-8');

  expect(genDiff(format, path1, path2)).toEqual(expected);
});

test('genDiff -> YAML', () => {
  const format = 'yaml';
  const path1 = `${__dirname}/../__fixtures__/yaml/before1.yml`;
  const path2 = `${__dirname}/../__fixtures__/yaml/after1.yml`;

  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/expected1`, 'utf-8');

  expect(genDiff(format, path1, path2)).toEqual(expected);
});
