import type {ReactNode, CSSProperties} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'

export type AutocompleteVariant = 'outlined' | 'filled' | 'underlined'

export interface AutocompleteProps<T = string> {
    options: T[]
    value?: T | T[]
    onChange?: (value: T | T[]) => void
    getOptionLabel?: (option: T) => string
    getOptionValue?: (option: T) => string
    filterOptions?: (options: T[], inputValue: string) => T[]
    multiple?: boolean
    freeSolo?: boolean
    debounceMs?: number
    onInputChange?: (value: string) => void
    loading?: boolean
    loadingText?: string
    noOptionsText?: string
    placeholder?: string
    disabled?: boolean
    name?: string
    id?: string
    variant?: AutocompleteVariant
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    fullWidth?: boolean
    label?: string
    helperText?: string
    errorText?: string
    error?: boolean
    required?: boolean
    clearable?: boolean
    maxHeight?: number
    renderOption?: (option: T, isActive: boolean) => ReactNode
    renderTags?: (selected: T[], onRemove: (index: number) => void) => ReactNode
    className?: string
    style?: CSSProperties
}
