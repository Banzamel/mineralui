import type {CSSProperties} from 'react'
import type {MineralFontColor} from '../theme'

// Keep the utility scale in one place so props and CSS stay in sync.
export const mineralUtilityScaleValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

export type MineralUtilityScale = (typeof mineralUtilityScaleValues)[number]

export interface LayoutUtilityProps {
    spacing?: MineralUtilityScale
    padding?: MineralUtilityScale
    fsize?: string | number
    fcolor?: MineralFontColor
    mt?: MineralUtilityScale
    mb?: MineralUtilityScale
    ml?: MineralUtilityScale
    mr?: MineralUtilityScale
    mx?: MineralUtilityScale
    my?: MineralUtilityScale
    pt?: MineralUtilityScale
    pb?: MineralUtilityScale
    pl?: MineralUtilityScale
    pr?: MineralUtilityScale
    px?: MineralUtilityScale
    py?: MineralUtilityScale
    fullWidth?: boolean
}

// Translate spacing and typography utility props into deterministic class names.
export function getLayoutUtilityClassNames({
    spacing,
    padding,
    fsize,
    fcolor,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
    fullWidth,
}: LayoutUtilityProps): Array<string | false | undefined> {
    return [
        spacing !== undefined && `spacing-${spacing}`,
        padding !== undefined && `padding-${padding}`,
        fsize !== undefined && 'has-fsize',
        fcolor && `fcolor-${fcolor}`,
        mt !== undefined && `mt-${mt}`,
        mb !== undefined && `mb-${mb}`,
        ml !== undefined && `ml-${ml}`,
        mr !== undefined && `mr-${mr}`,
        mx !== undefined && `mx-${mx}`,
        my !== undefined && `my-${my}`,
        pt !== undefined && `pt-${pt}`,
        pb !== undefined && `pb-${pb}`,
        pl !== undefined && `pl-${pl}`,
        pr !== undefined && `pr-${pr}`,
        px !== undefined && `px-${px}`,
        py !== undefined && `py-${py}`,
        fullWidth && 'full-width',
    ]
}

// Keep dynamic font sizes in CSS variables so layout helpers can accept any valid CSS length.
export function getLayoutUtilityStyles({fsize}: Pick<LayoutUtilityProps, 'fsize'>): CSSProperties | undefined {
    if (fsize === undefined || fsize === null || fsize === '') {
        return undefined
    }

    return {
        '--mineral-layout-fsize': typeof fsize === 'number' ? `${fsize}px` : fsize,
    } as CSSProperties
}
