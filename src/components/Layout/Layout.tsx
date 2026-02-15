import React, { ReactNode } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <ThemeToggle />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2026. Проект "Конвертер валют" для портфолио. Данные предоставлены ExchangeRate-API</p>
      </footer>
    </div>
  );
};