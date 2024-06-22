// import React from 'react';
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string;
  type: string;
  value?: string;
  selectedDateValue? : string;
  helperText?: string;
  mask?: RegExp;
  isError?: boolean;
  ref?: import('react').HTMLInputElement | null;
  as?: import('react').ReactElementType;
  components?: {
    indicator?: () => import('react').ReactElement;
  };
}


// const mask = /^[a-zA-Z0-9]+$/g