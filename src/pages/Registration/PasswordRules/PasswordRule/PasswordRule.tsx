import React from 'react';
import styles from './PasswordRule.module.scss';
import checkmarkAddintionalSvg from './checkmark.svg';
import warningSvg from './warning.svg';

interface PasswordRuleProps {
  title: string;
  isCorrect?: boolean;
  showIcon?: boolean;
}

export const PasswordRule: React.FC<PasswordRuleProps> = ({ title, isCorrect, showIcon }) => {
  if (!showIcon) {
    return <div>{title}</div>;
  }

  if (!isCorrect) {
    return (
      <div className={styles.rule}>
        <div className={styles.element}>
          <img src={warningSvg} alt="warning" className={styles.warningIcon} />
          {title}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rule}>
      <div className={styles.element}>
        <img src={checkmarkAddintionalSvg} alt="" />
        {title}
      </div>
    </div>
  );
};
