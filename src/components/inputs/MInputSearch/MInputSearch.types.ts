import type {MInputProps} from '../MInput'

export interface MInputSearchProps extends Omit<MInputProps, 'type' | 'startIcon'> {
    debounceMs?: number
    onSearch?: (value: string) => void
}
