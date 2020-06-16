import * as React from 'react';
import Router from 'next/router';

export default class Home extends React.Component {
  componentDidMount() {
    // quick and dirty check if the user is in the states
    if(window.navigator.language !== 'en-US')
      Router.replace('/metric', '/metric');
    
    // the us needs their units
    else
      Router.replace('/us', '/us');
  }
  render() {
    return null;
  }
}