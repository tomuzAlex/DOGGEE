import React, { createContext, useState } from 'react';

export const SelectContext = createContext();


// eslint-disable-next-line react/prop-types
export const SelectProvider = ({ children }) => {
  const [selectValue, setSelectValue] = useState('');

  return (
    <SelectContext.Provider value={{ selectValue, setSelectValue }}>
      {children}
    </SelectContext.Provider>
  );
};