import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LoginPage.module.scss';

import { Checkbox, Input, Button, PasswordInput } from '@common/fields';
import { useForm } from '@utils/hooks';

import { IntlText } from '@features/I18n';
import { useTheme } from '@features/theming';
import axios from 'axios';
import { useQuery } from 'react-query';

// работа с валидацией инпутов
export const validateFormEmpty = (value: string) => {
  if (!value) {
    return 'field required';
  }
  return null;
};
export const validateFormUsername = (username: string) => {
  return validateFormEmpty(username);
};
export const validateFormPassword = (pass: string) => {
  return validateFormEmpty(pass);
};
export const loginFormValidate = {
  username: validateFormUsername,
  password: validateFormPassword,
};
export const validateLoginForm = (name: 'username' | 'password', value: string) => {
  return loginFormValidate[name](value);
};

export interface FormValue {
  username: string;
  password: string;
  isNotMyComputer: boolean;
}

const LoginPage: React.FC = () => {
  const { values, setFieldValue, handleSubmit } = useForm<FormValue>({
    initialValue: { username: '', password: '', isNotMyComputer: true },
    validateSchema: loginFormValidate,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(values);
  const { theme, setTheme } = useTheme();
  const [formError, setFormError] = React.useState<{ [key: string]: string | null }>({
    username: null,
    password: null,
  });
  const regex = /^[a-zA-Z0-9]+$/g;

  const fetchRequest = async () => {
    const { data } = await axios.get('https://66147b222fc47b4cf27c6734.mockapi.io/users');
    return data;
  };

  const { data, isError, isLoading } = useQuery('users', fetchRequest);

  if (isError) {
    return <div>Произошла какая-то ошибка при получении данных</div>;
  }

  console.log(data);
  return (
    <>
      <span>
        <button
          className={styles.theme_button}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Change theme
        </button>
      </span>

      <div className={styles.globalConteiner}>
        <div className={styles.conteiner}>
          <div className={styles.title}>DOGGEE</div>
          <form className={styles.inputSection} onSubmit={handleSubmit}>
            <div className={styles.input}>
              <Input
                disabled={false} // CHANGE
                mask={regex}
                helperText="validation"
                value={values.username}
                label="Username"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const username = e.target.value;
                  setFieldValue('username', username);

                  const error = validateLoginForm('username', username);
                  setFormError({ ...formError, username: error });
                }}
                {...(!!formError.username && {
                  isError: !!formError.username,
                  helperText: formError.username,
                })}
              />
            </div>
            <div className={styles.input}>
              <PasswordInput
                disabled={false}
                mask={regex}
                value={values.password}
                type="password"
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const password = e.target.value;
                  setFieldValue('password', password);

                  const error = validateLoginForm('password', password);
                  setFormError({ ...formError, password: error });
                }}
                {...(!!formError.password && {
                  isError: !!formError.password,
                  helperText: formError.password,
                })}
              />
              <div>
                <Checkbox
                  checked={values.isNotMyComputer}
                  label="This is not my device"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const isNotMyComputer = e.target.checked;
                    setFieldValue('isNotMyComputer', isNotMyComputer);
                  }}
                />
              </div>
            </div>
            <div>
              <Link to="/PersonalAccount">
                <Button isLoading={isLoading} type="submit">
                  <IntlText path="button.signIn" />
                </Button>
              </Link>
            </div>
          </form>
          <div className={styles.footer}>
            <Link to="/registration">
              <IntlText path="page.login.CreateNewAccount" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
