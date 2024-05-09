import { promises as fs } from 'fs';
import * as glob from 'glob';
import * as path from 'path';

const scanTranslateFile = async () => {
  const pattern = path
    .resolve(__dirname, '../src/**/*.{ts,tsx}')
    .replace(/(\.d\.ts)$/, '');
  const files = glob.sync(pattern).filter((file) => !file.endsWith('.d.ts'));
  const result = await files.reduce(async (accP, file) => {
    const acc: any = await accP;
    const content = await fs.readFile(file, 'utf8');
    const matches = [...content.matchAll(/(?<!\w)t\([^)]*\)/g)];

    const keys = matches
      .map((match) => match[0].match(/t\(([^)]*)\)/)?.[1])
      .filter(Boolean) as string[];

    const obj = keys.reduce((acc2, cur) => {
      if (cur && cur.startsWith('../')) {
        return acc2;
      }
      const cleanAcc = cur.replace(/['"]/g, '');
      acc2[cleanAcc] = cleanAcc;
      console.log('[locale extract]:', cur);

      return acc2;
    }, {} as any);
    return { ...acc, ...obj };
  }, Promise.resolve());
  return result;
};

export const syncLocale = async () => {
  // start scan and write to file
  scanTranslateFile()
    .then((result) => {
      const jsonRes = JSON.stringify(result, null, 2);
      console.log('[locale sync]:', jsonRes);
      fs.writeFile(
        path.resolve(__dirname, '../temp.json'),
        jsonRes,
        'utf8',
      ).then(() => {
        console.log('done');
      });
    })
    .catch((error) => {
      console.error('scan error', error);
    });
};

syncLocale();
