import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../context/ThemeContext';

describe('ThemeToggle', () => {
  test('renders toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button', { name: /switch/i });
    expect(button).toBeInTheDocument();
  });

  test('toggles theme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    const initialTheme = button.textContent;
    
    fireEvent.click(button);
    
    expect(button.textContent).not.toBe(initialTheme);
  });
});