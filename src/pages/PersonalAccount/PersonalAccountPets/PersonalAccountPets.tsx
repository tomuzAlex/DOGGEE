/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from '../PersonalAccount.module.scss';

import { useForm } from '@utils/hooks';

import { Button, Input } from '@common/fields';
import { Select } from '@common/fields/selects/Select';
import { DateInput } from '@common/fields/inputs/DateInput';
import { Stepper } from '@common/wizard/Stepper';

import { useTheme } from '@features/theming';
import { IntlText } from '@features/I18n';

import { validateLoginForm } from '../PersonalAccount';
import { PetList } from '../PetsList';
import { Link, useNavigate } from 'react-router-dom';

import { SelectContext } from '@common/fields/selects/Select/SelectContext';
import { DateContext } from '@common/fields/inputs/DateInput';

interface PersonalAccountStep2FormValues {
  username: string;
  dateInput: string;
  select: string;
  dogWeight: string;
}

interface PersonalAccountStep2Props {
  breed?: string;
}

export const PersonalAccountPets: React.FC<PersonalAccountStep2Props> = () => {
  const navigate = useNavigate();

  const { values, setFieldValue } = useForm<PersonalAccountStep2FormValues>({
    initialValue: {
      username: '',
      dateInput: '',
      select: '',
      dogWeight: '',
    },
  });

  const { selectValue } = React.useContext(SelectContext);
  const { dateInputValue } = React.useContext(DateContext);
  const { theme, setTheme } = useTheme();

  const [formError, setFormError] = React.useState<{ [key: string]: string | null }>({
    username: null,
    dateInput: null,
    select: null,
  });

  const regex = /^[a-zA-Z0-9]+$/g;

  const validatePetForm = () => {
    const errors: { [key: string]: string | null } = {
      username: null,
      dateInput: null,
      select: null,
      dogWeight: null,
    };

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.dogWeight) {
      errors.dogWeight = 'Dog weight is required';
    }

    return errors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Validate fields
    const errors = validatePetForm();
  
    if (errors.username || errors.dogWeight) {
      setFormError(errors);
      return;
    }
  
    // Save pet information to local storage
    const petData = {
      id: Date.now().toString(), // Unique identifier
      username: values.username,
      dogWeight: values.dogWeight,
      breed: selectValue,
      dogBirtDay: dateInputValue,
    };
  
    // Retrieve existing pets from local storage
    const existingPets = JSON.parse(localStorage.getItem('pets') || '[]');
  
    // Add new pet to the list
    const updatedPets = [...existingPets, petData];
  
    // Save updated list to local storage
    localStorage.setItem('pets', JSON.stringify(updatedPets));
  
    // Clear the form
    setFieldValue('username', '');
    setFieldValue('dogWeight', '');
  
    navigate('/PersonalAccountInformation');
  };
  
  

  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>change theme</button>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.container_form}>
            <h1 className={styles.container_form_title}>Let's Fill Your Profile</h1>
            <div className={styles.container_stepper}>
              <Stepper activeSteps={2} stepLabels={['Your profile', 'Your pets', 'WoOf!']} />
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
                  value={dateInputValue}
                  isError={!!formError.dateInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const date = e.target.value;
                    setFieldValue('dateInput', date);
                  }}
                />
                <Select
                  label="Dog breed"
                  type='text'
                  value={selectValue}
                />
                <Input
                  label="Dog weight"
                  mask={regex}
                  type="number"
                  value={values.dogWeight}
                  isError={!!formError.dogWeight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const dogWeight = e.target.value;
                    setFieldValue('dogWeight', dogWeight);

                    const error = validateLoginForm('username', dogWeight);
                    setFormError({ ...formError, dogWeight: error });
                  }}
                  {...(!!formError.dogWeight && {
                    isError: !!formError.dogWeight,
                    helperText: formError.dogWeight,
                  })}
                />
              </div>
              <Button className={styles.button_done}>
                <IntlText path="button.next" />
              </Button>
            </form>
          </div>
          <div className={styles.container_panel}>
            <div className={styles.title}>DOGGEE</div>
            <div className={styles.content}>
              <PetList dogName={values.username} dogWeight={values.dogWeight}/>
            </div>
            <Link to='/PersonalAccountInformation' className={styles.haveAccount}>Skip this step</Link>
          </div>
        </div>
      </div>
    </>
  );
};
