/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../PersonalAccount.module.scss';

import { Button } from '@common/fields';
import { Stepper } from '@common/wizard/Stepper';
import { useTheme } from '@features/theming';
import { IntlText } from '@features/I18n';
import { Link } from 'react-router-dom';

interface PersonalAccountInformationProps {
  username?: string;
  date?: string;
  weight?: string;
  breed?: string;
}

interface UserProfile {
  username: string;
  password: string;
  id: string;
}

interface Pet {
  username: string;
  dogName: string;
  dogWeight: string;
  breed: string;
  dogBirtDay: string;
  id: string;
}

export const PersonalAccountInformation: React.FC<PersonalAccountInformationProps> = () => {
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://66147b222fc47b4cf27c6734.mockapi.io/users/1'); // Replace with the correct endpoint and user ID
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchPetsData = () => {
      const storedPets = JSON.parse(localStorage.getItem('pets') || '[]');
      setPets(storedPets);
    };

    fetchProfileData();
    fetchPetsData();
  }, []);

  console.log(pets);

  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>change theme</button>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.container_form}>
            <h1 className={styles.container_form_title}>Let's Fill Your Profile</h1>
            <div className={styles.container_stepper}>
              <Stepper activeSteps={3} stepLabels={['Your profile', 'Your pets', 'WoOf!']} />
            </div>
            <div className={styles.goBackSection}>
              <Link to="/PersonalAccountPets">
                <button className={styles.goBack}>go back</button>
              </Link>
            </div>
            <div className={styles.personal_information}>
              <div className={styles.profile}>
                <div className={styles.profile_wrapper}>
                  <h2>Profile</h2>
                  <div className={styles.profile_container}>
                    <div>Your name</div>
                    <div>{profile ? profile.username : 'Loading...'}</div>
                  </div>
                  <div className={styles.profile_container}>
                    <div>Your password</div>
                    <div>{profile ? profile.password : 'Loading...'}</div>
                  </div>
                  <div className={styles.profile_container}>
                    <div>Your ID</div>
                    <div>{profile ? profile.id : 'Loading...'}</div>
                  </div>
                </div>
              </div>
              <div className={styles.pets}>
                <div className={styles.pets_wrapper}>
                  <h2>Pets</h2>
                  {pets.length > 0 ? (
                    pets.map((pet) => (
                      <div key={pet.id} className={styles.profile_container}>
                        <div>{pet.username}</div>
                        <div>
                          {pet.breed}
                          {pet.dogWeight} kg
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.profile_container}>
                      <div>Not found your pets</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button className={styles.button_done} type="submit">
              <IntlText path="button.done" />
            </Button>
          </div>
          <div className={styles.container_panel}>
            <div className={styles.title}>DOGGEE</div>
            <div className={styles.content}>
              <div className={styles.content_message}>
                Don't worry, you can change your <br /> details later
              </div>
            </div>
            <div className={styles.haveAccount}></div>
          </div>
        </div>
      </div>
    </>
  );
};
