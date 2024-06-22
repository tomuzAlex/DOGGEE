import React from 'react';
import styles from './Checkbox.module.scss';
import { IntlText } from '@features/I18n';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <div>
      <label className={styles.label}>
        <input type="checkbox" className={styles.checkbox} />
        <span className={styles.checkbox_custom} />
        <IntlText path="page.login.checkbox">{label}</IntlText>
      </label>
    </div>
  );
};
