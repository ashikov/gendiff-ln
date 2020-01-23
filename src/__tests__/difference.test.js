import getDifference from '../difference';

test('getDifference', () => {
  const path1 = 'src/assets/before.json';
  const path2 = 'src/assets/after.json';

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  expect(getDifference(path1, path2)).toEqual(expected);
});
