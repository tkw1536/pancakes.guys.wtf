import * as React from "react";
import style from './index.module.css';

import { default as Variant, VariantTitle } from "./Variant";

interface RecipeIngredient {
    metric: string;
    ofMetric?: boolean;

    US: string;
    ofUS?: boolean;

    name?: React.ReactNode,
    veganName?: React.ReactNode,

    note?: React.ReactNode,
    veganNote?: React.ReactNode,
}

const INGREDIENTS: RecipeIngredient[] = [
    {
        metric: '125 g',
        US: '1/2 cup',
        ofUS: true,
        name: 'flour'
    },
    {
        metric: '2 tblsp.',
        US: '2 tblsp.',
        ofUS: true,
        name: 'sugar',
    },
    {
        metric: '2',
        US: '2',
        name: 'eggs',
        veganName: null,
    },
    {
        metric: 'Half a teasp.',
        US: 'Half a teasp.',
        ofUS: true,
        ofMetric: true,
        name: 'salt'
    },
    {
        metric: 'Half a package',
        ofMetric: true,
        US: '1 tblsp.',
        ofUS: true,
        name: 'baking powder',
    },
    {
        metric: 'Half a package.',
        ofMetric: true,
        US: '5 tblsp.',
        ofUS: true,
        name: 'vanilla sugar',
    },
    {
        metric: '≈ 250 ml',
        ofMetric: true,
        US: '≈ 1 cup',
        ofUS: true,
        
        name: 'milk',
        veganName: 'non-dairy milk',

        veganNote: <>(e.g. <a target ="_blank" rel="noopener noreferer" href="https://www.oatly.com/int/products/oat-drink-barista-edition">Oatly Barista edition</a>)</>
    },
    {
        metric: "100g",
        ofMetric: false,
        US: "1/2 cup",
        ofUS: true,
        name: "blueberries (optional)"
    },
];

export default class Ingredients extends React.Component<{ variant: Variant }> {
    render() {
        const { variant } = this.props;


        const shortTitle = VariantTitle(variant, true);
        const longTitle = VariantTitle(variant);

        return <>

            <div className="row">
                <div className="full">
                    <h1>{shortTitle}</h1>

                    <figure className="hide-large">
                        <img className={style.preview} src="/pancakes.jpeg" alt={longTitle} title={longTitle} />
                        <figcaption><small>{longTitle}</small></figcaption>
                    </figure>
                </div>
            </div>

            <div className="row">
                <div className="half">
                    <h2>Ingredients</h2>

                    <ul>
                        {INGREDIENTS.map((ingredient, index) => <Ingredient ingredient={ingredient} variant={variant} key={index} />)}
                    </ul>
                </div>
                <div className="half show-large">
                    <figure>
                        <img className={style.preview} src="/pancakes.jpeg" alt={longTitle} title={longTitle} />
                        <figcaption><small>{longTitle}</small></figcaption>
                    </figure>
                </div>
            </div>
            <div className="row">
                <div className="full">

                    <h2>Recipe</h2>

                    <ul>
                        <li>Combine dry ingredients, add wet ingredient{!variant.vegan && "s"}, whisk until smooth, let rest for 10 minutes.</li>
                        <li>Bake in non-stick pan. If desired, add blueberries before first flipping.</li>
                    </ul>
                </div>
            </div>
        </>;
    }
}

interface IngredientParams {
    ingredient: RecipeIngredient;
    variant: Variant;
}

class Ingredient extends React.Component<IngredientParams> {
    render() {
        const { variant: { units, vegan }, ingredient: { metric, ofMetric, US, ofUS, name, veganName, note, veganNote } } = this.props;

        const of = units === 'metric' ? ofMetric : ofUS;
        const amount = units === 'metric' ? metric : US;


        const children = (vegan && (typeof veganName !== 'undefined')) ? veganName : name;
        if (children === null) {
            return null; // omitted in this mode
        }

        const noteChild = (vegan && (typeof veganNote !== 'undefined')) ? veganNote: note;


        return <li>
            <span className={style.amount}>{amount}</span>
            {of ? " of " : " "}
            <span className={style.ingredient}>{children}</span>
            {noteChild && <>{` `}{noteChild}</>}
        </li>
    }
}
