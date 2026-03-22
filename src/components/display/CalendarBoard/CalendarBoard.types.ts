import type {ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode, RefObject} from 'react'

export type CalendarBoardLocale = 'pl' | 'en'
export type CalendarDetailsTrigger = 'click' | 'hover'
export type CalendarDetailsMode = 'auto' | 'popover' | 'modal'
export type CalendarEventStatus = 'planned' | 'active' | 'done' | 'cancelled'
export type CalendarTimelineSlotState = 'past' | 'active' | 'upcoming'
export type CalendarBoardView = 'month' | 'week'

export interface CalendarEventUser {
    id: string
    name: string
    avatar?: string
    color?: string
}

export interface CalendarEvent {
    id: string
    title: string
    description?: string
    date: string | Date
    startTime?: string
    endTime?: string
    type?: string
    status?: CalendarEventStatus
    color?: string
    badgeLabel?: string
    user?: CalendarEventUser
    meta?: Record<string, unknown>
}

export interface CalendarFilterOption {
    id: string
    label: string
    color?: string
    predicate: (event: CalendarEvent) => boolean
}

export interface CalendarDayRenderContext {
    date: Date
    events: CalendarEvent[]
    badge: ReactNode
    isToday: boolean
    isSelected: boolean
    isOutsideMonth: boolean
}

export interface CalendarDayCellProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    date: Date
    events?: CalendarEvent[]
    badge?: ReactNode
    markers?: ReactNode
    isToday?: boolean
    isSelected?: boolean
    isOutsideMonth?: boolean
    children?: ReactNode
}

export interface CalendarEventItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    event: CalendarEvent
    locale?: CalendarBoardLocale
    currentDate?: Date
}

export interface CalendarEventListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    events: CalendarEvent[]
    locale?: CalendarBoardLocale
    currentDate?: Date
    emptyStateText?: string
    renderEventItem?: (event: CalendarEvent) => ReactNode
}

export interface CalendarTimelineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    date: Date
    events: CalendarEvent[]
    locale?: CalendarBoardLocale
    startHour?: number
    endHour?: number
    emptyStateText?: string
}

export interface CalendarEventPopoverProps {
    open: boolean
    anchorRef: RefObject<HTMLElement | null>
    onClose: () => void
    onPointerEnter?: () => void
    onPointerLeave?: () => void
    date: Date | null
    events: CalendarEvent[]
    locale?: CalendarBoardLocale
    timelineStartHour?: number
    timelineEndHour?: number
    showTimeline?: boolean
    emptyStateText?: string
    className?: string
    style?: CSSProperties
    renderEventItem?: (event: CalendarEvent) => ReactNode
}

export interface CalendarBoardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    month?: Date
    defaultMonth?: Date
    onMonthChange?: (month: Date) => void
    events?: CalendarEvent[]
    locale?: CalendarBoardLocale
    weekStartsOn?: 0 | 1
    view?: CalendarBoardView
    defaultView?: CalendarBoardView
    views?: CalendarBoardView[]
    onViewChange?: (view: CalendarBoardView) => void
    selectedDate?: Date | string | null
    defaultSelectedDate?: Date | string | null
    onDayClick?: (day: Date, events: CalendarEvent[]) => void
    dayBadge?: (day: Date, events: CalendarEvent[]) => ReactNode
    renderDayCell?: (day: Date, context: CalendarDayRenderContext) => ReactNode
    renderEventItem?: (event: CalendarEvent) => ReactNode
    detailsTrigger?: CalendarDetailsTrigger
    detailsMode?: CalendarDetailsMode
    showTimeline?: boolean
    timelineStartHour?: number
    timelineEndHour?: number
    emptyStateText?: string
    filters?: CalendarFilterOption[]
    activeFilters?: string[]
    defaultActiveFilters?: string[]
    onActiveFiltersChange?: (activeFilters: string[]) => void
    fullWidth?: boolean
}
