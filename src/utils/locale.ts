import { formatMessage } from '@umijs/max';
import capitalize from 'lodash-es/capitalize';

type MessageDescriptor = {
  id?: TranKey;
  description?: string | object;
  defaultMessage?: string;
};

type Namespaced<T> = {
  [P in keyof T & string as `${P}`]: T[P];
};

/**
 * Translate message
 * @param descriptor - message descriptor
 * @param values - values for placeholders in the message
 */
export const t = (
  descriptor: MessageDescriptor | TranKey,
  values?: Partial<Namespaced<Record<string, any>>>,
) => {
  const id =
    (descriptor as any)?.id || typeof descriptor === 'string' ? descriptor : '';

  // formatMessage is deprecated because it requires browser reload when change the language,
  // but our case we need to reload to make server get new language
  return formatMessage(
    {
      defaultMessage:
        capitalize(id as string)
          ?.split('.')
          .pop()
          ?.replaceAll('_', ' ') || '', // default message from the last id text and replace all _ with spaces
      ...(descriptor as any),
      id,
    },
    //@ts-ignore
    values?.[id] || {},
  );
};
