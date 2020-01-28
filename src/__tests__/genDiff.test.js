import fs from 'fs';
import genDiff from '..';

const prefix = `${__dirname}/../__fixtures__`;

describe.each([
  [`${prefix}/before.json`, `${prefix}/after.json`],
])('testGenDiff', (file1, file2) => {
  const result = fs.readFileSync(`${prefix}/result.txt`, 'utf-8');

  test('returns diff\n', () => {
    expect(genDiff(file1, file2)).toEqual(result);
  });
});
