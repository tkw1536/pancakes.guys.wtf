import { GetStaticPaths, GetStaticProps } from "next";
import * as React from 'react';
import Recipe from '../recipe';
import { AllVariantURLS, URLToVariant, default as Variant } from "../recipe/Variant";

export default class Home extends React.Component<{variant: Variant}> {
  render() {
    const { variant } = this.props;
    return <Recipe root={process.env.NEXT_PUBLIC_ROOT_URL} variant={variant} />;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const variants = AllVariantURLS().map(url => url.split("/")).map(variant => ({ params: { variant }}))
    return {
        paths: variants,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const url = (context.params!.variant as string[]).join("/");
    const variant = URLToVariant(url);
    return {
        props: {
            variant,
        }
    };
}