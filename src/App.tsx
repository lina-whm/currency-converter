import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Converter } from './components/Converter/Converter';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/currency-converter">
        <Converter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;