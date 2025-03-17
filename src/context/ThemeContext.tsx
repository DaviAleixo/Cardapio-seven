import React, { createContext, useContext } from 'react';

interface ThemeContextType {
  // Keeping the interface for compatibility, but removing toggle functionality
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'fixed',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Fixed theme with no toggle functionality
  const theme = 'fixed';
  
  const toggleTheme = () => {
    // No-op function to maintain API compatibility
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};