import React from 'react';
import { useIntl } from '../hooks/index';

interface IntlTextProps {
  path: string;
  values?: Record<string, string | number | boolean>;
  children?: React.ReactNode | ((message: string) => React.ReactNode);
}

export const IntlText: React.FC<IntlTextProps> = ({ path, values, children }) => {
  const intl = useIntl();
  const message = intl.translateMessages(path, values);



  if (children && typeof children === 'function') {
    console.log(children)
    return children(intl.translateMessages(path, values));
  };

  return message;

  // const regularTag = /<(\w+)>([^<]+)<\/\1>/g;
  // const replacedMessage = message.replace(regularTag, (tag: string, value: string, content: string) => {
  //   const replacement = values?.[content] ?? value;
  //   if (replacement) {
  //     return replacement;
  //   }
  // });
  // console.log(replacedMessage);
  // return replacedMessage
};
