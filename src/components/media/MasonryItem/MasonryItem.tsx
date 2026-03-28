import {Card, CardBody, CardFooter} from '../../cards'
import {cn} from '../../../utils/cn'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './MasonryItem.css'
import type {MasonryItemProps} from './MasonryItem.types'

function MasonryItem({
    src,
    alt = '',
    height,
    overlay,
    body,
    footer,
    interactive = false,
    imageClickEffect = 'none',
    imgProps,
    children,
}: MasonryItemProps) {
    const imgStyle = height ? {...imgProps?.style, height} : imgProps?.style
    const content = body ?? children
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLDivElement>({
        effect: imageClickEffect,
    })

    return (
        <Card
            interactive={interactive}
            clickEffect={imageClickEffect !== 'none' ? 'none' : undefined}
            className={cn('masonry card', interactive && 'interactive')}
        >
            <div
                className={cn('masonry media', effectClassName)}
                onPointerDown={(event) => {
                    const target = event.target as HTMLElement

                    if (target.closest('.masonry.overlay')) {
                        return
                    }

                    handlePointerDown(event)
                }}
            >
                <img {...imgProps} src={src} alt={alt} className='masonry img' style={imgStyle} />
                {overlay ? <div className='masonry overlay'>{overlay}</div> : null}
                {effectLayer}
            </div>
            {content ? <CardBody className='masonry body'>{content}</CardBody> : null}
            {footer ? <CardFooter className='masonry footer'>{footer}</CardFooter> : null}
        </Card>
    )
}

export default MasonryItem
