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
            className={cn('tag', color, `tag--${variant}`, ...getAppearanceClassNames({fcolor}), className)}
            {...rest}
        >
            {icon && <span className="tag-icon">{icon}</span>}
            <span className="tag-label">{label}</span>
            {closable && (
                <button
                    type="button"
                    className="tag-close"
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
