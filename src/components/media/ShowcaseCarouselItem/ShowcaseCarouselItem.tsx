import {Card, CardBody, CardFooter} from '../../cards'
import {Image} from '../Image'
import {cn} from '../../../utils/cn'
import type {ShowcaseCarouselItemProps} from './ShowcaseCarouselItem.types'
import './ShowcaseCarouselItem.css'

function ShowcaseCarouselItem({
    src,
    alt = '',
    overlay,
    body,
    footer,
    interactive = false,
    imageClickEffect = 'ripple',
    ratio = '16:9',
    fit = 'cover',
    imgProps,
    children,
}: ShowcaseCarouselItemProps) {
    const content = body ?? children

    return (
        <Card
            interactive={interactive}
            clickEffect={imageClickEffect !== 'none' ? 'none' : undefined}
            className={cn('showcase card', interactive && 'interactive')}
        >
            <div className='showcase media'>
                <Image
                    {...imgProps}
                    src={src}
                    alt={alt}
                    ratio={ratio}
                    fit={fit}
                    rounded
                    shadow
                    clickEffect={imageClickEffect}
                />
                {overlay ? <div className='showcase overlay'>{overlay}</div> : null}
            </div>
            {content ? <CardBody className='showcase body'>{content}</CardBody> : null}
            {footer ? <CardFooter className='showcase footer'>{footer}</CardFooter> : null}
        </Card>
    )
}

export default ShowcaseCarouselItem
