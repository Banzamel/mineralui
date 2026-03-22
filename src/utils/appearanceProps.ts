import type {MineralColor, MineralFontColor} from '../theme'

export interface AppearanceProps {
    color?: MineralColor
    fcolor?: MineralFontColor
}

// Translate semantic appearance props into shared utility classes.
export function getAppearanceClassNames({color, fcolor}: AppearanceProps): Array<string | false | undefined> {
    return [color && `fcolor-${color}`, fcolor && `fcolor-${fcolor}`]
}
