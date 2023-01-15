import { useContext } from 'react';

import { LAYOUT, LayoutContext } from '../context/LayoutContext.jsx';

import {
  TABS,
  ACTIONS as TABS_ACTIONS,
  TabsUpdater,
} from '../context/TabsContext.jsx';

import ButtonLayout from './Buttons/Button.Layout.jsx';
import ButtonTab from './Buttons/Button.Tab.jsx';

import ButtonTheme from './Buttons/Button.Theme.jsx';

export default function Header() {
  const layoutState = useContext(LayoutContext);
  const updateTabs = useContext(TabsUpdater);

  const toggleTab = (e) => updateTabs(TABS_ACTIONS.SET, e.target.value);

  return (
    <header className={`layout-${layoutState}`}>
      <h1>
        <span>Markdown</span>
        <span>
          {Object.values(TABS).map((value) => (
            <ButtonTab
              key={value}
              value={value}
              disabled={layoutState === LAYOUT.SPLIT}
              onClick={toggleTab}
            />
          ))}
        </span>
      </h1>
      <div className="buttons-wrap">
        <ButtonTheme />
        <ButtonLayout />
      </div>
    </header>
  );
}
