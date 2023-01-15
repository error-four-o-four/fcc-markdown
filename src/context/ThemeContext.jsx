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

// const cssFiles = {
//   [THEME.DARK]: `theme.${THEME.DARK}.css`,
//   [THEME.LIGHT]: `theme.${THEME.LIGHT}.css`,
// };

// load css dynamically
const cssLoaded = {
  [THEME.DARK]: false,
  [THEME.LIGHT]: false,
};

// const assetsPath = '../assets/';

const fetchBaseCss = async () => {
  const styleElement = document.createElement('style');
  document.head.appendChild(styleElement);

  import('github-markdown-css');
};

const fetchCss = async (theme) => {
  switch (theme) {
    case 'light':
      import('../assets/theme.light.css');
      break;

    default:
      import('../assets/theme.dark.css');
      break;
  }

  // const styleElement = document.createElement('style');
  // document.head.appendChild(styleElement);

  // const path = assetsPath + cssFiles[theme];
  // const { default: props } = await import(/* @vite-ignore */ path);
  // styleElement.innerHTML += props;

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

    fetchBaseCss();

    return () => {
      darkColorSchemeQuery.removeEventListener(
        'change',
        handleColorSchemeChange
      );
    };
  }, []);

  useEffect(() => {
    if (!cssLoaded.dark || !cssLoaded.light) {
      fetchCss(current);
    }
  });

  return (
    <ThemeContext.Provider value={current}>
      <ThemeUpdater.Provider value={dispatch}>{children}</ThemeUpdater.Provider>
    </ThemeContext.Provider>
  );
}
