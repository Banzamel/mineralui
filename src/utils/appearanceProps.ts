import type {MColor} from '../theme'

export interface AppearanceProps {
    color?: MColor
}

// Translate semantic appearance props into shared utility classes.
export function getAppearanceClassNames({color}: AppearanceProps): Array<string | false | undefined> {
    return [color && `fcolor-${color}`]
}
