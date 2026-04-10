import {forwardRef, useMemo} from 'react'
import type {MButtonGroupProps} from './MButtonGroup.types'
import {ButtonGroupContext} from './MButtonGroupContext'
import type {MButtonGroupContextValue} from './MButtonGroupContext'
import {cn} from '../../../utils/cn'
import './MButtonGroup.css'

export const MButtonGroup = forwardRef<HTMLDivElement, MButtonGroupProps>(function MButtonGroup(
    {orientation = 'horizontal', variant, size, color, attached = true, className, children, ...rest},
    ref
) {
    const ctx = useMemo<MButtonGroupContextValue>(() => ({variant, size, color}), [variant, size, color])

    return (
        <ButtonGroupContext.Provider value={ctx}>
            <div
                ref={ref}
                role="group"
                className={cn('button-group', orientation, attached && 'attached', className)}
                {...rest}
            >
                {children}
            </div>
        </ButtonGroupContext.Provider>
    )
})
