import React from 'react';
import { ThemeContext } from './ThemeContext';
import { ThemeContextProps } from './ThemeContext';
import darkTheme from '@static/theme/dark/dark.module.css';
import lightTheme from '@static/theme/light/light.module.css';

type IntlProviderProps = ThemeContextProps & {
  children: React.ReactNode;
};

export const ThemProvider: React.FC<IntlProviderProps> = ({ theme, children }) => {
  const [currentTheme, setTheme] = React.useState(theme);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <div className={currentTheme === 'light' ? lightTheme.conteiner : darkTheme.conteiner}>
        {children}
      </div> 
    </ThemeContext.Provider>
  );
};
