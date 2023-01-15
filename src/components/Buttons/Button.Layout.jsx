import { useContext } from 'react';
import { Icon } from '@iconify-icon/react';

import {
  ACTIONS as LAYOUT_ACTIONS,
  LAYOUT,
  LayoutContext,
  LayoutUpdater,
} from '../../context/LayoutContext.jsx';

import ButtonIcon from './Button.Icon.jsx';

export default function ButtonTheme() {
  const layoutState = useContext(LayoutContext);
  const updateLayout = useContext(LayoutUpdater);

  const toggleLayout = () => updateLayout(LAYOUT_ACTIONS.TOGGLE);

  return (
    <ButtonIcon
      label="toggle-layout"
      value={layoutState}
      onClick={toggleLayout}>
      <Icon
        id={LAYOUT.SPLIT}
        key={LAYOUT.SPLIT}
        icon="akar-icons:panel-split-row"
      />
      <Icon id={LAYOUT.TAB} key={LAYOUT.TAB} icon="akar-icons:square" />
    </ButtonIcon>
  );
}
