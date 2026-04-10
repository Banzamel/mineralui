import type {CSSProperties} from 'react'
import type {MSize} from '../../../theme'
import {MSpinner} from '../MSpinner'
import {MStack} from '../../layout'
import {MText} from '../../typography'
import {cn} from '../../../utils/cn'
import type {MLoaderProps} from './MLoader.types'
import './MLoader.css'

const TEXT_SIZE: Record<MSize, MSize> = {xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'}

// Keep loading feedback minimal so apps can reuse it without card or alert chrome.
export function MLoader({
    color = 'primary',
    size = 'lg',
    label = 'Loading',
    center = true,
    minHeight = '40vh',
    className,
    style,
    ...rest
}: MLoaderProps) {
    const inlineStyle: CSSProperties = {
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        ...style,
    }

    return (
        <div className={cn('loader', center && 'center', className)} style={inlineStyle} {...rest}>
            <MStack align={'center'}>
                <MSpinner size={size} color={color} label={label} />
                <MText tone={'muted'} align={'center'} size={typeof size === 'number' ? undefined : TEXT_SIZE[size]}>
                    {label}
                </MText>
            </MStack>
        </div>
    )
}
