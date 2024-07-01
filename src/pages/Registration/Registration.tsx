import React from 'react';
import styles from './Registration.module.scss';
import { PasswordRules } from './PasswordRules';
import { Link, useNavigate } from 'react-router-dom';

import { IntlText } from '@features/I18n';
import { useTheme } from '@features/theming';

import { Input, PasswordInput, Button } from '@common/fields';

import { useForm } from '@utils/hooks';
import axios from 'axios';

export const validateFormEmpty = (value: string) => {
  if (!value) {
    return 'Field required';
  }
  return null;
};

export const validatePassword = (password: string) => {
  const errors = [];
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  return errors.length ? errors.join(', ') : null;
};

export const validatePasswordsMatch = (password: string, passwordAgain: string) => {
  return password !== passwordAgain ? 'Passwords do not match' : null;
};

export const validateForm = (values: RegistrationFormValues) => {
  return {
    username: validateFormEmpty(values.username),
    password: validatePassword(values.password),
    passwordAgain: validatePasswordsMatch(values.password, values.passwordAgain),
  };
};

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
  dateInput: string;
  select: string;
}

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { values, setFieldValue, handleSubmit } = useForm<RegistrationFormValues>({
    initialValue: {
      username: '',
      password: '',
      passwordAgain: '',
      select: '',
      dateInput: '',
    },
    validate: validateForm,
    onSubmit: async (values) => {
      try {
        await axios.post('https://66147b222fc47b4cf27c6734.mockapi.io/users', {
          username: values.username,
          password: values.password,
        });
        navigate('/PersonalAccount');
      } catch (error) {
        console.error('Registration failed:', error);
        setFormError({
          ...formError,
          username: 'Registration failed, please try again',
        });
      }
    },
  });

  const [formError, setFormError] = React.useState<{ [key: string]: string | null }>({
    username: null,
    password: null,
    passwordAgain: null,
    dateInput: null,
    select: null,
  });
  const regex = /^[a-zA-Z0-9]+$/g;

  const checkValues = !!(values.username && values.password && values.passwordAgain);

  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>change theme</button>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.container_form}>
            <h1 className={styles.container_form_title}>Fill your login and password</h1>
            <form className={styles.inputSection} onSubmit={handleSubmit}>
              <div className={styles.input}>
                <Input
                  label="Username"
                  mask={regex}
                  type="text"
                  value={values.username}
                  isError={!!formError.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const username = e.target.value;
                    setFieldValue('username', username);

                    const error = validateFormEmpty(username);
                    setFormError({ ...formError, username: error });
                  }}
                  {...(!!formError.username && {
                    isError: !!formError.username,
                    helperText: formError.username,
                  })}
                />
                <PasswordInput
                  label="Password"
                  type="password"
                  mask={regex}
                  value={values.password}
                  isError={!!formError.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const password = e.target.value;
                    setFieldValue('password', password);

                    const error = validatePassword(password);
                    setFormError({ ...formError, password: error });
                  }}
                  {...(!!formError.password && {
                    isError: !!formError.password,
                    helperText: formError.password,
                  })}
                />
                <PasswordInput
                  label="Password Again"
                  type="password"
                  mask={regex}
                  value={values.passwordAgain}
                  isError={!!formError.passwordAgain}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const passwordAgain = e.target.value;
                    setFieldValue('passwordAgain', passwordAgain);

                    const error = validatePasswordsMatch(values.password, passwordAgain);
                    setFormError({ ...formError, passwordAgain: error });
                  }}
                  {...(!!formError.passwordAgain && {
                    isError: !!formError.passwordAgain,
                    helperText: formError.passwordAgain,
                  })}
                />
              </div>
              <div>
                <Button className={styles.button_done} type="submit" disabled={!checkValues}>
                  <IntlText path="button.done" />
                </Button>
              </div>
            </form>
          </div>
          <div className={styles.container_panel}>
            <div className={styles.title}>DOGGEE</div>
            <div className={styles.content}>
              <PasswordRules
                password={values.password}
                passwordAgain={values.passwordAgain}
                hasPasswordError={!!formError?.password}
              />
            </div>
            <div className={styles.haveAccount}>
              <Link to="/">
                <IntlText path="page.registration.IhaveAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
