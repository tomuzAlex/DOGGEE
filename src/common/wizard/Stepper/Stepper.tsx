import React from 'react';
// import { Registration } from '@pages/Registration/Registration';
import styles from './Stepper.module.scss';
import checkmarkSvg from '@static/images/checkmark.svg';

interface StepperProps {
  activeSteps: number;
  stepLabels: string[]; // метка которая будет показывать прогрессбар
}

export const Stepper: React.FC<StepperProps> = ({ activeSteps, stepLabels }) => {
  return (
    <div className={styles.stepper}>
      {stepLabels.map((label, i) => {
        const stepNumber = i + 1;
        const isActiveStep = stepNumber === activeSteps;
        const isLastStep = stepNumber === stepLabels.length;
        const lineStep = stepNumber < stepLabels.length;

        return (
          <div className={styles.step} key={i}>
            <div
              className={`${styles.circle} ${isActiveStep ? styles.circle_active : ''}  ${isLastStep ? styles.circle_last : ''}`}
            >
              {!isLastStep ? stepNumber : <img src={checkmarkSvg} alt="checkmark" />}
            </div>
            {lineStep && <div className={styles.line}></div>}
            <div className={styles.label}>{label}</div>
          </div>
        );
      })}
    </div>
  );
};
