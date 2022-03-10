import React from 'react';
import {
  HeaderNav,
  HomeIcon,
  MenuItem,
  HamburgerIcon
} from '@tbiegner99/home-automation-components';
import Branding from './Branding';
import navBar from './navBar.css';

const ACTION = 'action';
const HAMBURGER = 'hamburger';

const eventDispatch = (event, args) => () => {
  const evt = new CustomEvent(event, { detail: args });
  window.dispatchEvent(evt);
};

const mapIcon = (icon) => {
  switch (icon) {
    case HAMBURGER:
      return <HamburgerIcon />;
    default:
      throw new Error(`unsupported icon ${icon}`);
  }
};

const AppAction = (props) => {
  const {
    config: { type, icon, title, event, args }
  } = props;
  switch (type) {
    case ACTION:
      return (
        <MenuItem onClick={eventDispatch(event, args)} icon={mapIcon(icon)}>
          {title}
        </MenuItem>
      );
    default:
      throw new Error(`unknown type: ${type}`);
  }
};

const AppActions = (props) => {
  const { config } = props;
  if (!config || !config.length) {
    return <div style={{ width: 0, overflow: 'visible' }} />;
  }

  return config.map((conf) => <AppAction config={conf} />);
};

const NavBar = (props) => (
  <div>
    <HeaderNav>
      <AppActions config={props.config} />

      <Branding title={props.appTitle} />
      <HomeIcon className={navBar.homeIcon} onClick={props.onHomeClick} />
    </HeaderNav>
  </div>
);

export default NavBar;
