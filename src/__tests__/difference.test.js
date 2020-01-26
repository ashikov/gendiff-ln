import fs from 'fs';
import getDifference from '../difference';

test('getDifference', () => {
  const path1 = `${__dirname}/../__fixtures__/caseOneBefore.json`;
  const path2 = `${__dirname}/../__fixtures__/caseOneAfter.json`;

  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/caseOneExpected`, 'utf-8');

  expect(getDifference(path1, path2)).toEqual(expected);
});
