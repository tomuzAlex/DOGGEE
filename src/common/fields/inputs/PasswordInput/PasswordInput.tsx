import React from 'react';
import styles from '../input/Input.module.scss';

import showPasswordSvg from '@static/images/showPassword.svg';
import hidePasswordSvg from '@static/images/hiddenPassword.svg';
import { Input } from '../input/Input';

export const PasswordInput: React.FC<InputProps> = ({
  isError = false,
  helperText,
  type,
  onChange,
  mask,
  label,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordValue = type === 'password' && props.value; // если в инпуте есть значение, то показывать пароль

  const components = {
    indicator: () => (
      <div>
        {showPasswordValue && (
          <div
            className={styles.input_conteiner_toggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img className={styles.inputSvg} src={hidePasswordSvg} alt="скрыть пароль" />
            ) : (
              <img className={styles.inputSvg} src={showPasswordSvg} alt="показать пароль" />
            )}
          </div>
        )}
      </div>
    ),
  };

  return (
    <Input
      label={label}
      components={components}
      value={props.value}
      onChange={onChange}
      type={showPassword ? 'text' : 'password'}
      mask={mask}
      isError={isError}
      helperText={helperText}
      {...props}
    />
  );
};