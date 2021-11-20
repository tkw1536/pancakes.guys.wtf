import * as React from 'react';
import Recipe, { RecipeHeader } from '../components/recipe';

export default class Home extends React.Component {
  render() {
    return <Recipe url='https://pancakes.guys.wtf/metric' variant={{units: 'metric'}} />;
  }
}