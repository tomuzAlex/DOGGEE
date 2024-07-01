import React, { useContext, useEffect, useState } from 'react';
import { PetItem } from './PetItem';
import styles from './PetList.module.scss';

import plusSvg from '@static/images/plus_additional.svg';
import { DateContext } from '@common/fields/inputs/DateInput';
import { SelectContext } from '@common/fields/selects/Select';

interface PetFormProps {
  dogName: string;
  dogWeight: string;
  breed: string;
  dogBirtDay: Date;
  id: string;
}

interface PetListProps {
  pets?: PetFormProps[];
  dogName?: string;
  dogWeight?: string;
  dogBreed?: string;
}

export const PetList: React.FC<PetListProps> = ({ dogName, dogWeight }) => {
  const [selectedPetId, setSelectedPetId] = useState<PetFormProps['id'] | undefined>(undefined);
  const [pets, setPets] = useState<PetFormProps[]>([]);

  const [newPet, setNewPet] = useState<PetFormProps>({
    dogName: '',
    dogWeight: '',
    breed: '',
    dogBirtDay: new Date(),
    id: '',
  });

  useEffect(() => {
    // Retrieve pets from local storage
    const storedPets = JSON.parse(localStorage.getItem('pets') || '[]');
    setPets(storedPets);
  }, []);

  const addPet = () => {
    const petToAdd: PetFormProps = {
      ...newPet,
      id: Date.now().toString(),
    };
    const updatedPets = [...pets, petToAdd];
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));

    // Clear new pet fields
    setNewPet({
      dogName: '',
      dogWeight: '',
      breed: '',
      dogBirtDay: new Date(),
      id: '',
    });
  };

  const deletePet = (id: string) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
  };

  const { dateInputValue } = useContext(DateContext);
  const { selectValue } = useContext(SelectContext);

  return (
    <div className={styles.list}>
      <div className={styles.title}>Your pets</div>
      {pets.map((pet) => (
        <div key={pet.id} className={styles.petItem}>
          <PetItem
            pet={pet}
            breed={selectValue}
            username={dogName}
            weight={dogWeight}
            dogBirtDay={dateInputValue}
            id={pet.id}
            onDelete={deletePet}
            selectedPetId={selectedPetId}
            setSelectedPetId={setSelectedPetId}
          />
        </div>
      ))}
      <div className={styles.line}></div>
      <div className={styles.add_pet} onClick={addPet}>
        <img className={styles.add_pet_plus} src={plusSvg} alt="Add another pet" />
        Add another pet
      </div>
    </div>
  );
};
