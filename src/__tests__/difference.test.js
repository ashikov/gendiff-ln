import fs from 'fs';
import genDiff from '../genDiff';

describe('genDiffTest', () => {
  it('JSON', () => {
    const jsonFile1 = `${__dirname}/../__fixtures__/json/before1.json`;
    const jsonFile2 = `${__dirname}/../__fixtures__/json/after1.json`;
    const jsonResult1 = fs.readFileSync(`${__dirname}/../__fixtures__/expected1`, 'utf-8');

    expect(genDiff(jsonFile1, jsonFile2)).toEqual(jsonResult1);
  });

  it('YAML', () => {
    const yamlFile1 = `${__dirname}/../__fixtures__/yaml/before1.yml`;
    const yamlFile2 = `${__dirname}/../__fixtures__/yaml/after1.yml`;
    const yamlResult1 = fs.readFileSync(`${__dirname}/../__fixtures__/expected1`, 'utf-8');

    expect(genDiff(yamlFile1, yamlFile2)).toEqual(yamlResult1);
  });
});
