import * as fs from 'fs';
import * as path from 'path';
import { allTranslation } from '../src/locales-base/_all';
import { baseTranslate, filetype } from './locale-config.json';

import removeLocale from './locale-remove';

const mergeLocale = (locale: string) => {
  const localeBasePath = path.resolve(
    __dirname,
    `../src/locales-base/${locale}.${filetype}`,
  );
  const localePath = path.resolve(
    __dirname,
    `../src/locales/${locale}.${filetype}`,
  );
  let localeContent: string;
  try {
    localeContent = fs.readFileSync(localePath, 'utf8');
  } catch (error) {
    console.error(`Error when reading ${localePath}, skipping merge.`, error);
    return;
  }
  const baseContent = allTranslation(locale);
  const merged = Object.assign({ ...baseContent }, JSON.parse(localeContent));

  try {
    fs.writeFileSync(localeBasePath, JSON.stringify(baseContent, null, 2));
    fs.writeFileSync(localePath, JSON.stringify(merged, null, 2));
  } catch (error) {
    console.error(`Error when creating ${localePath}`, error);
  }
};

removeLocale().then(() => {
  for (const lang of [baseTranslate]) {
    mergeLocale(lang);
  }
});
