import fs from 'fs';
import genDiff from '..';

const prefix = `${__dirname}/../__fixtures__`;

const files = [
  [`${prefix}/before.json`, `${prefix}/after.json`],
  [`${prefix}/before.yml`, `${prefix}/after.yml`],
  [`${prefix}/before.ini`, `${prefix}/after.ini`],
];

describe.each(files)('diff', (file1, file2) => {
  const resultDefault = fs.readFileSync(`${prefix}/resultDefault.txt`, 'utf-8');
  const resultPlain = fs.readFileSync(`${prefix}/resultPlain.txt`, 'utf-8');
  const resultJSON = fs.readFileSync(`${prefix}/resultJSON.txt`, 'utf-8');

  test('default', () => {
    expect(genDiff(file1, file2)).toEqual(resultDefault);
  });

  test('plain', () => {
    expect(genDiff(file1, file2, 'plain')).toEqual(resultPlain);
  });

  test('json', () => {
    expect(genDiff(file1, file2, 'json')).toEqual(resultJSON);
  });
});
