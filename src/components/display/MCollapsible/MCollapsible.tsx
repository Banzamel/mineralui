import {useState} from 'react'
import {MButton} from '../../controls'
import {MStack} from '../../layout'
import {cn} from '../../../utils/cn'
import type {MCollapsibleProps} from './MCollapsible.types'
import {MChevronDownIcon} from '../../../icons'
import './MCollapsible.css'

// MToggle a section of content with a built-in trigger and disclosure state.
export function MCollapsible({
    title,
    defaultOpen = false,
    open: controlledOpen,
    onToggle,
    color = 'primary',
    className,
    children,
    ...rest
}: MCollapsibleProps) {
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
            <MChevronDownIcon />
        </span>
    )

    return (
        <div className={cn('collapsible', className)} {...rest}>
            <MButton
                variant="ghost"
                color={color}
                className="trigger"
                aria-expanded={open}
                onClick={handleToggle}
                endIcon={chevronIcon}
            >
                {title}
            </MButton>
            <div className={cn('content-wrap', open && 'open')} aria-hidden={!open}>
                <MStack className="content">{children}</MStack>
            </div>
        </div>
    )
}
