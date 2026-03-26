import {useCallback, useState} from 'react'

type ControllableStringLike = string | number | readonly string[] | null | undefined

// Normalize mixed input values so text-like controls always work with strings.
function normalizeStringValue(value: ControllableStringLike) {
    if (value === null || value === undefined) {
        return ''
    }

    return value.toString()
}

// Share controlled and uncontrolled string state logic between text-like primitives.
export function useControllableString(value: ControllableStringLike, defaultValue?: ControllableStringLike) {
    const [internalValue, setInternalValue] = useState(() => normalizeStringValue(defaultValue))
    const isControlled = value !== undefined
    const currentValue = isControlled ? normalizeStringValue(value) : internalValue

    const setCurrentValue = useCallback(
        (nextValue: string) => {
            if (!isControlled) {
                setInternalValue(nextValue)
            }
        },
        [isControlled]
    )

    return {
        isControlled,
        currentValue,
        setCurrentValue,
    }
}
