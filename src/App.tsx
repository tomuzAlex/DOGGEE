import React from 'react';
import LoginPage from '@pages/LoginPage/LoginPage';

// I18N
import { IntlProvider } from '@features/I18n';
import { getLocale, getMessage } from '@utils/api/helpers';

// все стили для тем

import './App.module.scss';
import '@static/scss/global.module.scss';
import { ThemProvider } from '@features/theming';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from '@pages/Registration/Registration';

import NotFound from '@pages/NotFound/NotFound';

import { PersonalAccount, PersonalAccountStep2 } from '@pages/PersonalAccount';



import { QueryClient, QueryClientProvider} from 'react-query';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const [theme, setTheme] = React.useState<Theme>('light');
  const userLocation = getLocale();
  const localMessage = getMessage(userLocation);

  return (
    <BrowserRouter>
      <ThemProvider theme={theme} setTheme={setTheme}>
        <QueryClientProvider client={queryClient}>
          <IntlProvider locale={userLocation} message={localMessage}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/personalAccount" element={<PersonalAccount />} />
              <Route path="/personalAccountStep2" element={<PersonalAccountStep2 />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </IntlProvider>
        </QueryClientProvider>
      </ThemProvider>
    </BrowserRouter>
  );
};

export default App;
