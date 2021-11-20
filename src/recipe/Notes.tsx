import * as React from "react";
import Link from 'next/link';

import Variant from "./Variant";
import style from './index.module.css';

export default class Notes extends React.Component<{ variant: Variant }> {
    render() {
        const { variant } = this.props;
        const { units } = variant;
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
                    For a vegan variant, replace <span className={style.ingredient}>milk</span> with <span className={style.ingredient}>non-dairy</span> milk. We recommend using <a target ="_blank" href="https://www.oatly.com/int/products/oat-drink-barista-edition">Oatly Barista edition</a>.
                </li>
            </ul>
        </>
    }
}
