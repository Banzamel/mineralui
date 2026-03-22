import type {CSSProperties} from 'react'
import {Spinner} from '../Spinner'
import {Stack} from '../../layout/Stack'
import {Text} from '../../typography/Text'
import {cn} from '../../../utils/cn'
import type {LoaderProps} from './Loader.types'
import './Loader.css'

// Keep loading feedback minimal so apps can reuse it without card or alert chrome.
export function Loader({
    color = 'primary',
    size = 'lg',
    label = 'Loading',
    center = true,
    minHeight = '40vh',
    className,
    style,
    ...rest
}: LoaderProps) {
    const inlineStyle: CSSProperties = {
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        ...style,
    }

    return (
        <div className={cn('loader', center && 'center', className)} style={inlineStyle} {...rest}>
            <Stack gap={'sm'} align={'center'}>
                <Spinner size={size} color={color} label={label} />
                <Text tone={'muted'} align={'center'}>
                    {label}
                </Text>
            </Stack>
        </div>
    )
}
