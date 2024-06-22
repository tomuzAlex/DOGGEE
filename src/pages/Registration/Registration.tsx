import React from 'react';
import styles from './Registration.module.scss';
import { PasswordRules } from './PasswordRules';
import { Link } from 'react-router-dom';

import { IntlText } from '@features/I18n';
import { useTheme } from '@features/theming';

import { Input, PasswordInput, Button } from '@common/fields';

import { useForm } from '@utils/hooks';

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
  passwordAgain: validateFormPassword,
};
export const validateLoginForm = (
  name: 'username' | 'password' | 'passwordAgain',
  value: string,
) => {
  return loginFormValidate[name](value);
};

export interface FormValue {
  username: string;
  password: string;
  isNotMyComputer: boolean;
}

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
  dateInput: string;
  select: string;
}

export const Registration: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { values, setFieldValue } = useForm<RegistrationFormValues>({
    initialValue: {
      username: '',
      password: '',
      passwordAgain: '',
      select: '',
      dateInput: '',
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if all fields are valid
    const usernameError = validateLoginForm('username', values.username);
    const passwordError = validateLoginForm('password', values.password);
    const passwordAgainError = validateLoginForm('passwordAgain', values.passwordAgain);

    if (usernameError || passwordError || passwordAgainError) {
      return;
    }

    // Save user information to local storage
    localStorage.setItem(
      'user',
      JSON.stringify({
        username: values.username,
        password: values.password,
        passwordAgain: values.passwordAgain,
      }),
    );

    // Clear form values

    // setFieldValue('passwordAgain', '');
    // setFieldValue('password', '');
    // setFieldValue('username', '');
  };

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

                    const error = validateLoginForm('username', username);
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

                    const error = validateLoginForm('password', password);
                    setFormError({ ...formError, password: error });
                  }}
                  {...(!!formError.password && {
                    isError: !!formError.password,
                    helperText: formError.password,
                  })}
                />
                <PasswordInput
                  label="Password"
                  type="password"
                  mask={regex}
                  value={values.passwordAgain}
                  isError={!!formError.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const password = e.target.value;
                    setFieldValue('passwordAgain', password);

                    const error = validateLoginForm('password', password);
                    setFormError({ ...formError, password: error });
                  }}
                  {...(!!formError.password && {
                    isError: !!formError.password,
                    helperText: formError.password,
                  })}
                />
              </div>
              <div>
                {checkValues ? (
                  <Link to="/personalAccount">
                    <Button className={styles.button_done} type="submit">
                      <IntlText path="button.done" />
                    </Button>
                  </Link>
                ) : (
                  <Button className={styles.button_done} type="submit">
                    <IntlText path="button.done" />
                  </Button>
                )}
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
              <Link to="/login">
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
