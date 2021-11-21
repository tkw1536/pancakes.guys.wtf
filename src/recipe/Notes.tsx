import * as React from "react";
import Link from 'next/link';

import Variant, { AddVariant, VariantToURL } from "./Variant";
import style from './index.module.css';

export default class Notes extends React.Component<{ variant: Variant }> {
    render() {
        const { variant } = this.props;

        //
        // VEGAN VARIANT
        //

        const forVegans = AddVariant(variant, { vegan: !variant.vegan });
        const forVegansURL = VariantToURL(forVegans, true);

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
        const forAmericansURL = VariantToURL(forAmericans);

        let forAmericansContent: React.ReactNode;
        if (forAmericans.units === 'us') {
            forAmericansContent = <>
               If you're from the US, <Link href={forAmericansURL}><a>you can see this in customary units</a></Link>.
            </>;
        } else {
            forAmericansContent = <>
                Not from the US and <Link href={VariantToURL(forAmericans, true)}><a>confused about these units?</a></Link>
            </>;
        }
        
        return <>
            <h2>Notes</h2>

            <ul>
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
