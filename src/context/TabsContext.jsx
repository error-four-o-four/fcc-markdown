import { createContext, useCallback, useState } from 'react';

export const ACTIONS = {
  SET: 'set',
  TOGGLE: 'toggle',
};

export const TABS = {
  EDITOR: 'editor',
  PREVIEW: 'preview',
};

export const TabsContext = createContext({});
export const TabsUpdater = createContext({});

export function TabsProvider({ children }) {
  const [current, setCurrent] = useState(TABS.EDITOR);

  const dispatch = useCallback((action, value) => {
    if (action === ACTIONS.SET) {
      setCurrent(value);
      return;
    }

    if (action === ACTIONS.TOGGLE) {
      setCurrent((prev) => {
        const theme = prev === TABS.EDITOR ? TABS.PREVIEW : TABS.EDITOR;
        document.body.classList.remove(prev);
        document.body.classList.add(theme);
        return theme;
      });
    }
  }, []);

  return (
    <TabsContext.Provider value={current}>
      <TabsUpdater.Provider value={dispatch}>{children}</TabsUpdater.Provider>
    </TabsContext.Provider>
  );
}
