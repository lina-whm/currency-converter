import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Converter } from './components/Converter/Converter';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import styles from './App.module.css';

function App() {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <div className={styles.header}>
          <ThemeToggle />
        </div>
        <main className={styles.main}>
          <Converter />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;