import React from 'react';
import { IntlContext } from './index';
import type { IntlContextProps } from './index';

interface IntlProviderProps extends IntlContextProps {
  children: React.ReactNode;
}

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, message, children }) => {
  return <IntlContext.Provider value={{ locale, message }}>{children}</IntlContext.Provider>;
};
