import React from 'react';
import { formatDate } from './DateInput'

export const DateContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const DateProvider = ({ children }) => {
    const [dateInputValue, setDateInputValue] = React.useState(formatDate(new Date));

    return (
        <DateContext.Provider value={{ dateInputValue, setDateInputValue }}>
            {children}
        </DateContext.Provider>
    );
};