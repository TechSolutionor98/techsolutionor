"use client";

import React, { createContext, useContext, useState } from 'react';

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openQuote = () => setIsOpen(true);
    const closeQuote = () => setIsOpen(false);

    return (
        <QuoteContext.Provider value={{ isOpen, openQuote, closeQuote }}>
            {children}
        </QuoteContext.Provider>
    );
};

export const useQuote = () => {
    const context = useContext(QuoteContext);
    if (!context) {
        throw new Error('useQuote must be used within a QuoteProvider');
    }
    return context;
};
