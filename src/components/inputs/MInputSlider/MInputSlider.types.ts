import type {MInputProps} from '../MInput'
import type {MSliderMark} from '../../controls'

export interface MInputSliderProps extends Omit<MInputProps, 'type' | 'onChange' | 'value' | 'clearable' | 'onClear'> {
    min?: number
    max?: number
    step?: number
    value?: number
    onChange?: (value: number) => void
    precision?: number
    marks?: MSliderMark[]
    showInput?: boolean
}
