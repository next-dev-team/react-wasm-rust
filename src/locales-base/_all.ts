import { getMenuKey } from '@/utils/obj';
import common from './common';
import component from './component';
import menu from './menu';

/**
 *  Translates value type suggestions to avoid wrong parameters
 *  @example
 *  t('welcome', { name: 'sila', days: 'Monday' })
 */
export const allTranslation = (langKey: LangKey) => {
  return {
    ...getMenuKey(langKey, common),
    ...getMenuKey(langKey, menu),
    ...getMenuKey(langKey, component),
  };
};
