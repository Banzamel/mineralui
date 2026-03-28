import type {InputProps} from '../Input'
import type {SliderMark} from '../../controls'

export interface InputSliderProps extends Omit<InputProps, 'type' | 'onChange' | 'value'> {
    min?: number
    max?: number
    step?: number
    value?: number
    onChange?: (value: number) => void
    precision?: number
    marks?: SliderMark[]
    showInput?: boolean
}
