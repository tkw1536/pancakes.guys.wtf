export default Variant;
type Variant = Readonly<{
    units: 'metric' | 'us',
    vegan: boolean;
}>


function equals(a: Variant, b: Variant): boolean {
    return a.units === b.units && a.vegan === b.vegan;
}

/** AddVariant adds options to a variant */
export function AddVariant(base: Variant, extra: Partial<Variant>): Variant {
    return {...base, ...extra}
}

const VARIANT_URLS: Record<string, Variant> = {
    '': { units: 'metric', vegan: false },
    'vegan': { units: 'metric', vegan: true },

    '🇺🇸': { units: 'us', vegan: false },
    '🇺🇸/vegan': { units: 'us', vegan: true},
}
const DEFAULT_URL: string = '';
export const DEFAULT_VARIANT: Variant = VARIANT_URLS[DEFAULT_URL];

export const VARIANT_REDIRECTS = {
    'metric': 'vegan',
    'us': '🇺🇸/vegan',
}

/** Variant titles are titles of a variant */
export function VariantTitle(variant: Variant, short?: boolean): string {
    if (short) {
        return `${variant.vegan ? 'Vegan ': ''}Pancakes${ variant.units === 'us' ? ' (freedom 🇺🇸 units)' : ''}`;
    }

    let prefix = '';
    if (variant.units === 'us') prefix += 'Freedom 🇺🇸 ';
    if (variant.vegan) prefix += 'Vegan ';

    return `${prefix}Pancakes, served with ${variant.units !== 'us' ? 'maple ' : ''}syrup. `;
}

/** Returns a list of all variant URLS */
export function AllVariantURLS(): string[] {
    return Object.keys(VARIANT_URLS);
}

/** VariantToURL returns the URL suffix corresponding to a variant */
export function VariantToURL(variant: Variant, withPrefix?: boolean, multiplier?: number): string {
    multiplier = multiplier ?? 1;
    multiplier = isNaN(multiplier) ? 1 : multiplier;
    const prefix = withPrefix ? "/" : "";
    const entry = Object.entries(VARIANT_URLS).find(([_, v]) => equals(variant, v));
    const suffix = (multiplier ?? 1) !== 1 ? '#' + multiplier.toString() : '';
    if (typeof entry === 'undefined') return prefix + DEFAULT_URL + suffix;
    return prefix + entry[0] + suffix;
}

/** turns a URL into a variant */
export function URLToVariant(url: string): Variant {
    const hashIndex = url.indexOf('#');
    if (hashIndex >= 0) {
        url = url.substring(0, hashIndex);
    }
    const variant = VARIANT_URLS[url];
    if (variant === null || typeof variant === 'undefined') return DEFAULT_VARIANT;
    return variant;
}