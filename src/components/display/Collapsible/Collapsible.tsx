import {useState} from 'react'
import {Button} from '../../controls'
import {Stack} from '../../layout'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import type {CollapsibleProps} from './Collapsible.types'
import {ChevronDownIcon} from '../../../icons'
import './Collapsible.css'

// Toggle a section of content with a built-in trigger and disclosure state.
export function Collapsible({
    title,
    defaultOpen = false,
    open: controlledOpen,
    onToggle,
    fcolor,
    className,
    children,
    ...rest
}: CollapsibleProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const open = controlledOpen ?? internalOpen

    const handleToggle = () => {
        const nextOpen = !open

        if (controlledOpen === undefined) {
            setInternalOpen(nextOpen)
        }

        onToggle?.(nextOpen)
    }

    const chevronIcon = (
        <span className={cn('chevron', open && 'open')} aria-hidden="true">
            <ChevronDownIcon />
        </span>
    )

    return (
        <div className={cn('collapsible', ...getAppearanceClassNames({fcolor}), className)} {...rest}>
            <Button
                variant="ghost"
                className="trigger"
                aria-expanded={open}
                onClick={handleToggle}
                endIcon={chevronIcon}
            >
                {title}
            </Button>
            <div className={cn('content-wrap', open && 'open')} aria-hidden={!open}>
                <Stack className="content">{children}</Stack>
            </div>
        </div>
    )
}
