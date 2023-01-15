import { ThemeProvider } from './context/ThemeContext.jsx';

import { LayoutProvider } from './context/LayoutContext.jsx';
import { TabsProvider } from './context/TabsContext.jsx';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

export default function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <LayoutProvider>
          <TabsProvider>
            <Header />
            <Main />
            <footer>morp</footer>
          </TabsProvider>
        </LayoutProvider>
      </ThemeProvider>
    </div>
  );
}
