import * as React from "react";
import style from './index.module.css';

import { default as Variant, VariantTitle } from "./Variant";

interface RecipeIngredient {
    metric: string;
    ofMetric?: boolean;

    US: string;
    ofUS?: boolean;

    children?: React.ReactNode
}

const INGREDIENTS: RecipeIngredient[] = [
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

export default class Ingredients extends React.Component<{ variant: Variant}> {
    render() {
        const { variant } = this.props;
        const title = VariantTitle(variant);
        
        return <>
            <div className="row">
                <div className="six columns">
                    <h1>Ingredients</h1>

                    <ul>
                        {INGREDIENTS.map((ingredient, index) => <Ingredient {...ingredient} variant={variant} key={index} />)}
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

interface IngredientParams extends RecipeIngredient {
    variant: Variant;
}

class Ingredient extends React.Component<IngredientParams> {
    render() {
        const { variant, metric, ofMetric, US, ofUS, children } = this.props;
        const { units } = variant;

        const of = units === 'metric' ? ofMetric : ofUS;
        const amount = units === 'metric' ? metric : US;
        return <li>
            <span className={style.amount}>{amount}</span>
            {of ? " of " : " "}
            <span className={style.ingredient}>{children}</span>
        </li>
    }
}
