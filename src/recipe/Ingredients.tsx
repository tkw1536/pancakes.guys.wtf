import * as React from "react";
import style from './index.module.css';

import { default as Variant, VariantTitle } from "./Variant";
import { RecipeIngredient, default as INGREDIENTS } from "./recipe";

export default class Ingredients extends React.Component<{ variant: Variant, multiplier: number }> {
    render() {
        const { variant, multiplier } = this.props;


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
                        {INGREDIENTS.map((ingredient, index) => <Ingredient ingredient={ingredient} variant={variant} multiplier={multiplier}  key={index} />)}
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
    multiplier: number;
}

class Ingredient extends React.Component<IngredientParams> {
    render() {
        const { variant: { vegan }, ingredient: { quantity: [amountNo, amountName], addOf, name, veganName, note, veganNote } } = this.props;

        let { multiplier } = this.props;
        multiplier = isNaN(multiplier) ? 1 : multiplier;


        const children = (vegan && (typeof veganName !== 'undefined')) ? veganName : name;
        if (children === null) {
            return null; // omitted in this mode
        }

        const noteChild = (vegan && (typeof veganNote !== 'undefined')) ? veganNote: note;


        return <li>
            <span className={style.amount}>{numberToString(amountNo * multiplier)} {amountName}</span>
            {addOf ? " of " : " "}
            <span className={style.ingredient}>{children}</span>
            {noteChild && <>{` `}{noteChild}</>}
        </li>
    }
}

function numberToString(no: number): string {
    if(no % 1 == 0.5) {
        no = Math.floor(no);
        const noStr = no !== 0 ? `${no} ` : "";
        return noStr + '1/2';
    }
    return no.toString()
}