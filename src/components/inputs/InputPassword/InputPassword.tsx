import {useState, useCallback, useEffect, forwardRef} from 'react'
import type {InputPasswordProps, PasswordStrength} from './InputPassword.types'
import {Input} from '../Input'
import {cn} from '../../../utils/cn'
import './InputPassword.css'

// Approximate password strength with simple UI-focused heuristics.
function calcStrength(value: string): PasswordStrength {
    let score = 0
    if (value.length >= 8) score++
    if (value.length >= 12) score++
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++
    if (/\d/.test(value)) score++
    if (/[^a-zA-Z0-9]/.test(value)) score++

    if (score <= 1) return 'weak'
    if (score <= 2) return 'fair'
    if (score <= 3) return 'good'
    return 'strong'
}

const STRENGTH_LABELS: Record<PasswordStrength, string> = {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
}

// Extend the base input with password visibility and optional strength feedback.
export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(function InputPassword(
    {showToggle = true, showStrength = false, onStrengthChange, value, defaultValue, onChange, className, ...rest},
    ref
) {
    const [visible, setVisible] = useState(false)
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
    const currentValue = value !== undefined ? value.toString() : internalValue
    const strength = calcStrength(currentValue)

    useEffect(() => {
        onStrengthChange?.(strength)
    }, [strength, onStrengthChange])

    // Keep uncontrolled usage working while reporting changes to the caller.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (value === undefined) {
                setInternalValue(e.target.value)
            }
            onChange?.(e)
        },
        [onChange, value]
    )

    const toggleIcon = showToggle ? (
        <button
            type="button"
            className="password toggle"
            onClick={() => setVisible((v) => !v)}
            tabIndex={-1}
            aria-label={visible ? 'Hide password' : 'Show password'}
        >
            {visible ? '\u25E0' : '\u25C9'}
        </button>
    ) : undefined

    return (
        <div className={cn('password input', className)}>
            <Input
                {...rest}
                ref={ref}
                type={visible ? 'text' : 'password'}
                value={currentValue}
                onChange={handleChange}
                endIcon={toggleIcon}
            />
            {showStrength && currentValue.length > 0 && (
                <div className="password strength row">
                    <div className="password strength bar">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={cn(
                                    'password strength segment',
                                    i < ['weak', 'fair', 'good', 'strong'].indexOf(strength) + 1 &&
                                        `strength-${strength}`
                                )}
                            />
                        ))}
                    </div>
                    <span className={cn('password strength label', `strength-${strength}`)}>
                        {STRENGTH_LABELS[strength]}
                    </span>
                </div>
            )}
        </div>
    )
})
