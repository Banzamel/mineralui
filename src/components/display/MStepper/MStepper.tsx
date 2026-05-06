import {Children, isValidElement} from 'react'
import type {MStepperProps, MStepProps} from './MStepper.types'
import type {MSize} from '../../../theme'
import {cn} from '../../../utils/cn'
import {MCheckIcon} from '../../../icons'
import './MStepper.css'

const CHECK_SIZE: Record<MSize, number> = {xs: 10, sm: 14, md: 18, lg: 22, xl: 28}

export function MStep(_props: MStepProps) {
    return null
}

export function MStepper({
    activeStep,
    variant = 'horizontal',
    color = 'primary',
    size = 'md',
    clickable = false,
    onChange,
    className,
    children,
    ...rest
}: MStepperProps) {
    const steps = Children.toArray(children).filter((child) => isValidElement(child) && (child.type as any) === MStep)

    return (
        <div className={cn('stepper', variant, `color-${color}`, size, className)} role="list" {...rest}>
            {steps.map((child, index) => {
                if (!isValidElement<MStepProps>(child)) return null
                const {id, title, description, icon, disabled, optional, error} = child.props
                const isActive = index === activeStep
                const isCompleted = index < activeStep
                const isClickable = clickable && !disabled

                const handleClick = () => {
                    if (isClickable && onChange) {
                        onChange(index)
                    }
                }

                return (
                    <div
                        key={id}
                        className={cn(
                            'stepper-step',
                            isActive && 'active',
                            isCompleted && 'completed',
                            disabled && 'disabled',
                            error && 'error',
                            isClickable && 'clickable'
                        )}
                        role="listitem"
                        aria-current={isActive ? 'step' : undefined}
                    >
                        <div
                            className="stepper-indicator"
                            onClick={isClickable ? handleClick : undefined}
                            role={isClickable ? 'button' : undefined}
                            tabIndex={isClickable ? 0 : undefined}
                            onKeyDown={
                                isClickable
                                    ? (e) => {
                                          if (e.key === 'Enter' || e.key === ' ') {
                                              e.preventDefault()
                                              handleClick()
                                          }
                                      }
                                    : undefined
                            }
                        >
                            {error
                                ? '!'
                                : isCompleted
                                  ? (icon ?? <MCheckIcon size={CHECK_SIZE[size]} />)
                                  : (icon ?? index + 1)}
                        </div>
                        <div className="stepper-content">
                            <span className="stepper-title">{title}</span>
                            {description && <span className="stepper-description">{description}</span>}
                            {optional && <span className="stepper-optional">Optional</span>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
