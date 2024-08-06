import React, { createContext, useState, useContext } from 'react';

// Create the WalletContext
const WalletContext = createContext();

// Create a provider component
export const WalletContextProvider = ({ children }) => {
  const [sidePanel, setSidePanel] = useState(false);

  return (
    <WalletContext.Provider value={{ sidePanel, setSidePanel }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the WalletContext
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletContextProvider');
  }
  return context;
};
