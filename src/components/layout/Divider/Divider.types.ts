import type {CSSProperties, HTMLAttributes} from 'react'

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    className?: string
    style?: CSSProperties
}
