import fs from 'fs';
import genDiff from '..';

const prefix = `${__dirname}/../__fixtures__`;

describe.each([
  [`${prefix}/before.json`, `${prefix}/after.json`],
  [`${prefix}/before.yml`, `${prefix}/after.yml`],
  [`${prefix}/before.ini`, `${prefix}/after.ini`],
])('defaultFormat', (file1, file2) => {
  const result = fs.readFileSync(`${prefix}/result.txt`, 'utf-8');

  test('diff', () => {
    expect(genDiff(file1, file2)).toEqual(result);
  });
});
