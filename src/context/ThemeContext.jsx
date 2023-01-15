import { createContext, useCallback, useEffect, useState } from 'react';

export const ACTIONS = {
  SET: 'set',
  TOGGLE: 'toggle',
};

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

// media query list
const darkColorSchemeQuery =
  window && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

// set dark by default
const initialColorScheme = !darkColorSchemeQuery.matches
  ? THEME.LIGHT
  : THEME.DARK;

// load css dynamically
const cssLoaded = {
  [THEME.DARK]: false,
  [THEME.LIGHT]: false,
};

const fetchMarkdownCss = async () => {
  import('github-markdown-css');
};

const fetchThemeCss = async (theme) => {
  switch (theme) {
    case 'light':
      import('../assets/theme.light.css');
      break;

    default:
      import('../assets/theme.dark.css');
      break;
  }

  cssLoaded[theme] = true;
};

export const ThemeContext = createContext({});
export const ThemeUpdater = createContext({});

export function ThemeProvider({ children }) {
  const [current, setCurrent] = useState(initialColorScheme);

  const dispatch = useCallback((action, value) => {
    if (action === ACTIONS.SET) {
      setCurrent(value);
      return;
    }

    if (action === ACTIONS.TOGGLE) {
      setCurrent((prev) => {
        const theme = prev === THEME.DARK ? THEME.LIGHT : THEME.DARK;
        document.body.classList.remove(prev);
        document.body.classList.add(theme);
        return theme;
      });
    }
  }, []);

  useEffect(() => {
    const handleColorSchemeChange = (e) => {
      const value = e.matches ? THEME.DARK : THEME.LIGHT;
      const prev = value === THEME.DARK ? THEME.LIGHT : THEME.DARK;
      setCurrent(value);
      document.body.classList.remove(prev);
      document.body.classList.add(value);
    };

    document.body.classList.add(initialColorScheme);

    if (darkColorSchemeQuery !== null) {
      darkColorSchemeQuery.addEventListener('change', handleColorSchemeChange);
    }

    fetchMarkdownCss();

    return () => {
      darkColorSchemeQuery.removeEventListener(
        'change',
        handleColorSchemeChange
      );
    };
  }, []);

  useEffect(() => {
    if (!cssLoaded.dark || !cssLoaded.light) {
      fetchThemeCss(current);
    }
  });

  return (
    <ThemeContext.Provider value={current}>
      <ThemeUpdater.Provider value={dispatch}>{children}</ThemeUpdater.Provider>
    </ThemeContext.Provider>
  );
}
