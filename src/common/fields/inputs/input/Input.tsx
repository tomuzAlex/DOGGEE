import React from 'react';
import styles from './Input.module.scss';

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  ref,
  type,
  onChange,
  mask,
  components,
  label,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = React.useState(!!props.value ?? false);
  // const value = props.value !== '' ? props.value : undefined;
  return (
    <>
      <div
        className={styles.inputConteiner}
        onClick={() => {
          inputRef.current?.focus();
          setIsFocus(true);
        }}
      >
        <label className={isFocus ? `${styles.label}` : ''}>{label}</label>

        {/* input and your logic */}
        <input
          ref={inputRef}
          type={type}
          value={props.value}
          className={`${styles.input} ${isError ? styles.inputError : ''}`}
          onChange={(e) => {
            if (!!onChange && !e.target.value) {
              return onChange(e)
            }
            if (!onChange || (mask && !mask.test(e.target.value))) return;
            return onChange(e);
          }}
          onBlur={() => {
            if (inputRef.current?.value) {
              return;
            }
            setIsFocus(false);
          }}
          {...props}
        />

        {/* text error */}
        {isError && helperText && <div className={styles.helperText}>{helperText}</div>}
        {/* INDICATOR */}
        <div>
          {components?.indicator && (
            <div className={styles.indicator}>
              <components.indicator />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
