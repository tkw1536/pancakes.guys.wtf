export default Variant;
type Variant = Readonly<{
    units: 'metric' | 'us'
}>

export const DEFAULT_VARIANT: Variant = { units: 'metric' };
const DEFAULT_URL: string = '';
const VARIANT_URLS: Record<string, Variant> = {
    'metric': { units: 'metric'},
    'us': { units: 'us'},
}

/** Variant titles are titles of a variant */
export function VariantTitle(variant: Variant): string {
    return `Pancakes, served with ${variant.units !== 'us' ? 'maple ' : ''}syrup. `;
}

/** Returns a list of all variant URLS */
export function AllVariantURLS(): string[] {
    return Object.keys(VARIANT_URLS);
}

/** VariantToURL returns the URL suffix corresponding to a variant */
export function VariantToURL(variant: Variant): string {
    const entry = Object.entries(VARIANT_URLS).find(([_, v]) => equals(variant, v));
    if (typeof entry === 'undefined') return DEFAULT_URL;
    return entry[0];
}

/** turns a URL into a variant */
export function URLToVariant(url: string): Variant {
    const variant = VARIANT_URLS[url];
    if (variant === null || typeof variant === 'undefined') return DEFAULT_VARIANT;
    return variant;
}

function equals(a: Variant, b: Variant): boolean {
    return a.units === b.units;
}