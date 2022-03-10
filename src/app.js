/* eslint-disable prefer-destructuring */
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import NavBar from './NavBar';

const onHomeClick = () => {
  window.history.pushState({}, '', '/');
};

const Main = (props) => {
  const [appTitle, setAppTitle] = React.useState(null);
  const [navConfig, setNavConfig] = React.useState(null);
  const appChangeListener = (evt) => {
    const { detail } = evt;
    if (detail) {
      setAppTitle(detail.title);
    }
  };

  const navUpdateListener = (evt) => {
    console.log('nav event received');
    const { detail } = evt;
    if (detail) {
      setNavConfig(detail.config);
    }
  };

  const clearNavListener = () => {
    setNavConfig(null);
  };

  React.useEffect(() => {
    window.addEventListener('nav-update', navUpdateListener);
    window.addEventListener('nav-clear', clearNavListener);
    window.addEventListener('app-changed', appChangeListener);

    const evt = new CustomEvent('nav-mounted', {});
    window.dispatchEvent(evt);
    const cleanup = () => {
      window.removeEventListener('app-changed', appChangeListener);
      window.removeEventListener('nav-clear', clearNavListener);
      window.removeEventListener('nav-update', navUpdateListener);
    };
    return cleanup;
  });

  return <NavBar {...props} config={navConfig} appTitle={appTitle} onHomeClick={onHomeClick} />;
};

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Main,
  errorBoundary(/* err, info, props */) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  }
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
