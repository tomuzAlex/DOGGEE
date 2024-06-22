import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.scss';
import { Input } from '@common/fields/inputs';
import { useOnCLickOutside } from '@common/fields/inputs/DateInput';
import selectSvg from '@static/images/selectArrow.svg';
import { PetList } from '@pages/PersonalAccount/PetsList';

export const options = [
  {
    label: 'test',
    value: 'test',
    option: 'test',
  },
  {
    label: 'apple',
    value: 'apple',
    option: 'apple',
  },
  {
    label: 'orange',
    value: 'orange',
    option: 'orange',
  },
];

interface SelectIProps extends Omit<InputProps, 'value'> {
  value: string;
}

interface Option {
  label: string;
  value: string;
  option: string;
}

export const Select: React.FC<SelectIProps> = ({
  isError = false,
  helperText,
  type,
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange,
  value,
  ...props
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectRef = useRef<HTMLInputElement>(null);
  useOnCLickOutside(selectRef, () => {
    setShowSelect(false);
  });

  useEffect(() => {
    if (isFocus) setShowSelect(true);

    return () => {
      setShowSelect(false);
    };
  }, [selectValue, isFocus]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex === 0 ? options.length - 1 : prevIndex - 1));
    } else if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex === options.length - 1 ? 0 : prevIndex + 1));
    } else if (event.key === 'Enter') {
      handleOptionClick(options[selectedIndex]);
    }
  };

  const handleOptionClick = (option: Option) => {
    setShowSelect(false);
    setIsFocus(false);
    setSelectValue(option.value);
  };

  return (
    <div className={styles.select} onClick={() => setIsFocus(!isFocus)}>
      <label className={''}></label>
      <Input
        ref={selectRef}
        className={`${styles.input}`}
        label={label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectValue(e.target.value)}
        onKeyDown={handleKeyDown}
        type={type}
        isError={isError}
        helperText={helperText}
        value={selectValue}
        {...props}
      />
      <img
        onClick={() => {
          setSelectValue('');
          setShowSelect(!showSelect);
        }}
        src={selectSvg}
        alt={'select'}
        style={{ transform: !showSelect ? 'rotate(180deg)' : 'rotate(0deg)' }}
        className={styles.selectSvg}
      />
      {showSelect && (
        <div className={styles.option}>
          {options
            .filter((option) => option.label.toLowerCase().includes(selectValue.toLowerCase()))
            .map((option, index) => (
              <div
                className={styles.option_container}
                key={option.value}
                onClick={() => handleOptionClick(option)}
                style={{
                  backgroundColor:
                    index === selectedIndex
                      ? 'var(--color-additional7)'
                      : 'var(--color-additional)',
                }}
              >
                {showSelect && option.label}
              </div>
            ))}
        </div>
      )}
      <div className={styles.hidden}>
        <PetList dogBreed={selectValue} />
      </div>
    </div>
  );
};
