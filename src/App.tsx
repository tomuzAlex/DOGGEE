import React from 'react';
import LoginPage from '@pages/LoginPage/LoginPage';

// I18N
import { IntlProvider } from '@features/I18n';
import { getLocale, getMessage } from '@utils/api/helpers';

// все стили для тем
import '@static/scss/global.module.scss';
import { ThemProvider } from '@features/theming';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from '@pages/Registration/Registration';
import NotFound from '@pages/NotFound/NotFound';
import {
  PersonalAccount,
  PersonalAccountPets,
  PersonalAccountInformation,
} from '@pages/PersonalAccount';
import { QueryClient, QueryClientProvider } from 'react-query';

import { DateProvider } from './common/fields/inputs/DateInput/DateInputContext';
import { SelectProvider } from '@common/fields/selects/Select';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const [theme, setTheme] = React.useState<Theme>('light');
  const userLocation = getLocale();
  const localMessage = getMessage(userLocation);

  return (
    <BrowserRouter>
      <ThemProvider theme={theme} setTheme={setTheme}>
        <DateProvider>
          <SelectProvider>
            <QueryClientProvider client={queryClient}>
              <IntlProvider locale={userLocation} message={localMessage}>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/personalAccount" element={<PersonalAccount />} />
                  <Route path="/personalAccountPets" element={<PersonalAccountPets />} />
                  <Route
                    path="/personalAccountInformation"
                    element={<PersonalAccountInformation />}
                  />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </IntlProvider>
            </QueryClientProvider>
          </SelectProvider>
        </DateProvider>
      </ThemProvider>
    </BrowserRouter>
  );
};

export default App;
