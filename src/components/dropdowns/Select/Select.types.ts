import type {ReactNode, CSSProperties} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'

export type SelectVariant = 'outlined' | 'filled' | 'underlined'

export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
    group?: string
}

export interface SelectProps {
    options: SelectOption[]
    value?: string | string[]
    defaultValue?: string | string[]
    onChange?: (value: string | string[]) => void
    multiple?: boolean
    searchable?: boolean
    placeholder?: string
    disabled?: boolean
    name?: string
    id?: string
    variant?: SelectVariant
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    fullWidth?: boolean
    label?: string
    helperText?: string
    errorText?: string
    error?: boolean
    required?: boolean
    loading?: boolean
    clearable?: boolean
    maxHeight?: number
    noOptionsText?: string
    renderOption?: (option: SelectOption, isActive: boolean, isSelected: boolean) => ReactNode
    renderValue?: (selected: SelectOption | SelectOption[]) => ReactNode
    className?: string
    style?: CSSProperties
}
