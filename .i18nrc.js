// https://www.npmjs.com/package/@lobehub/i18n-cli
const { defineConfig } = require('@lobehub/i18n-cli');
const {
  langs,
  defaultLang,
  baseTranslate,
} = require('./script/locale-config.json');

const outputLocales = langs.filter((lang) => lang !== baseTranslate);
const localePath = './src/locales';

module.exports = defineConfig({
  entry: `${localePath}/${baseTranslate}.json`,
  entryLocale: defaultLang,
  output: 'src/locales',
  entryExtension: '.json',
  outputLocales,
  jsonMode: true,
});
