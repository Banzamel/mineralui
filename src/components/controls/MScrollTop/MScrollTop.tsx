import {useState, useEffect, useCallback} from 'react'
import type {MScrollTopProps} from './MScrollTop.types'
import {MButton} from '../MButton'
import {MArrowUpIcon} from '../../../icons'
import {cn} from '../../../utils/cn'
import './MScrollTop.css'

export function MScrollTop({
    threshold = 300,
    variant = 'filled',
    color = 'primary',
    smooth = true,
    className,
}: MScrollTopProps) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        function onScroll() {
            setVisible(window.scrollY > threshold)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [threshold])

    const scrollToTop = useCallback(() => {
        window.scrollTo({top: 0, behavior: smooth ? 'smooth' : 'instant'})
    }, [smooth])

    return (
        <MButton
            variant={variant}
            color={color}
            shape="circle"
            size="lg"
            iconOnly
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={cn('scroll-top', visible && 'visible', className)}
        >
            <MArrowUpIcon />
        </MButton>
    )
}
