import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './Select.module.scss';
import selectSvg from '@static/images/selectArrow.svg';
import { Input } from '@common/fields/inputs';
import { SelectContext } from './SelectContext';
import axios from 'axios';

interface SelectIProps extends Omit<InputProps, 'value'> {
  value: string;
}

interface Option {
  label: string;
  value: string;
}

export const Select: React.FC<SelectIProps> = ({
  isError = false,
  helperText,
  type,
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  ...props
}) => {
  const { selectValue, setSelectValue } = useContext(SelectContext);
  const [showSelect, setShowSelect] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectRef = useRef<HTMLInputElement>(null);

  const [breeds, setBreeds] = useState<Array<Option>>([]);
  const [userInput, setUserInput] = useState<string>(selectValue);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': 'YOUR_API_KEY',
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const breedOptions = response.data.map((breed: any) => ({
          label: breed.name,
          value: breed.id.toString(),
        }));
        setBreeds(breedOptions);
      } catch (error) {
        console.error('Failed to fetch breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectValue(option.label);
    setUserInput(option.label);
    setShowSelect(false);
    setIsFocus(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserInput(value);
    setSelectValue(value);
    setShowSelect(true);
  };

  const filteredBreeds = breeds.filter((breed) =>
    breed.label.toLowerCase().includes(userInput.toLowerCase()),
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'Enter':
        event.preventDefault();
        break;
    }

    switch (event.key) {
      case 'ArrowUp':
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredBreeds.length - 1,
        );
        break;
      case 'ArrowDown':
        setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredBreeds.length);
        break;
      case 'Enter':
        if (
          filteredBreeds.length > 0 &&
          selectedIndex >= 0 &&
          selectedIndex < filteredBreeds.length
        ) {
          handleOptionClick(filteredBreeds[selectedIndex]);
        }
        break;
    }
  };

  return (
    <div className={styles.select} onClick={() => setIsFocus(!isFocus)}>
      <Input
        ref={selectRef}
        className={`${styles.input}`}
        label={label}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type={type}
        isError={isError}
        helperText={helperText}
        value={userInput}
        {...props}
      />
      <img
        src={selectSvg}
        alt="Select arrow"
        onClick={() => setShowSelect(!showSelect)}
        className={styles.selectSvg}
        style={{ transform: showSelect ? 'rotate(0deg)' : 'rotate(180deg)' }}
      />
      {showSelect && (
        <div className={styles.option}>
          {filteredBreeds.map((breed, index) => (
            <div
              key={breed.value}
              className={styles.option_container}
              onClick={() => handleOptionClick(breed)}
              style={{
                backgroundColor:
                  index === selectedIndex ? 'var(--color-additional7)' : 'transparent',
              }}
            >
              {breed.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
