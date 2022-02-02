import React from 'react';
import { HeaderNav, HomeIcon } from '@tbiegner99/home-automation-components';
import Branding from './Branding';
import navBar from "./navBar.css"

const NavBar = (props) => (
  <div>  
    <HeaderNav>
      <div style={{ width: 0, overflow: 'visible' }} />

      <Branding title={props.appTitle} />
      <HomeIcon className={navBar.homeIcon} onClick={props.onHomeClick} />
    </HeaderNav>
  </div>

);

export default NavBar;
