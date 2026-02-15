import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.toggle} 
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
    >
      {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
    </button>
  );
};