import * as React from 'react';

import Variant from "./Variant";
import { RecipeHeader } from "./RecipeHeader";
import Notes from "./Notes";
import Ingredients from "./Ingredients";


export default class RecipePage extends React.Component<{  root: string; variant: Variant;}> {
    render() {
        const { variant, root } = this.props;
        return <>
            <RecipeHeader root={root} variant={variant} />
            <Ingredients variant={variant} />
            <Notes variant={variant} />
        </>;
    }
}
