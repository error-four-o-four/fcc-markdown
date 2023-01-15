import { useContext } from 'react';

import { LAYOUT, LayoutContext } from '../../context/LayoutContext.jsx';
import { TabsContext } from '../../context/TabsContext.jsx';

const toTitleCase = (string) => string[0].toUpperCase() + string.substring(1);

export default function ButtonTab({ value, disabled, onClick }) {
  const layoutState = useContext(LayoutContext);
  const tabsState = useContext(TabsContext);

  return (
    <button
      type="button"
      id={`btn-${value}`}
      value={value}
      className={
        layoutState === LAYOUT.TAB && tabsState === value ? 'active' : ''
      }
      disabled={disabled}
      onClick={onClick}>
      {toTitleCase(value)}
    </button>
  );
}
