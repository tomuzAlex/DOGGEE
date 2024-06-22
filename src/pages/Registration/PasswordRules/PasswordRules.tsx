import React from 'react';
import styles from './PasswordRules.module.scss';

import { PasswordRule } from './PasswordRule/PasswordRule';

interface PasswordRulesProps {
  password: string;
  passwordAgain: string;
  hasPasswordError: boolean;
}

export const PasswordRules: React.FC<PasswordRulesProps> = ({
  password,
  passwordAgain,
}: PasswordRulesProps) => {
  // Функция для сравнения паролей
  const passwordsMatch = () => {
    return password === passwordAgain;
  };

  // переменные для проверки
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasEightCharacters = password.length >= 8;

  return (
    <div className={styles.rules}>
      <div className={styles.list}>
        <PasswordRule title="Password must:" />
        <PasswordRule title="contain numbers" isCorrect={hasNumbers} showIcon={true} />
        <PasswordRule title="contain uppercase letter" isCorrect={hasUpper} showIcon={true} />
        <PasswordRule title="contain lowercase letter" isCorrect={hasLower} showIcon={true} />
        <PasswordRule
          title=" contain at least 8 characters"
          isCorrect={hasEightCharacters}
          showIcon={true}
        />
        <PasswordRule title="password must match" isCorrect={passwordsMatch()} showIcon={true} />
      </div>
    </div>
  );
};

// contain numbers
// contain uppercase letter
// contain lowercase letter
// contain at least 8 characters
// password must match
