import {useEffect, useMemo, useRef, useState} from 'react'
import type {ReactNode, RefObject} from 'react'
import type {
    CalendarBoardLocale,
    CalendarBoardProps,
    CalendarBoardView,
    CalendarDayCellProps,
    CalendarDetailsMode,
    CalendarEvent,
    CalendarEventItemProps,
    CalendarEventListProps,
    CalendarEventPopoverProps,
    CalendarFilterOption,
    CalendarTimelineProps,
    CalendarTimelineSlotState,
} from './CalendarBoard.types'
import {cn} from '../../../utils/cn'
import {Badge} from '../Badge'
import {Button} from '../../controls/Button'
import {Avatar} from '../Avatar'
import {Card, CardBody} from '../Card'
import {Modal} from '../Modal'
import {Popover} from '../../primitives/Popover'
import {Heading, Text} from '../../typography'
import {Stack} from '../../layout/Stack'
import './CalendarBoard.css'

interface CalendarCopy {
    monthView: string
    weekView: string
    previousMonth: string
    nextMonth: string
    previousWeek: string
    nextWeek: string
    emptyStateText: string
    timelineTitle: string
    timelineEmptyState: string
    allDay: string
    itemsCount: (count: number) => string
}

interface CalendarDetailsContentProps {
    date: Date | null
    events: CalendarEvent[]
    locale: CalendarBoardLocale
    timelineStartHour: number
    timelineEndHour: number
    showTimeline: boolean
    emptyStateText: string
    renderEventItem?: (event: CalendarEvent) => ReactNode
}

interface CalendarWeekViewProps {
    days: Date[]
    eventsByDay: Map<string, CalendarEvent[]>
    selectedDate: Date | null
    activeDate: Date | null
    onDayInteract: (date: Date, target: HTMLElement, events: CalendarEvent[]) => void
    onDayHover: (date: Date, target: HTMLElement, events: CalendarEvent[]) => void
    onDayLeave: () => void
    dayBadge?: CalendarBoardProps['dayBadge']
    renderDayCell?: CalendarBoardProps['renderDayCell']
    locale: CalendarBoardLocale
}

function stripTime(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function normalizeDate(value?: Date | string | null) {
    if (!value) {
        return null
    }

    if (value instanceof Date) {
        return stripTime(value)
    }

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
        return null
    }

    return stripTime(parsed)
}

function getDateKey(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function getEventDate(event: CalendarEvent) {
    return normalizeDate(event.date)
}

function addDays(date: Date, amount: number) {
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + amount)
    return stripTime(nextDate)
}

function startOfWeek(date: Date, weekStartsOn: 0 | 1) {
    const safeDate = stripTime(date)
    const day = safeDate.getDay()
    const delta = (day - weekStartsOn + 7) % 7
    return addDays(safeDate, -delta)
}

function sortEventsByTime(events: CalendarEvent[]) {
    return [...events].sort((leftEvent, rightEvent) => {
        const leftTime = leftEvent.startTime ?? '99:99'
        const rightTime = rightEvent.startTime ?? '99:99'
        return leftTime.localeCompare(rightTime)
    })
}

function buildMonthGrid(month: Date, weekStartsOn: 0 | 1) {
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1)
    const gridStart = startOfWeek(monthStart, weekStartsOn)

    return Array.from({length: 42}, (_, index) => addDays(gridStart, index))
}

function getStatusColor(status?: CalendarEvent['status']) {
    switch (status) {
        case 'active':
            return 'rgba(14, 165, 233, 1)'
        case 'done':
            return 'rgba(34, 197, 94, 1)'
        case 'cancelled':
            return 'rgba(239, 68, 68, 1)'
        default:
            return 'rgba(245, 158, 11, 1)'
    }
}

function getCalendarCopy(locale: CalendarBoardLocale): CalendarCopy {
    if (locale === 'pl') {
        return {
            monthView: 'Miesiac',
            weekView: 'Tydzien',
            previousMonth: 'Poprzedni miesiac',
            nextMonth: 'Nastepny miesiac',
            previousWeek: 'Poprzedni tydzien',
            nextWeek: 'Nastepny tydzien',
            emptyStateText: 'Brak zdarzen dla wybranego dnia.',
            timelineTitle: 'Os czasu dnia',
            timelineEmptyState: 'Brak zdarzen w tej godzinie.',
            allDay: 'Caly dzien',
            itemsCount: (count) => `${count} zdarzen`,
        }
    }

    return {
        monthView: 'Month',
        weekView: 'Week',
        previousMonth: 'Previous month',
        nextMonth: 'Next month',
        previousWeek: 'Previous week',
        nextWeek: 'Next week',
        emptyStateText: 'No events for the selected day.',
        timelineTitle: 'Daily timeline',
        timelineEmptyState: 'No events in this hour.',
        allDay: 'All day',
        itemsCount: (count) => `${count} events`,
    }
}

function formatBoardDate(date: Date, locale: CalendarBoardLocale) {
    return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date)
}

function formatWeekRange(startDate: Date, locale: CalendarBoardLocale) {
    const endDate = addDays(startDate, 6)
    const formatter = new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
        day: 'numeric',
        month: 'short',
    })

    return `${formatter.format(startDate)} - ${formatter.format(endDate)}`
}

function formatEventTime(event: CalendarEvent, copy: CalendarCopy) {
    if (event.startTime && event.endTime) {
        return `${event.startTime} - ${event.endTime}`
    }

    if (event.startTime) {
        return event.startTime
    }

    return copy.allDay
}

function getTimelineSlotState(date: Date, hour: number): CalendarTimelineSlotState {
    const now = new Date()
    const slotStart = new Date(date)
    slotStart.setHours(hour, 0, 0, 0)
    const slotEnd = new Date(slotStart)
    slotEnd.setHours(hour + 1, 0, 0, 0)

    if (slotEnd <= now) {
        return 'past'
    }

    if (slotStart <= now && slotEnd > now) {
        return 'active'
    }

    return 'upcoming'
}

function buildDayMarkers(events: CalendarEvent[]) {
    return sortEventsByTime(events)
        .slice(0, 4)
        .map((event) => (
            <span
                key={event.id}
                className={'marker'}
                style={{background: event.color ?? getStatusColor(event.status)}}
                aria-hidden={'true'}
            />
        ))
}

function applyCalendarFilters(events: CalendarEvent[], filters: CalendarFilterOption[], activeFilterIds: string[]) {
    if (!filters.length || !activeFilterIds.length) {
        return events
    }

    const activeFilters = filters.filter((filterOption) => activeFilterIds.includes(filterOption.id))
    if (!activeFilters.length) {
        return events
    }

    return events.filter((event) => activeFilters.some((filterOption) => filterOption.predicate(event)))
}

function getViewTitle(month: Date, view: CalendarBoardView, locale: CalendarBoardLocale, weekStartsOn: 0 | 1) {
    if (view === 'week') {
        return formatWeekRange(startOfWeek(month, weekStartsOn), locale)
    }

    return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
        month: 'long',
        year: 'numeric',
    }).format(month)
}

function getViewSubtitle(view: CalendarBoardView, copy: CalendarCopy) {
    return view === 'week' ? copy.weekView : copy.monthView
}

function CalendarDetailsContent({
    date,
    events,
    locale,
    timelineStartHour,
    timelineEndHour,
    showTimeline,
    emptyStateText,
    renderEventItem,
}: CalendarDetailsContentProps) {
    if (!date) {
        return null
    }

    return (
        <Stack gap={'md'}>
            <Stack gap={'xs'}>
                <Heading level={4}>{formatBoardDate(date, locale)}</Heading>
                <Text tone={'muted'} size={'sm'}>
                    {events.length > 0 ? `${events.length} items` : emptyStateText}
                </Text>
            </Stack>
            <CalendarEventList
                events={events}
                locale={locale}
                currentDate={date}
                emptyStateText={emptyStateText}
                renderEventItem={renderEventItem}
            />
            {showTimeline && (
                <CalendarTimeline
                    date={date}
                    events={events}
                    locale={locale}
                    startHour={timelineStartHour}
                    endHour={timelineEndHour}
                />
            )}
        </Stack>
    )
}

function CalendarFilters({
    filters,
    activeFilterIds,
    onToggle,
}: {
    filters: CalendarFilterOption[]
    activeFilterIds: string[]
    onToggle: (filterId: string) => void
}) {
    if (!filters.length) {
        return null
    }

    return (
        <div className={'calendar-board-filters'}>
            {filters.map((filterOption) => {
                const isActive = activeFilterIds.includes(filterOption.id)

                return (
                    <Button
                        key={filterOption.id}
                        type={'button'}
                        size={'sm'}
                        variant={isActive ? 'primary' : 'outlined'}
                        color={isActive ? 'primary' : 'neutral'}
                        className={'calendar-board-filter-btn'}
                        onClick={() => onToggle(filterOption.id)}
                    >
                        {filterOption.label}
                    </Button>
                )
            })}
        </div>
    )
}
function CalendarWeekView({
    days,
    eventsByDay,
    selectedDate,
    activeDate,
    onDayInteract,
    onDayHover,
    onDayLeave,
    dayBadge,
    renderDayCell,
    locale,
}: CalendarWeekViewProps) {
    const todayKey = getDateKey(stripTime(new Date()))

    return (
        <div className={'calendar-board-week'}>
            {days.map((day) => {
                const dayKey = getDateKey(day)
                const dayEvents = eventsByDay.get(dayKey) ?? []
                const badge =
                    dayBadge?.(day, dayEvents) ??
                    (dayEvents.length > 0 ? <Badge size={'sm'}>{dayEvents.length}</Badge> : null)
                const markers = buildDayMarkers(dayEvents)
                const isSelected = Boolean(selectedDate && getDateKey(selectedDate) === dayKey)
                const context = {
                    date: day,
                    events: dayEvents,
                    badge,
                    isToday: dayKey === todayKey,
                    isSelected,
                    isOutsideMonth: false,
                }

                return (
                    <div key={dayKey} className={'calendar-board-week-col'}>
                        <CalendarDayCell
                            date={day}
                            events={dayEvents}
                            badge={badge}
                            markers={markers}
                            isToday={context.isToday}
                            isSelected={isSelected || Boolean(activeDate && getDateKey(activeDate) === dayKey)}
                            isOutsideMonth={false}
                            onClick={(event) => onDayInteract(day, event.currentTarget, dayEvents)}
                            onMouseEnter={(event) => onDayHover(day, event.currentTarget, dayEvents)}
                            onMouseLeave={onDayLeave}
                        >
                            {renderDayCell ? renderDayCell(day, context) : undefined}
                        </CalendarDayCell>
                    </div>
                )
            })}
        </div>
    )
}

export function CalendarDayCell({
    date,
    events = [],
    badge,
    markers,
    isToday = false,
    isSelected = false,
    isOutsideMonth = false,
    className,
    children,
    ...rest
}: CalendarDayCellProps) {
    return (
        <button
            type={'button'}
            className={cn(
                'calendar-day-cell',
                isToday && 'today',
                isSelected && 'selected',
                isOutsideMonth && 'outside-month',
                className
            )}
            {...rest}
        >
            {children ?? (
                <>
                    <div className={'day-header'}>
                        <span className={'day-number'}>{date.getDate()}</span>
                        <div className={'day-meta'}>{badge}</div>
                    </div>
                    <div className={'markers'}>{markers ?? buildDayMarkers(events)}</div>
                </>
            )}
        </button>
    )
}

export function CalendarEventItem({event, locale = 'en', className, currentDate, ...rest}: CalendarEventItemProps) {
    const copy = getCalendarCopy(locale)
    const statusColor =
        event.status === 'cancelled'
            ? 'error'
            : event.status === 'done'
              ? 'success'
              : event.status === 'active'
                ? 'info'
                : 'warning'

    return (
        <div className={cn('calendar-event-item', className)} {...rest}>
            <div className={'event-time'}>{formatEventTime(event, copy)}</div>
            <div className={'event-content'}>
                <div className={'event-title-row'}>
                    <Heading level={5}>{event.title}</Heading>
                    {event.status && (
                        <Badge color={statusColor} size={'sm'}>
                            {event.status}
                        </Badge>
                    )}
                </div>
                {event.description && (
                    <Text size={'sm'} tone={'muted'}>
                        {event.description}
                    </Text>
                )}
                <div className={'event-details'}>
                    {event.type && (
                        <Badge color={'neutral'} size={'sm'}>
                            {event.type}
                        </Badge>
                    )}
                    {event.badgeLabel && <Badge size={'sm'}>{event.badgeLabel}</Badge>}
                    {event.user && (
                        <span className={'event-user'}>
                            <Avatar
                                size={'sm'}
                                src={event.user.avatar}
                                name={event.user.name}
                                backgroundColor={event.user.color}
                            />
                            {event.user.name}
                        </span>
                    )}
                    {!event.startTime && !event.endTime && currentDate && (
                        <Text size={'sm'} tone={'muted'}>
                            {formatBoardDate(currentDate, locale)}
                        </Text>
                    )}
                </div>
            </div>
        </div>
    )
}

export function CalendarEventList({
    events,
    locale = 'en',
    currentDate,
    emptyStateText,
    renderEventItem,
    className,
    ...rest
}: CalendarEventListProps) {
    const copy = getCalendarCopy(locale)

    if (!events.length) {
        return (
            <Text size={'sm'} tone={'muted'} className={cn('calendar-event-list', className)} {...rest}>
                {emptyStateText ?? copy.emptyStateText}
            </Text>
        )
    }

    return (
        <div className={cn('calendar-event-list', className)} {...rest}>
            <Stack gap={'sm'}>
                {sortEventsByTime(events).map((event) =>
                    renderEventItem ? (
                        <div key={event.id}>{renderEventItem(event)}</div>
                    ) : (
                        <CalendarEventItem key={event.id} event={event} locale={locale} currentDate={currentDate} />
                    )
                )}
            </Stack>
        </div>
    )
}
export function CalendarTimeline({
    date,
    events,
    locale = 'en',
    startHour = 6,
    endHour = 22,
    emptyStateText,
    className,
    ...rest
}: CalendarTimelineProps) {
    const copy = getCalendarCopy(locale)
    const hours = Array.from({length: Math.max(endHour - startHour + 1, 1)}, (_, index) => startHour + index)

    return (
        <div className={cn('calendar-timeline', className)} {...rest}>
            <Stack gap={'sm'}>
                <Heading level={5}>{copy.timelineTitle}</Heading>
                <div className={'timeline-slots'}>
                    {hours.map((hour) => {
                        const matchingEvents = events.filter((event) => {
                            if (!event.startTime) {
                                return false
                            }

                            return Number(event.startTime.split(':')[0]) === hour
                        })
                        const slotState = getTimelineSlotState(date, hour)

                        return (
                            <div key={hour} className={cn('timeline-slot', slotState)}>
                                <div className={'slot-time'}>{`${String(hour).padStart(2, '0')}:00`}</div>
                                <div className={'slot-line'} />
                                <div className={'slot-content'}>
                                    {matchingEvents.length > 0 ? (
                                        <Stack gap={'xs'}>
                                            {matchingEvents.map((event) => (
                                                <div key={event.id} className={'slot-event'}>
                                                    <span
                                                        className={'slot-event-dot'}
                                                        style={{
                                                            background: event.color ?? getStatusColor(event.status),
                                                        }}
                                                    />
                                                    <Text size={'sm'}>{event.title}</Text>
                                                </div>
                                            ))}
                                        </Stack>
                                    ) : (
                                        <Text size={'sm'} tone={'muted'}>
                                            {emptyStateText ?? copy.timelineEmptyState}
                                        </Text>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Stack>
        </div>
    )
}

export function CalendarEventPopover({
    open,
    anchorRef,
    onClose,
    onPointerEnter,
    onPointerLeave,
    date,
    events,
    locale = 'en',
    timelineStartHour = 6,
    timelineEndHour = 22,
    showTimeline = true,
    emptyStateText,
    renderEventItem,
    className,
    style,
}: CalendarEventPopoverProps) {
    return (
        <Popover
            open={open}
            anchorRef={anchorRef}
            onClose={onClose}
            placement={'bottom-start'}
            className={cn('calendar-board-popover', className)}
            style={style}
        >
            <Card className={'calendar-event-popover'} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
                <CardBody>
                    <CalendarDetailsContent
                        date={date}
                        events={events}
                        locale={locale}
                        timelineStartHour={timelineStartHour}
                        timelineEndHour={timelineEndHour}
                        showTimeline={showTimeline}
                        emptyStateText={emptyStateText ?? getCalendarCopy(locale).emptyStateText}
                        renderEventItem={renderEventItem}
                    />
                </CardBody>
            </Card>
        </Popover>
    )
}

export function CalendarBoard({
    month,
    defaultMonth,
    onMonthChange,
    events = [],
    locale = 'en',
    weekStartsOn = 1,
    view,
    defaultView = 'month',
    views = ['month', 'week'],
    onViewChange,
    selectedDate,
    defaultSelectedDate,
    onDayClick,
    dayBadge,
    renderDayCell,
    renderEventItem,
    detailsTrigger = 'click',
    detailsMode = 'auto',
    showTimeline = true,
    timelineStartHour = 6,
    timelineEndHour = 22,
    emptyStateText,
    filters = [],
    activeFilters,
    defaultActiveFilters = [],
    onActiveFiltersChange,
    fullWidth = false,
    className,
    ...rest
}: CalendarBoardProps) {
    const copy = getCalendarCopy(locale)
    const today = stripTime(new Date())
    const [internalMonth, setInternalMonth] = useState(stripTime(defaultMonth ?? month ?? today))
    const [internalView, setInternalView] = useState<CalendarBoardView>(defaultView)
    const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(normalizeDate(defaultSelectedDate))
    const [internalActiveFilters, setInternalActiveFilters] = useState<string[]>(defaultActiveFilters)
    const [activeDate, setActiveDate] = useState<Date | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [isCompact, setIsCompact] = useState(false)
    const activeAnchorRef = useRef<HTMLElement | null>(null)
    const closeTimeoutRef = useRef<number | null>(null)

    const isMonthControlled = month !== undefined && typeof onMonthChange === 'function'
    const visibleMonth = stripTime(isMonthControlled ? (month ?? internalMonth) : internalMonth)
    const currentView = view ?? internalView
    const resolvedSelectedDate = normalizeDate(selectedDate) ?? internalSelectedDate
    const resolvedActiveFilters = activeFilters ?? internalActiveFilters

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        const updateCompactState = () => setIsCompact(mediaQuery.matches)

        updateCompactState()
        mediaQuery.addEventListener('change', updateCompactState)

        return () => mediaQuery.removeEventListener('change', updateCompactState)
    }, [])

    useEffect(() => {
        if (isMonthControlled && month) {
            setInternalMonth(stripTime(month))
        }
    }, [isMonthControlled, month])

    useEffect(() => {
        if (view) {
            setInternalView(view)
        }
    }, [view])

    useEffect(() => {
        if (selectedDate !== undefined) {
            setInternalSelectedDate(normalizeDate(selectedDate))
        }
    }, [selectedDate])

    useEffect(
        () => () => {
            if (closeTimeoutRef.current) {
                window.clearTimeout(closeTimeoutRef.current)
            }
        },
        []
    )

    const filteredEvents = useMemo(
        () => applyCalendarFilters(events, filters, resolvedActiveFilters),
        [events, filters, resolvedActiveFilters]
    )

    const eventsByDay = useMemo(() => {
        const nextMap = new Map<string, CalendarEvent[]>()

        filteredEvents.forEach((event) => {
            const eventDate = getEventDate(event)
            if (!eventDate) {
                return
            }

            const key = getDateKey(eventDate)
            const currentEvents = nextMap.get(key) ?? []
            currentEvents.push(event)
            nextMap.set(key, currentEvents)
        })

        return nextMap
    }, [filteredEvents])
    const calendarDays = useMemo(() => {
        if (currentView === 'week') {
            const baseDate = resolvedSelectedDate ?? visibleMonth
            const weekStart = startOfWeek(baseDate, weekStartsOn)
            return Array.from({length: 7}, (_, index) => addDays(weekStart, index))
        }

        return buildMonthGrid(visibleMonth, weekStartsOn)
    }, [currentView, resolvedSelectedDate, visibleMonth, weekStartsOn])

    const effectiveDetailsMode: CalendarDetailsMode =
        detailsMode === 'auto' ? (isCompact ? 'modal' : 'popover') : detailsMode
    const activeEvents = activeDate ? (eventsByDay.get(getDateKey(activeDate)) ?? []) : []
    const canShowMonthView = views.includes('month')
    const canShowWeekView = views.includes('week')

    const setMonthAndNotify = (nextMonth: Date) => {
        const normalizedMonth = stripTime(nextMonth)
        setInternalMonth(normalizedMonth)
        onMonthChange?.(normalizedMonth)
    }

    const navigateBy = (amount: number) => {
        if (currentView === 'week') {
            const nextAnchor = addDays(resolvedSelectedDate ?? visibleMonth, amount * 7)
            setMonthAndNotify(nextAnchor)
            setInternalSelectedDate(nextAnchor)
            setActiveDate(nextAnchor)
            setDetailsOpen(false)
            return
        }

        const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + amount, 1)
        setMonthAndNotify(nextMonth)
        setDetailsOpen(false)
        setActiveDate(null)
    }

    const setViewAndNotify = (nextView: CalendarBoardView) => {
        setInternalView(nextView)
        onViewChange?.(nextView)
    }

    const setSelectedDateAndNotify = (nextDate: Date, dayEvents: CalendarEvent[]) => {
        const normalizedDate = stripTime(nextDate)
        setInternalSelectedDate(normalizedDate)
        onDayClick?.(normalizedDate, dayEvents)
    }

    const clearCloseTimeout = () => {
        if (closeTimeoutRef.current) {
            window.clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
    }

    const scheduleClose = () => {
        clearCloseTimeout()
        closeTimeoutRef.current = window.setTimeout(() => {
            setDetailsOpen(false)
        }, 180)
    }

    const openDetails = (date: Date, target: HTMLElement, dayEvents: CalendarEvent[]) => {
        activeAnchorRef.current = target
        setActiveDate(date)
        setSelectedDateAndNotify(date, dayEvents)
        setDetailsOpen(true)
    }

    const handleDayInteract = (date: Date, target: HTMLElement, dayEvents: CalendarEvent[]) => {
        clearCloseTimeout()
        openDetails(date, target, dayEvents)

        if (currentView === 'month' && date.getMonth() !== visibleMonth.getMonth()) {
            setMonthAndNotify(new Date(date.getFullYear(), date.getMonth(), 1))
        }
    }

    const handleDayHover = (date: Date, target: HTMLElement, dayEvents: CalendarEvent[]) => {
        if (detailsTrigger !== 'hover' || effectiveDetailsMode !== 'popover') {
            return
        }

        clearCloseTimeout()
        openDetails(date, target, dayEvents)
    }

    const handleFilterToggle = (filterId: string) => {
        const nextFilters = resolvedActiveFilters.includes(filterId)
            ? resolvedActiveFilters.filter((id) => id !== filterId)
            : [...resolvedActiveFilters, filterId]

        setInternalActiveFilters(nextFilters)
        onActiveFiltersChange?.(nextFilters)
    }

    const dayNameBase = startOfWeek(
        currentView === 'week' ? (resolvedSelectedDate ?? visibleMonth) : visibleMonth,
        weekStartsOn
    )

    return (
        <div className={cn('calendar-board', fullWidth && 'full-width', className)} {...rest}>
            <div className={'calendar-board-header'}>
                <Stack gap={'xs'}>
                    <Heading level={3}>{getViewTitle(visibleMonth, currentView, locale, weekStartsOn)}</Heading>
                    <Text size={'sm'} tone={'muted'}>
                        {getViewSubtitle(currentView, copy)}
                    </Text>
                </Stack>
                <Stack gap={'sm'} align={'end'}>
                    <div className={'calendar-board-actions'}>
                        <Button
                            type={'button'}
                            size={'sm'}
                            variant={'outlined'}
                            color={'neutral'}
                            onClick={() => navigateBy(-1)}
                        >
                            {currentView === 'week' ? copy.previousWeek : copy.previousMonth}
                        </Button>
                        <Button
                            type={'button'}
                            size={'sm'}
                            variant={'outlined'}
                            color={'neutral'}
                            onClick={() => navigateBy(1)}
                        >
                            {currentView === 'week' ? copy.nextWeek : copy.nextMonth}
                        </Button>
                    </div>
                    {(canShowMonthView || canShowWeekView) && (
                        <div className={'calendar-board-views'}>
                            {canShowMonthView && (
                                <Button
                                    type={'button'}
                                    size={'sm'}
                                    variant={currentView === 'month' ? 'primary' : 'outlined'}
                                    color={currentView === 'month' ? 'primary' : 'neutral'}
                                    onClick={() => setViewAndNotify('month')}
                                >
                                    {copy.monthView}
                                </Button>
                            )}
                            {canShowWeekView && (
                                <Button
                                    type={'button'}
                                    size={'sm'}
                                    variant={currentView === 'week' ? 'primary' : 'outlined'}
                                    color={currentView === 'week' ? 'primary' : 'neutral'}
                                    onClick={() => setViewAndNotify('week')}
                                >
                                    {copy.weekView}
                                </Button>
                            )}
                        </div>
                    )}
                </Stack>
            </div>

            <CalendarFilters filters={filters} activeFilterIds={resolvedActiveFilters} onToggle={handleFilterToggle} />

            <div className={'calendar-board-days'}>
                {Array.from({length: 7}, (_, index) => addDays(dayNameBase, index)).map((day) => (
                    <div key={getDateKey(day)} className={'calendar-board-day'}>
                        {new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {weekday: 'short'}).format(day)}
                    </div>
                ))}
            </div>

            {currentView === 'week' ? (
                <CalendarWeekView
                    days={calendarDays}
                    eventsByDay={eventsByDay}
                    selectedDate={resolvedSelectedDate}
                    activeDate={activeDate}
                    onDayInteract={handleDayInteract}
                    onDayHover={handleDayHover}
                    onDayLeave={() => {
                        if (detailsTrigger === 'hover' && effectiveDetailsMode === 'popover') {
                            scheduleClose()
                        }
                    }}
                    dayBadge={dayBadge}
                    renderDayCell={renderDayCell}
                    locale={locale}
                />
            ) : (
                <div className={'calendar-board-grid'}>
                    {calendarDays.map((day) => {
                        const dayKey = getDateKey(day)
                        const dayEvents = eventsByDay.get(dayKey) ?? []
                        const badge =
                            dayBadge?.(day, dayEvents) ??
                            (dayEvents.length > 0 ? <Badge size={'sm'}>{dayEvents.length}</Badge> : null)
                        const isToday = dayKey === getDateKey(today)
                        const isSelected = Boolean(resolvedSelectedDate && dayKey === getDateKey(resolvedSelectedDate))
                        const isOutsideMonth = day.getMonth() !== visibleMonth.getMonth()
                        const markers = buildDayMarkers(dayEvents)
                        const context = {
                            date: day,
                            events: dayEvents,
                            badge,
                            isToday,
                            isSelected,
                            isOutsideMonth,
                        }

                        return (
                            <CalendarDayCell
                                key={dayKey}
                                date={day}
                                events={dayEvents}
                                badge={badge}
                                markers={markers}
                                isToday={isToday}
                                isSelected={isSelected || Boolean(activeDate && dayKey === getDateKey(activeDate))}
                                isOutsideMonth={isOutsideMonth}
                                onClick={(event) => handleDayInteract(day, event.currentTarget, dayEvents)}
                                onMouseEnter={(event) => handleDayHover(day, event.currentTarget, dayEvents)}
                                onMouseLeave={() => {
                                    if (detailsTrigger === 'hover' && effectiveDetailsMode === 'popover') {
                                        scheduleClose()
                                    }
                                }}
                            >
                                {renderDayCell ? renderDayCell(day, context) : undefined}
                            </CalendarDayCell>
                        )
                    })}
                </div>
            )}

            {effectiveDetailsMode === 'popover' ? (
                <CalendarEventPopover
                    open={detailsOpen && Boolean(activeDate) && Boolean(activeAnchorRef.current)}
                    anchorRef={activeAnchorRef as RefObject<HTMLElement | null>}
                    onClose={() => setDetailsOpen(false)}
                    onPointerEnter={() => clearCloseTimeout()}
                    onPointerLeave={() => scheduleClose()}
                    date={activeDate}
                    events={activeEvents}
                    locale={locale}
                    timelineStartHour={timelineStartHour}
                    timelineEndHour={timelineEndHour}
                    showTimeline={showTimeline}
                    emptyStateText={emptyStateText ?? copy.emptyStateText}
                    renderEventItem={renderEventItem}
                />
            ) : (
                <Modal
                    open={detailsOpen && Boolean(activeDate)}
                    onClose={() => setDetailsOpen(false)}
                    title={activeDate ? formatBoardDate(activeDate, locale) : undefined}
                    description={activeDate ? copy.itemsCount(activeEvents.length) : undefined}
                    size={'lg'}
                >
                    <CalendarDetailsContent
                        date={activeDate}
                        events={activeEvents}
                        locale={locale}
                        timelineStartHour={timelineStartHour}
                        timelineEndHour={timelineEndHour}
                        showTimeline={showTimeline}
                        emptyStateText={emptyStateText ?? copy.emptyStateText}
                        renderEventItem={renderEventItem}
                    />
                </Modal>
            )}
        </div>
    )
}
