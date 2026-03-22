import {useState, useEffect, useRef, useCallback} from 'react'

// Expose a value only after it stays stable for the given delay.
export function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounced
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Wrap a callback so repeated calls collapse into the latest invocation.
export function useDebouncedCallback<T extends (...args: any[]) => void>(callback: T, delay: number): T {
    const callbackRef = useRef(callback)
    callbackRef.current = callback
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

    return useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((...args: any[]) => {
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => callbackRef.current(...args), delay)
        }) as T,
        [delay]
    )
}
