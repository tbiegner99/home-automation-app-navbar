/* eslint-disable prefer-destructuring */
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import NavBar from './NavBar';

const onHomeClick=()=> {
  window.history.pushState({},'','/')
}

const Main = (props) => {
    const [appTitle,setAppTitle] = React.useState(null)

    React.useEffect(()=>{
      const listener=(evt)=> {
        const {detail}= evt;
        setAppTitle(detail.title)
      }
      window.addEventListener('app-changed',listener)
      const cleanup=()=>window.removeEventListener('app-changed',listener)
      return cleanup;
    
    })

    

    return <NavBar {...props} appTitle={appTitle} onHomeClick={onHomeClick} />

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
