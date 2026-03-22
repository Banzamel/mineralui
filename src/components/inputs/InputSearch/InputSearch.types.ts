import type {InputProps} from '../Input'

export interface InputSearchProps extends Omit<InputProps, 'type' | 'startIcon'> {
    debounceMs?: number
    onSearch?: (value: string) => void
}
