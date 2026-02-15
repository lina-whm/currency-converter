import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Converter } from './components/Converter/Converter';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Converter />
      </Layout>
    </ThemeProvider>
  );
}

export default App;