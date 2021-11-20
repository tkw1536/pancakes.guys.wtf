import * as React from 'react';
import Router from 'next/router';
import { RecipeHeader } from "../recipe/RecipeHeader";
import { DEFAULT_VARIANT, VariantToURL } from "../recipe/Variant";

export default class Home extends React.Component {
  componentDidMount() {
    const url = '/' + VariantToURL(DEFAULT_VARIANT);
    Router.replace(url, url);
  }
  render() {
    return <RecipeHeader root={process.env.NEXT_PUBLIC_ROOT_URL} url="" variant={DEFAULT_VARIANT} />;
  }
}