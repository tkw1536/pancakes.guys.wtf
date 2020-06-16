import * as React from 'react';
import Recipe from '../components/recipe';

export default class Home extends React.Component {
  render() {
    return <Recipe units='us' />
  }
}