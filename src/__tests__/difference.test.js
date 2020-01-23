import difference from '../difference';

test('difference', () => {
  const path1 = '../assets/before.json';
  const path2 = '../assets/after.json';

  const expected = `{
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
    - follow: false
  }`;

  expect(difference(path1, path2)).toEqual(expected);
});
