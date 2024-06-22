import ru from '@static/locales/ru.json';
import en from '@static/locales/en-US.json';
const message = {
  ru: { 'button.signIn': 'Войти {test}' },
  'en-US': { 'button.signIn': 'Sign in {test}' },
};
export const getMessage = (locale: keyof typeof message) => {
  if (!locale) return ru;
  if (locale === 'en-US') {
    return en;
  } else {
    return ru;
  }
};
