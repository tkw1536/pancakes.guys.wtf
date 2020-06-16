import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from './recipe.module.css';

type Units = 'metric' | 'us';

interface RecipeParams {
    units: Units;
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
];

export default class Recipe extends React.Component<RecipeParams> {
    render() {
        const { units } = this.props;
        return <>
            <Head>
                <title>
                    Pancakes. Guys, wtf?
                </title>
            </Head>

            <Ingredients units={units} />
            <Notes units={units} />
        </>;
    }
}

class Ingredients extends React.Component<RecipeParams> {
    render() {
        const { units } = this.props;
        const title = `Pancakes, served with ${units === 'metric' ? 'maple ' : ''}syrup. `;
        return <>
            <div className="row">
                <div className="six columns">
                    <h1>Ingredients</h1>

                    <ul>
                        {ingredients.map((ingredient, index) => <Ingredient {...ingredient} units={units} key={index} />)}
                    </ul>

                    <h1>Recipe</h1>

                    <ul>
                        <li>Combine dry ingredients, add wet ingredient, whisk until smooth, let rest for 10 minutes.</li>
                        <li>Bake in non-stick pan. </li>
                    </ul>
                </div>
                <div className="six columns">
                    <br />
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
    units: Units;
}

class Ingredient extends React.Component<IngredientParams> {
    render() {
        const { units, metric, ofMetric, US, ofUS, children } = this.props;
        const of = units === 'metric' ? ofMetric : ofUS;
        return <li>
            <span className={style.amount}>{units === 'metric' ? metric : US}</span>
            {of ? " of " : " "}
            <span className={style.ingredient}>{children}</span>
        </li>
    }
}

class Notes extends React.Component<RecipeParams> {
    render() {
        const { units } = this.props;
        return <>
            <h1>Notes</h1>

            <ul>
                <li>
                    <Link href={units === 'metric' ? '/us' : '/metric'}>
                        <a>You can view this recipe in {units === 'metric' ? 'US' : 'metric'} units. </a>
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
                    For a vegan variant, replace <span className={style.ingredient}>milk</span> with <span className={style.ingredient}>non-dairy</span> milk.
                </li>
            </ul>
        </>
    }
}