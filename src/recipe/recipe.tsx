export const PEOPLE_MULTIPLIER_RATIO = 2;
export const PANCAKE_MULTIPLIER_RATIO = 6;
const MIN_MULTIPLIER = 1 / PEOPLE_MULTIPLIER_RATIO;

export function cleanMultiplier(no: number, allowOptional: boolean): number {
    if (allowOptional && isNaN(no)) return NaN;
    if (isNaN(no) || !isFinite(no)) return MIN_MULTIPLIER;
    
    no = Math.round(no * PEOPLE_MULTIPLIER_RATIO) / PEOPLE_MULTIPLIER_RATIO; // round to nearest 1 / PEOPLE_MULTIPLIER_RATIO
    if (no < MIN_MULTIPLIER) return MIN_MULTIPLIER;

    return no;
}

export interface RecipeIngredient {
    quantity: [number, string];
    addOf?: boolean;

    name?: React.ReactNode,
    veganName?: React.ReactNode,

    note?: React.ReactNode,
    veganNote?: React.ReactNode,
}

const INGREDIENTS: RecipeIngredient[] = [
    {
        quantity: [125, 'g'],
        name: 'flour'
    },
    {
        quantity: [2, 'tblsp.'],
        addOf: true,
        name: 'sugar',
    },
    {
        quantity: [2, ''],
        name: 'eggs',
        veganName: null,
    },
    {
        quantity: [0.5, 'teasp.'],
        addOf: true,
        name: 'salt'
    },
    {
        quantity: [0.5, 'package'],
        addOf: true,
        name: 'baking powder',
    },
    {
        quantity: [0.5, 'package'],
        addOf: true,
        name: 'vanilla sugar',
    },
    {
        quantity: [250, 'ml'],
        addOf: true,
        
        name: 'milk',
        veganName: 'non-dairy milk',

        veganNote: <>(e.g. <a target ="_blank" rel="noopener noreferer" href="https://www.oatly.com/int/products/oat-drink-barista-edition">Oatly Barista edition</a>)</>
    },
    {
        quantity: [100, 'g'],
        addOf: false,
        name: "blueberries (optional)"
    },
];
export default INGREDIENTS;