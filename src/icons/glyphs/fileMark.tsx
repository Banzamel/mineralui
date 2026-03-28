import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

interface FileMarkProps extends IconProps {
    mark: string
    fill: string
    markColor?: string
    accent?: string
}

function getMarkSize(mark: string) {
    if (mark.length <= 3) {
        return 4
    }

    if (mark.length === 4) {
        return 3.35
    }

    return 3
}

export const FileMark = forwardRef<SVGSVGElement, FileMarkProps>(function FileMark(
    {mark, fill, markColor = '#f8fafc', accent, ...props},
    ref
) {
    const fontSize = getMarkSize(mark)

    return (
        <Icon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
            <path d="M14 3.5V8h4" />
            <path
                d="M6 11.15h12a1.35 1.35 0 0 1 1.35 1.35v4.4A1.35 1.35 0 0 1 18 18.25H6a1.35 1.35 0 0 1-1.35-1.35v-4.4A1.35 1.35 0 0 1 6 11.15z"
                fill={fill}
                stroke="none"
            />
            <path d="M7.2 9.7h5.6" stroke={accent ?? fill} />
            <text
                x="12"
                y="15.35"
                fill={markColor}
                stroke="none"
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
            >
                {mark}
            </text>
        </Icon>
    )
})
