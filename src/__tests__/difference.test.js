import fs from 'fs';
import genDiff from '../genDiff';

test('genDiff', () => {
  const path1 = `${__dirname}/../__fixtures__/caseOneBefore.json`;
  const path2 = `${__dirname}/../__fixtures__/caseOneAfter.json`;

  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/caseOneExpected`, 'utf-8');

  expect(genDiff(path1, path2)).toEqual(expected);
});
