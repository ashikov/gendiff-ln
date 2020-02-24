import fs from 'fs';
import genDiff from '../src';

const prefix = `${__dirname}/../__fixtures__`;
const getFullPath = (format, name) => `${prefix}/${name}.${format}`;

describe.each([
  ['json'],
  ['yml'],
  ['ini'],
])('diff', (format) => {
  const pathToFile1 = getFullPath(format, 'before');
  const pathToFile2 = getFullPath(format, 'after');

  const result = fs.readFileSync(`${prefix}/result.txt`, 'utf-8');
  const resultPlain = fs.readFileSync(`${prefix}/resultPlain.txt`, 'utf-8');
  const resultJSON = fs.readFileSync(`${prefix}/resultJSON.txt`, 'utf-8');

  test(`${format} to default`, () => {
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
  });

  test(`${format} to plain`, () => {
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(resultPlain);
  });

  test(`${format} to JSON`, () => {
    expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(resultJSON);
  });
});
