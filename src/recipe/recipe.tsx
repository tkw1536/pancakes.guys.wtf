export const PEOPLE_MULTIPLIER_RATIO = 2;
export const PANCAKE_MULTIPLIER_RATIO = 6;
const MIN_MULTIPLIER = 1 / PEOPLE_MULTIPLIER_RATIO;

export function cleanMultiplier(no: number): number {
    if (isNaN(no) || !isFinite(no)) return MIN_MULTIPLIER;
    
    no = Math.round(no * PEOPLE_MULTIPLIER_RATIO) / PEOPLE_MULTIPLIER_RATIO; // round to nearest 1 / PEOPLE_MULTIPLIER_RATIO
    if (no < MIN_MULTIPLIER) return MIN_MULTIPLIER;

    return no;
}

export interface RecipeIngredient {
    metric: [number, string];
    ofMetric?: boolean;

    US: [number, string];
    ofUS?: boolean;

    name?: React.ReactNode,
    veganName?: React.ReactNode,

    note?: React.ReactNode,
    veganNote?: React.ReactNode,
}

const INGREDIENTS: RecipeIngredient[] = [
    {
        metric: [125, 'g'],
        US: [0.5, 'cup'],
        ofUS: true,
        name: 'flour'
    },
    {
        metric: [2, 'tblsp.'],
        US: [2, 'tblsp.'],
        ofUS: true,
        ofMetric: true,
        name: 'sugar',
    },
    {
        metric: [2, ''],
        US: [2, ''],
        name: 'eggs',
        veganName: null,
    },
    {
        metric: [0.5, 'teasp.'],
        US: [0.5, 'teasp.'],
        ofUS: true,
        ofMetric: true,
        name: 'salt'
    },
    {
        metric: [0.5, 'package'],
        ofMetric: true,
        US: [1, 'tblsp.'],
        ofUS: true,
        name: 'baking powder',
    },
    {
        metric: [0.5, 'package'],
        ofMetric: true,
        US: [5, 'tblsp.'],
        ofUS: true,
        name: 'vanilla sugar',
    },
    {
        metric: [250, 'ml'],
        ofMetric: true,
        US: [1, 'cup'],
        ofUS: true,
        
        name: 'milk',
        veganName: 'non-dairy milk',

        veganNote: <>(e.g. <a target ="_blank" rel="noopener noreferer" href="https://www.oatly.com/int/products/oat-drink-barista-edition">Oatly Barista edition</a>)</>
    },
    {
        metric: [100, 'g'],
        ofMetric: false,
        US:[0.5, 'cup'],
        ofUS: true,
        name: "blueberries (optional)"
    },
];
export default INGREDIENTS;