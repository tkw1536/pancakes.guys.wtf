import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from './recipe.module.css';

interface Variant {
    units: 'metric' | 'us';
}


interface TIngredient {
    metric: string;
    ofMetric?: boolean;

    US: string;
    ofUS?: boolean;

    children?: React.ReactNode
}

const ingredients: TIngredient[] = [
    {
        metric: '125 g',
        US: '1/2 cup',
        ofUS: true,
        children: 'flour'
    },
    {
        metric: '2 tblsp.',
        US: '2 tblsp.',
        ofUS: true,
        children: 'sugar'
    },
    {
        metric: 'Half a teasp.',
        US: 'Half a teasp.',
        ofUS: true,
        ofMetric: true,
        children: 'salt'
    },
    {
        metric: 'Half a package',
        ofMetric: true,
        US: '1 tblsp.',
        ofUS: true,
        children: 'baking powder',
    },
    {
        metric: 'Half a package.',
        ofMetric: true,
        US: '5 tblsp.',
        ofUS: true,
        children: 'vanilla sugar',
    },
    {
        metric: '≈ 250 ml',
        ofMetric: true,
        US: '≈ 1 cup',
        ofUS: true,
        children: 'milk',
    },
    {
        metric: "100g",
        ofMetric: false,
        US: "1/2 cup",
        ofUS: true,
        children: "blueberries (optional)"
    },
];

export default class RecipePage extends React.Component<{ variant: Variant; url: string }> {
    render() {
        const { variant, url } = this.props;
        return <>
            <RecipeHeader url='https://pancakes.guys.wtf/metric' variant={variant} />
            <Recipe variant={variant} />
        </>;
    }
}
class Recipe extends React.Component<{ variant: Variant}> {
    render() {
        const { variant } = this.props;
        return <>
            <Ingredients variant={variant} />
            <Notes variant={variant} />
        </>;
    }
}

function pageTitle(variant: Variant) {
    return `Pancakes, served with ${variant.units !== 'us' ? 'maple ' : ''}syrup. `;
}

export class RecipeHeader extends React.Component<{url: string, variant: Variant}> {
    render() {
        const { url, variant } = this.props;
        const title = pageTitle(variant);
        const description = 'A recipe for ' +  title[0].toLowerCase() + title.substring(1);
        const image = 'https://pancakes.guys.wtf/pancakes.jpeg';

        return <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta name="og:url" content={url} />
                <meta property="twitter:url" content={url} />

                <title>{title}</title>

                <meta itemProp="name" content={title} />
                <meta name="og:title" content={title} />
                <meta property="twitter:title" content={title} />

                <meta name="description" content={description} />
                <meta itemProp="description" content={description} />
                <meta name="og:description" content={description} />
                <meta name="og:site_name" content={description} />
                <meta property="twitter:description" content={description} />

                <meta name="image" content={image} />
                <meta itemProp="image" content={image} />
                <meta name="og:image" content={image} />
                <meta property="twitter:image" content={image} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta name="og:type" content="website" />
        </Head>
    }
}

class Ingredients extends React.Component<{ variant: Variant}> {
    render() {
        const { variant } = this.props;
        const title = pageTitle(variant);
        
        return <>
            <div className="row">
                <div className="six columns">
                    <h1>Ingredients</h1>

                    <ul>
                        {ingredients.map((ingredient, index) => <Ingredient {...ingredient} variant={variant} key={index} />)}
                    </ul>

                    <h1>Recipe</h1>

                    <ul>
                        <li>Combine dry ingredients, add wet ingredient, whisk until smooth, let rest for 10 minutes.</li>
                        <li>Bake in non-stick pan. If desired, add blueberries before first flipping.</li>
                    </ul>
                </div>
                <div className="six columns">
                    <figure>
                        <img className={style.preview} src="/pancakes.jpeg" alt={title} title={title}/>
                        <figcaption><small>{title}</small></figcaption>
                    </figure>
                </div>
            </div>
        </>;
    }
}

interface IngredientParams extends TIngredient {
    variant: Variant;
}

class Ingredient extends React.Component<IngredientParams> {
    render() {
        const { variant, metric, ofMetric, US, ofUS, children } = this.props;
        const of = variant.units === 'metric' ? ofMetric : ofUS;
        return <li>
            <span className={style.amount}>{variant.units === 'metric' ? metric : US}</span>
            {of ? " of " : " "}
            <span className={style.ingredient}>{children}</span>
        </li>
    }
}

class Notes extends React.Component<{ variant: Variant}> {
    render() {
        const { variant } = this.props;
        const { units } = variant;
        return <>
            <h1>Notes</h1>

            <ul>
                <li>
                    <Link href={variant.units === 'metric' ? '/us' : '/metric'}>
                        <a>You can view this recipe in {variant.units === 'metric' ? 'US' : 'metric'} units. </a>
                    </Link>
                </li>
                {units === 'metric' &&
                    <li>
                        <span className={style.amount}>1 package</span> of baking powder &asymp; <span className={style.amount}>20 ml</span>.
                    </li>
                }
                {units === 'metric' &&
                    <li>
                        <span className={style.amount}>1 package</span> of vanilla sugar &asymp; <span className={style.amount}>5 tblsp</span>.
                    </li>
                }
                <li>
                    When <span className={style.ingredient}>vanilla sugar</span> is not available, use either <span className={style.ingredient}>(normal) sugar</span> or <span className={style.ingredient}>(normal) sugar and vanilla extract</span>.
                </li>
                <li>
                    For a vegan variant, replace <span className={style.ingredient}>milk</span> with <span className={style.ingredient}>non-dairy</span> milk. We recommend using <a target ="_blank" href="https://www.oatly.com/int/products/oat-drink-barista-edition">Oatly Barista edition</a>.
                </li>
            </ul>
        </>
    }
}
