import { createContext, useCallback, useState } from 'react';

export const ACTIONS = {
  SET: 'set',
  TOGGLE: 'toggle',
};

export const LAYOUT = {
  SPLIT: 'split',
  TAB: 'tab',
};

export const LayoutContext = createContext({});
export const LayoutUpdater = createContext({});

export function LayoutProvider({ children }) {
  const [current, setCurrent] = useState(LAYOUT.SPLIT);

  const dispatch = useCallback((action, value) => {
    if (action === ACTIONS.SET) {
      setCurrent(value);
      return;
    }

    if (action === ACTIONS.TOGGLE) {
      setCurrent((prev) => (prev === LAYOUT.SPLIT ? LAYOUT.TAB : LAYOUT.SPLIT));
    }
  }, []);

  return (
    <LayoutContext.Provider value={current}>
      <LayoutUpdater.Provider value={dispatch}>
        {children}
      </LayoutUpdater.Provider>
    </LayoutContext.Provider>
  );
}
