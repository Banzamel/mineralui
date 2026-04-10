import {useEffect, useRef} from 'react'

export type RevealProp = boolean | number

// Observe an element and trigger a CSS reveal animation when it enters the viewport.
export function useReveal<T extends HTMLElement = HTMLElement>(reveal: RevealProp | undefined) {
    const ref = useRef<T>(null)

    useEffect(() => {
        if (reveal === false || reveal === undefined) return

        const node = ref.current
        if (!node) return

        const delay = typeof reveal === 'number' ? reveal : 0
        if (delay > 0) {
            node.style.setProperty('--reveal-delay', `${delay}s`)
        }

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            node.classList.remove('reveal')
            node.classList.add('revealed')
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        node.classList.add('revealed')
                        observer.disconnect()
                    }
                }
            },
            {threshold: 0.2}
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [reveal])

    return ref
}
