import type {TagProps} from './Tag.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './Tag.css'

export function Tag({
    label,
    color = 'primary',
    variant = 'solid',
    closable = false,
    onClose,
    icon,
    fcolor,
    className,
    ...rest
}: TagProps) {
    return (
        <span
            className={cn('m-tag', color, variant, ...getAppearanceClassNames({fcolor}), className)}
            {...rest}
        >
            {icon && <span className="m-tag-icon">{icon}</span>}
            <span className="m-tag-label">{label}</span>
            {closable && (
                <button
                    type="button"
                    className="m-tag-close"
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose?.()
                    }}
                    aria-label="Remove"
                >
                    &#215;
                </button>
            )}
        </span>
    )
}
