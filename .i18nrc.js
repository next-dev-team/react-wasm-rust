const { defineConfig } = require('@lobehub/i18n-cli');
const { langs, defaultLang } = require('./script/locale-config.json');

module.exports = defineConfig({
  entry: `./temp.json`,
  entryLocale: defaultLang,
  output: 'src/locales',
  entryExtension: '.json',
  outputLocales: langs,
});
