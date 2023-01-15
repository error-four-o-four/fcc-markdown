import { useContext } from 'react';
import { Icon } from '@iconify-icon/react';

import {
  ACTIONS as THEME_ACTIONS,
  THEME,
  ThemeContext,
  ThemeUpdater,
} from '../../context/ThemeContext.jsx';

import ButtonIcon from './Button.Icon.jsx';

export default function ButtonTheme() {
  const themeState = useContext(ThemeContext);
  const updateTheme = useContext(ThemeUpdater);
  const toggleTheme = () => updateTheme(THEME_ACTIONS.TOGGLE);

  return (
    <ButtonIcon label="toggle-theme" value={themeState} onClick={toggleTheme}>
      <Icon id={THEME.DARK} key={THEME.DARK} icon="akar-icons:moon" />
      <Icon id={THEME.LIGHT} key={THEME.LIGHT} icon="akar-icons:sun" />
    </ButtonIcon>
  );
}
