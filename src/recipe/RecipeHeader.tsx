import * as React from "react";
import Head from "next/head";
import { default as Variant, VariantTitle, VariantToURL } from "./Variant";

export class RecipeHeader extends React.Component<{root: string; url?: string; variant: Variant, multiplier: number}> {
    render() {
        const { root, url, variant, multiplier } = this.props;
        const title = VariantTitle(variant);
        const description = 'A recipe for ' +  title[0].toLowerCase() + title.substring(1);
        
        const pageURL = `${root}${url ?? VariantToURL(variant, undefined, multiplier)}`;
        const imageURL = `${root}pancakes.jpeg`;

        return <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta name="og:url" content={pageURL} />
                <meta property="twitter:url" content={pageURL} />

                <title>{title}</title>

                <meta itemProp="name" content={title} />
                <meta name="og:title" content={title} />
                <meta property="twitter:title" content={title} />

                <meta name="description" content={description} />
                <meta itemProp="description" content={description} />
                <meta name="og:description" content={description} />
                <meta name="og:site_name" content={description} />
                <meta property="twitter:description" content={description} />

                <meta name="image" content={imageURL} />
                <meta itemProp="image" content={imageURL} />
                <meta name="og:image" content={imageURL} />
                <meta property="twitter:image" content={imageURL} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta name="og:type" content="website" />
        </Head>
    }
}