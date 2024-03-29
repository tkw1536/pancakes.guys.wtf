import * as React from "react";
import Link from 'next/link';

import Variant, { AddVariant, VariantToURL } from "./Variant";
import style from './index.module.css';
import { PEOPLE_MULTIPLIER_RATIO, PANCAKE_MULTIPLIER_RATIO } from "./recipe";

interface NotesParams {
    variant: Variant;
    multiplier: number;
    changeMultiplier: (multipler: number) => void;
}

export default class Notes extends React.Component<NotesParams> {
    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const people = event.currentTarget.valueAsNumber;
        this.props.changeMultiplier(people / PEOPLE_MULTIPLIER_RATIO );
    }
    render() {
        const { variant, multiplier } = this.props;

        //
        // VEGAN VARIANT
        //

        const forVegans = AddVariant(variant, { vegan: !variant.vegan });
        const forVegansURL = VariantToURL(forVegans, true, multiplier);

        let forVegansContent: React.ReactNode;
        if (forVegans.vegan) {
            forVegansContent = <>
                For a <Link href={forVegansURL}><a>vegan variant</a></Link>, replace <span className={style.ingredient}>milk</span> with <span className={style.ingredient}>non-dairy</span> milk and remove <span className={style.ingredient}>eggs</span>.
            </>;
        } else {
            forVegansContent = <>
                For a <Link href={forVegansURL}><a>non-vegan variant</a></Link>, you can use <span className={style.ingredient}>regular milk</span> and add <span className={style.ingredient}>eggs</span>.
            </>;
        }

        //
        // AMERICAN UNITS
        //
        const forAmericans = AddVariant(variant, { units: variant.units === 'metric' ? 'us' : 'metric'});
        const forAmericansURL = VariantToURL(forAmericans, undefined, multiplier);

        let forAmericansContent: React.ReactNode;
        if (forAmericans.units === 'us') {
            forAmericansContent = <>
               If you're from the US, <Link href={forAmericansURL}><a>you can see this in customary units</a></Link>.
            </>;
        } else {
            forAmericansContent = <>
                Not from the US and <Link href={VariantToURL(forAmericans, true, multiplier)}><a>confused about these units?</a></Link>
            </>;
        } 

        //
        // MULTIPLER
        //

        const aMultiplier = isNaN(multiplier) ? 1 : multiplier;
        const noPancakes = PANCAKE_MULTIPLIER_RATIO * aMultiplier;
        const noPeople = PEOPLE_MULTIPLIER_RATIO * aMultiplier;
        
        return <>
            <h2>Notes</h2>

            <ul>
                <li>Makes &#8776; <span className={style.amount}>{noPancakes} pancakes</span> for <span className={style.amount}>
                    <input type="number" value={isNaN(multiplier) ? "" : noPeople} onChange={this.onChange} size={3} /> people</span>
                </li>
                <li>{forVegansContent}</li>
                <li>{forAmericansContent}</li>
                {variant.units === 'metric' &&
                    <li>
                        <span className={style.amount}>1 package</span> of baking powder &asymp; <span className={style.amount}>20 ml</span>.
                    </li>
                }
                {variant.units === 'metric' &&
                    <li>
                        <span className={style.amount}>1 package</span> of vanilla sugar &asymp; <span className={style.amount}>5 tblsp</span>.
                    </li>
                }
                <li>
                    When <span className={style.ingredient}>vanilla sugar</span> is not available, use either <span className={style.ingredient}>(normal) sugar</span> or <span className={style.ingredient}>(normal) sugar and vanilla extract</span>.
                </li>
            </ul>
        </>
    }
}
