import fs from 'fs';
import genDiff from '..';

const pathPrefix = `${__dirname}/../__fixtures__/`;

describe.each([
  [`${pathPrefix}json/before1.json`, `${pathPrefix}json/after1.json`],
  [`${pathPrefix}yaml/before1.yml`, `${pathPrefix}yaml/after1.yml`],
  [`${pathPrefix}ini/before1.ini`, `${pathPrefix}ini/after1.ini`],
])('testGenDiff', (file1, file2) => {
  const result1 = fs.readFileSync(`${__dirname}/../__fixtures__/expected1`, 'utf-8');

  test(`returns\n${result1}\n`, () => {
    expect(genDiff(file1, file2)).toEqual(result1);
  });
});
