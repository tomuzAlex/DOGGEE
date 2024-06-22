import React from 'react';

export interface IntlContextProps {
  locale: string;
  message: Record<string, any>;
}

export const IntlContext: React.Context<IntlContextProps> = React.createContext({ locale: 'en', message: {} });
