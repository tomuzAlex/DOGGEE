import React from 'react';
import { PetItem } from './PetItem';
import styles from './PetList.module.scss';

import plusSvg from '@static/images/plus_additional.svg';

interface PetFormProps {
  dogName?: string;
  dogWeight?: string;
  breed?: unknown;
  dogBirtDay?: Date;
  id?: string;
}

interface PetListProps {
  pets?: PetFormProps[];
  dogName?: string;
  dogWeight?: string;
  dogBreed?: string;
}
export const PetList: React.FC<PetListProps> = ({ dogName, dogWeight, dogBreed }) => {
  const [selectedPetId, setSelectedPetId] = React.useState<PetFormProps['id'] | undefined>(
    undefined,
  );
  const [pets, setPets] = React.useState([
    {
      dogName: 'Шарик',
      dogWeight: '5',
      breed: 'Jindo',
      dogBirtDay: new Date('2004-09-03'),
      id: '0',
    },
    {
      dogName: 'letter',
      dogWeight: '5',
      breed: 'Rubio',
      dogBirtDay: new Date('2010-09-03'),
      id: '1',
    },
    {
      dogName: 'iter',
      dogWeight: '5',
      breed: 'Jindo',
      dogBirtDay: new Date('2014-09-03'),
      id: '2',
    },
  ]);

  const addPet = () => {
    setPets([
      ...pets,
      {
        dogName: '',
        dogWeight: '',
        breed: '',
        dogBirtDay: new Date('2004-09-03'),
        id: pets.length.toString(),
      },
    ]);
  };

  const deletePet = (id: string) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
  };

  // const pet = [`${dogName}`]
  return (
    <div className={styles.list}>
      <div className={styles.title}>Your pets</div>
      {pets.map((pet, i) => (
        <div key={i} onClick={() => setSelectedPetId(pet.id)}>
          <PetItem
            pet={pet}
            onDelete={deletePet}
            selectedPetId={selectedPetId}
            setSelectedPetId={setSelectedPetId}
            username={dogName}
            weight={dogWeight}
            breed={dogBreed}
          />
        </div>
      ))}
      <div className={styles.line}></div>
      <div className={styles.add_pet} onClick={addPet}>
        <img className={styles.add_pet_plus} src={plusSvg} alt="Добавить питомца" />
        Add another pet
      </div>
    </div>
  );
};
