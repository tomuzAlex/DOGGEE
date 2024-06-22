import React from 'react';
import { IntlContext } from '@features/I18n/context';

export const useIntl = () => {
  const intl = React.useContext(IntlContext);

  const translateMessages = (path: string, values?: Record<string, string | number | boolean>) => {
    if (!intl.message[path]) return path;
    if (!values) return intl.message[path];

    let translate = intl.message[path];
    for (const key in values) {
      if ({}.hasOwnProperty.call(values, key)) {
        translate = translate.replace(`{${key}}`, values[key]);
      }
    }
    return translate;
  };
  return {
    ...intl,
    translateMessages,
  };
};
