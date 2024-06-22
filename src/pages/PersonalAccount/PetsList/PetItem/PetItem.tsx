import React from 'react';
import styles from './PetItem.module.scss';
import crossSvg from '@static/images/cross.svg';

interface Pet {
  dogName: string;
  dogWeight: string;
  breed: React.ReactNode;
  dogBirtDay: Date;
  id: string;
}

interface PetItemProps {
  pet: Pet;
  username?: string | undefined;
  weight?: string | undefined;
  breed?: string | undefined;
  onDelete?: (id: string) => void;
  selectedPetId?: Pet['id'];
  setSelectedPetId: (id: Pet['id']) => void;
}

export const PetItem: React.FC<PetItemProps> = ({
  pet,
  onDelete,
  selectedPetId,
  setSelectedPetId,
  username,
  weight,
  breed,
}) => {
  const petYears = new Date().getFullYear() - pet.dogBirtDay.getFullYear();
  const isSelected = pet.id === selectedPetId; // Проверяем, выбран ли питомец

  let content = '🐕 WOof';
  if (selectedPetId === pet.id) {
    content = !username ? '🐕 WOof' : `${username} - ${breed}, ${petYears} y.o., ${weight} kg`;
  }
  if (!pet.dogName) {
    return (
      <div
        className={`${styles.pet} ${isSelected ? styles.selected : ''}`}
        onClick={() => {
          setSelectedPetId(pet.id);
        }}
      >
        {content}

        {onDelete && (
          <img
            className={styles.crossSvg}
            onClick={() => {
              onDelete(pet.id);
            }}
            src={crossSvg}
            alt="Удалить питомца"
          />
        )}
      </div>
    );
  }
  return (
    <div
      className={`${styles.pet} ${isSelected ? styles.selected : ''}`}
      onClick={() => {
        setSelectedPetId(pet.id);
      }}
    >
      {pet.dogName} - {pet.breed}, {petYears} y.o., {pet.dogWeight} kg
      {onDelete && (
        <img
          className={styles.crossSvg}
          onClick={() => {
            onDelete(pet.id);
          }}
          src={crossSvg}
          alt="Удалить питомца"
        />
      )}
    </div>
  );
};
