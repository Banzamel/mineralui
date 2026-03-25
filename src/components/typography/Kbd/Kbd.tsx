import type {KbdProps} from './Kbd.types'
import {cn} from '../../../utils/cn'
import './Kbd.css'

export function Kbd({size = 'md', className, children, ...rest}: KbdProps) {
    return (
        <kbd className={cn('kbd', size, className)} {...rest}>
            {children}
        </kbd>
    )
}
