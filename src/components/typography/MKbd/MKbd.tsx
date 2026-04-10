import type {MKbdProps} from './MKbd.types'
import {cn} from '../../../utils/cn'
import './MKbd.css'

export function MKbd({size = 'md', className, children, ...rest}: MKbdProps) {
    return (
        <kbd className={cn('kbd', size, className)} {...rest}>
            {children}
        </kbd>
    )
}
