import React, { useEffect, useState } from 'react';
import styles from './PetItem.module.scss';
import crossSvg from '@static/images/cross.svg';

interface Pet {
  dogName: string | undefined;
  dogWeight: string | undefined;
  breed: string | undefined;
  dogBirtDay: Date;
  id: string;
}

interface PetItemProps {
  pet: Pet;
  breed?: string;
  username?: string;
  dogBirtDay?: Date;
  weight?: string;
  id: string;
  onDelete?: (id: string) => void;
  selectedPetId?: Pet['id'];
  setSelectedPetId: (id: Pet['id']) => void;
}

export const PetItem: React.FC<PetItemProps> = ({
  pet,
  breed,
  username,
  weight,
  dogBirtDay,
  onDelete,
  selectedPetId,
  setSelectedPetId,
}) => {
  const calculateDogAge = (dogBirthDate: Date): number => {
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dogBirthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - dogBirthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dogBirthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const dogYears = dogBirtDay ? calculateDogAge(new Date(dogBirtDay)) : 0;
  const isSelected = pet.id === selectedPetId;

  const handleDelete = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, id: string) => {
    event.stopPropagation();
    onDelete && onDelete(id);
  };

  const [content, setContent] = useState('🐕 Woof!');

  useEffect(() => {
    if (selectedPetId === pet.id) {
      const resultContent = !username ? '🐕 Woof!' : `${username} - ${breed}, ${dogYears} years old., ${weight} kg`;
      setContent(resultContent);
    }
  }, [selectedPetId, username, breed, weight, pet.id, dogYears]);

  return (
    <div
      className={`${styles.pet} ${isSelected ? styles.selected : ''}`}
      onClick={() => setSelectedPetId(pet.id)}
    >
      {content}
      <div className={styles.actions}>
        {onDelete && (
          <img
            className={styles.crossSvg}
            onClick={(e: React.MouseEvent<HTMLImageElement>) => handleDelete(e, pet.id)}
            src={crossSvg}
            alt="Delete pet"
          />
        )}
      </div>
    </div>
  );
};
