import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ThemeContext = createContext<{
  currentTheme: 'light' | 'dark';
  toggleMode: () => void;
}>({
  currentTheme: 'light',
  toggleMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useLocalStorage<'light' | 'dark'>(
    'theme',
    'light'
  );

  const toggleMode = () => {
    setCurrentTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useCurrentTheme = (): 'light' | 'dark' => {
  const { currentTheme } = useContext(ThemeContext);
  return currentTheme;
};

export const useToggleMode = () => {
  const { toggleMode } = useContext(ThemeContext);
  return toggleMode;
};
