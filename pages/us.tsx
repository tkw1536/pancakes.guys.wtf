import * as React from 'react';
import Recipe, { RecipeHeader } from '../components/recipe';

export default class Home extends React.Component {
  render() {
    return <>
      <RecipeHeader url='https://pancakes.guys.wtf/us' variant='us' />
      <Recipe variant='us' />
    </>
  }
}