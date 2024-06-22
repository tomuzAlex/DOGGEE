import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './PersonalAccount.module.scss';

import { useForm } from '@utils/hooks';

import { Button, Input } from '@common/fields';
import { Select } from '@common/fields/selects/Select';
import { DateInput } from '@common/fields/inputs/DateInput';
import { Stepper } from '@common/wizard/Stepper';

import { useTheme } from '@features/theming';
import { IntlText } from '@features/I18n';

import { validateLoginForm } from './PersonalAccount';
import { PetList } from './PetsList';
import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// временно


interface PersonalAccountStep2FormValues {
  username: string;
  dateInput: string;
  select: string;
  dogWeight: string;
}

interface PersonalAccountStep2Props {
  breed?: string;
}

export const PersonalAccountStep2: React.FC<PersonalAccountStep2Props> = ({ breed }) => {
  const { values, setFieldValue } = useForm<PersonalAccountStep2FormValues>({
    initialValue: {
      username: '',
      dateInput: '',
      select: '',
      dogWeight: '',
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

  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>change theme</button>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.container_form}>
            <h1 className={styles.container_form_title}>Lets Fill Your profile</h1>
            <div className={styles.container_stepper}>
              <Stepper activeSteps={3} stepLabels={['Your profile', 'Your pets', 'WoOf!']} />
            </div>
            <div className={styles.goBackSection}>
                <Link to="/PersonalAccount">
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
                <DateInput
                  label="Choose your date of birth"
                  type="text"
                  value={values.dateInput}
                  {...(!!formError.password && {
                    isError: !!formError.password,
                    helperText: formError.password,
                  })}
                />
                <Select
                  type="text"
                  label="Dog breed"
                  value={values.select}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const select = e.target.value;
                    setFieldValue('select', select);
                  }}
                />
                <Input
                  label="Dog weight"
                  mask={regex}
                  type="number"
                  value={values.dogWeight}
                  isError={!!formError.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const dogWeight = e.target.value;
                    setFieldValue('dogWeight', dogWeight);

                    const error = validateLoginForm('username', dogWeight);
                    setFormError({ ...formError, username: error });
                  }}
                  {...(!!formError.username && {
                    isError: !!formError.username,
                    helperText: formError.username,
                  })}
                />
              </div>
              <Button className={styles.button_done} type="submit">
                <IntlText path="button.next" />
              </Button>
            </form>
          </div>
          <div className={styles.container_panel}>
            <div className={styles.title}>DOGGEE</div>
            <div className={styles.content}>
              <PetList dogName={values.username} dogWeight={values.dogWeight} dogBreed={breed} />
            </div>
            <div className={styles.haveAccount}></div>
          </div>
        </div>
      </div>
    </>
  );
};
