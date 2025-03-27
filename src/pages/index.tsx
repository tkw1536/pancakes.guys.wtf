import * as React from 'react';
import Recipe from "../recipe";
import { DEFAULT_VARIANT } from "../recipe/Variant";

export default class Home extends React.Component {
  render() {
    return <Recipe root={process.env.NEXT_PUBLIC_ROOT_URL} variant={DEFAULT_VARIANT} />;
  }
}