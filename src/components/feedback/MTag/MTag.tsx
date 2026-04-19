import type {MTagProps} from './MTag.types'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import {MButton} from '../../controls'
import {MCloseIcon} from '../../../icons'
import './MTag.css'

export function MTag({
    label,
    color = 'primary',
    variant = 'solid',
    size = 'md',
    hidden,
    rounded = false,
    closable = false,
    onClose,
    icon,
    className,
    ...rest
}: MTagProps) {
    return (
        <span
            className={cn('m-tag', `color-${color}`, variant, size, rounded && 'rounded', className)}
            {...getHiddenProps(hidden)}
            {...rest}
        >
            {icon && <span className="m-tag icon">{icon}</span>}
            <span className="m-tag label">{label}</span>
            {closable && (
                <MButton
                    variant="link"
                    color="neutral"
                    iconOnly
                    size="xs"
                    className="m-tag close"
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose?.()
                    }}
                    aria-label="Remove"
                >
                    <MCloseIcon />
                </MButton>
            )}
        </span>
    )
}
