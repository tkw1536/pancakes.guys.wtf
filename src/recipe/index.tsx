import * as React from 'react';

import Variant from "./Variant";
import { RecipeHeader } from "./RecipeHeader";
import Notes from "./Notes";
import Ingredients from "./Ingredients";
import { cleanMultiplier } from "./recipe";


export default class RecipePage extends React.Component<{  root: string; variant: Variant;}> {
    state = { multiplier: 1 };

    private onChange = (multiplier: number) => {
        this.setState({ multiplier: cleanMultiplier(multiplier) }, () => {
            const { multiplier } = this.state;
            if (multiplier === 1) {
                location.hash = '';
                return;
            }
            location.hash = '#' + multiplier.toString()
        })
    }

    componentDidMount(): void {
        if (location.hash === "") return;

        const multiplier = cleanMultiplier(parseFloat(location.hash.substring(1)));
        this.setState({ multiplier: multiplier });
    }

    render() {
        const { variant, root } = this.props;
        const { multiplier } = this.state;
        return <>
            <RecipeHeader root={root} variant={variant} multiplier={multiplier} />
            <Ingredients variant={variant} multiplier={multiplier} />
            <Notes variant={variant} multiplier={multiplier} changeMultiplier={this.onChange} />
        </>;
    }
}