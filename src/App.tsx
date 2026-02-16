import { ThemeProvider } from './context/ThemeContext';
import { Converter } from './components/Converter/Converter';

function App() {
  return (
    <ThemeProvider>
      <Converter />
    </ThemeProvider>
  );
}

export default App;