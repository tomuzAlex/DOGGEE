import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PersonalAccount.module.scss';

import { useForm } from '@utils/hooks';

import { Button, Input } from '@common/fields';
import { DateContext, DateInput } from '@common/fields/inputs/DateInput';
import { Stepper } from '@common/wizard/Stepper';

import { useTheme } from '@features/theming';
import { IntlText } from '@features/I18n';

interface PersonalAccountFormValues {
  username: string;
  dateInput: string;
  select: string;
  dogWeight?: string;
  location: string;
}

export const validateFormEmpty = (value: string) => {
  if (!value) {
    return 'field required';
  }
  return null;
};
export const validateFormUsername = (username: string) => {
  return validateFormEmpty(username);
};
export const loginFormValidate = {
  username: validateFormUsername,
};
export const validateLoginForm = (name: 'username', value: string) => {
  return loginFormValidate[name](value);
};

export const PersonalAccount: React.FC = () => {
  const { values, setFieldValue } = useForm<PersonalAccountFormValues>({
    initialValue: {
      username: '',
      dateInput: '',
      location: '',
      select: '',
    },
  });
  const { theme, setTheme } = useTheme();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if all fields are valid
    const usernameError = validateLoginForm('username', values.username);
    if (usernameError) {
      return;
    }

    // Save user information to local storage
    localStorage.setItem(
      'user',
      JSON.stringify({
        username: values.username,
      }),
    );

    // Clear form values
    setFieldValue('username', '');
  };
  const [formError, setFormError] = React.useState<{ [key: string]: string | null }>({
    username: null,
    dateInput: null,
    select: null,
  });
  const regex = /^[a-zA-Z0-9]+$/g;

  const { dateInputValue } = React.useContext(DateContext)

  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>change theme</button>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.container_form}>
            <h1 className={styles.container_form_title}>Lets Fill Your profile</h1>
            <div className={styles.container_stepper}>
              <Stepper activeSteps={1} stepLabels={['Your profile', 'Your pets', 'WoOf!']} />
            </div>
            <div className={styles.goBackSection}>
              <Link to="/registration">
                <button className={styles.goBack}>go back</button>
              </Link>
            </div>

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
                <Input
                  label="Where are you from?"
                  mask={regex}
                  type="text"
                  value={values.location}
                  isError={!!formError.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const location = e.target.value;
                    setFieldValue('location', location);

                    const error = validateLoginForm('username', location);
                    setFormError({ ...formError, username: error });
                  }}
                  {...(!!formError.username && {
                    isError: !!formError.username,
                    helperText: formError.username,
                  })}
                />
                <DateInput
                  label="Choose your date of birth"
                  type="text"
                  value={dateInputValue}
      
                  {...(!!formError.password && {
                    isError: !!formError.password,
                    helperText: formError.password,
                  })}
                />
              </div>
              <Link to="/PersonalAccountPets">
                <Button className={styles.button_done} type="submit">
                  <IntlText path="button.next" />
                </Button>
              </Link>
            </form>
          </div>
          <div className={styles.container_panel}>
            <div className={styles.title}>DOGGEE</div>
            <div className={styles.content}>
              <div>We wnat to know your address so that</div>
              <div>We can suggest good places for walks</div>
              <div>with your pet, the nearest veterinary</div>
              <div> clinics, etc.</div>
            </div>
            <div className={styles.haveAccount}></div>
          </div>
        </div>
      </div>
    </>
  );
};
