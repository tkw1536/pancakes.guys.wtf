import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import Router from 'next/router';
import * as React from 'react';
import Recipe from '../recipe';
import { AllVariantURLS, URLToVariant, default as Variant, VARIANT_REDIRECTS } from "../recipe/Variant";

interface VariantOrRedirect {
    redirect?: string;
    variant: Variant;
}

export default class Home extends React.Component<VariantOrRedirect> {
  componentDidMount() {
    const { redirect } = this.props;
    if (!redirect) return;
    Router.replace(redirect, redirect);
  }
  render() {
    const { variant } = this.props;
    return <Recipe root={process.env.NEXT_PUBLIC_ROOT_URL} variant={variant} />;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const urls = AllVariantURLS();
    urls.push(...Array.from(Object.keys(VARIANT_REDIRECTS)));
    
    const paths = urls.filter(url => url !== '').map(url => url.split("/")).map(variant => ({ params: { variant }}));

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    let props: Partial<VariantOrRedirect> = {};
    
    let url = (context.params!.variant as string[]).join("/");
    const redirect = VARIANT_REDIRECTS[url];
    if (redirect) {
        props.redirect = redirect;
        url = redirect;
    }
    props.variant = URLToVariant(url);
    
    return { props };
}