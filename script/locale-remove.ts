import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { langs } from './locale-config.json';

const localeDir = path.resolve(__dirname, '../src/locales');

const removeLocales = async () => {
  const jsonFiles = glob.sync(path.join(localeDir, '*.json'));
  for (const file of jsonFiles) {
    const lang = path.basename(file, '.json');
    if (!langs.includes(lang)) {
      try {
        await fs.promises.unlink(file);
        console.log(`removed ${file}`);
      } catch (error) {
        console.error(`Error when removing ${file}`, error);
      }
    }
  }
};
// auto start
removeLocales()
  .then(() => {
    console.log('done');
  })
  .catch((error) => {
    console.error(error);
  });

export default removeLocales;
