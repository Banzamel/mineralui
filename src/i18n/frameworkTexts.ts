import {useCallback, useMemo} from 'react'
import {useOptionalMI18n} from './MI18nProvider'

function useTranslate() {
    const i18n = useOptionalMI18n()

    return useCallback((key: string, fallback: string) => i18n?.t(key, fallback) ?? fallback, [i18n])
}

export interface MDatePickerTexts {
    today: string
    clear: string
    previousMonth: string
    nextMonth: string
}

export interface MDateRangePickerTexts extends MDatePickerTexts {
    rangeSubtitle: string
    defaultRangePlaceholder: string
    presets: {
        today: string
        days2: string
        days3: string
        days7: string
        days14: string
        days31: string
        thisMonth: string
        previousMonth: string
        months2: string
        months3: string
        months6: string
        year1: string
    }
}

export interface MCalendarBoardTexts {
    monthView: string
    weekView: string
    previousWeek: string
    nextWeek: string
    emptyStateText: string
    timelineTitle: string
    timelineEmptyState: string
    allDay: string
    allDayTab: string
    timelineTab: string
    itemsCount: (count: number) => string
}

export interface MFileManagerTexts {
    home: string
    searchPlaceholder: string
    emptyText: string
    folders: string
    noFoldersAvailable: string
    currentFolder: string
    filteredBy: (query: string) => string
    listView: string
    gridView: string
    folder: string
    file: string
    preview: string
    path: string
    selectItemToInspect: string
    itemsCount: (count: number) => string
    rename: string
    moveTo: string
    delete: string
    download: string
    newFolder: string
}

export function useMDatePickerTexts(): MDatePickerTexts {
    const t = useTranslate()

    return useMemo(
        () => ({
            today: t('mineralui.datePicker.today', 'Today'),
            clear: t('mineralui.datePicker.clear', 'Clear'),
            previousMonth: t('mineralui.datePicker.previousMonth', 'Previous month'),
            nextMonth: t('mineralui.datePicker.nextMonth', 'Next month'),
        }),
        [t]
    )
}

export function useMDateRangePickerTexts(): MDateRangePickerTexts {
    const t = useTranslate()

    return useMemo(
        () => ({
            today: t('mineralui.dateRangePicker.today', 'Today'),
            clear: t('mineralui.dateRangePicker.clear', 'Clear'),
            previousMonth: t('mineralui.dateRangePicker.previousMonth', 'Previous month'),
            nextMonth: t('mineralui.dateRangePicker.nextMonth', 'Next month'),
            rangeSubtitle: t('mineralui.dateRangePicker.rangeSubtitle', 'Select start and end dates in one panel.'),
            defaultRangePlaceholder: t('mineralui.dateRangePicker.defaultRangePlaceholder', 'Select date range...'),
            presets: {
                today: t('mineralui.dateRangePicker.presets.today', 'Today'),
                days2: t('mineralui.dateRangePicker.presets.days2', '2 days'),
                days3: t('mineralui.dateRangePicker.presets.days3', '3 days'),
                days7: t('mineralui.dateRangePicker.presets.days7', '7 days'),
                days14: t('mineralui.dateRangePicker.presets.days14', '14 days'),
                days31: t('mineralui.dateRangePicker.presets.days31', '31 days'),
                thisMonth: t('mineralui.dateRangePicker.presets.thisMonth', 'This month'),
                previousMonth: t('mineralui.dateRangePicker.presets.previousMonth', 'Previous month'),
                months2: t('mineralui.dateRangePicker.presets.months2', '2 months'),
                months3: t('mineralui.dateRangePicker.presets.months3', '3 months'),
                months6: t('mineralui.dateRangePicker.presets.months6', '6 months'),
                year1: t('mineralui.dateRangePicker.presets.year1', '1 year'),
            },
        }),
        [t]
    )
}

export function useMCalendarBoardTexts(): MCalendarBoardTexts {
    const t = useTranslate()

    return useMemo(
        () => ({
            monthView: t('mineralui.calendarBoard.monthView', 'Month'),
            weekView: t('mineralui.calendarBoard.weekView', 'Week'),
            previousWeek: t('mineralui.calendarBoard.previousWeek', 'Previous week'),
            nextWeek: t('mineralui.calendarBoard.nextWeek', 'Next week'),
            emptyStateText: t('mineralui.calendarBoard.emptyStateText', 'No events for the selected day.'),
            timelineTitle: t('mineralui.calendarBoard.timelineTitle', 'Daily timeline'),
            timelineEmptyState: t('mineralui.calendarBoard.timelineEmptyState', 'No events in this hour.'),
            allDay: t('mineralui.calendarBoard.allDay', 'All day'),
            allDayTab: t('mineralui.calendarBoard.allDayTab', 'All day'),
            timelineTab: t('mineralui.calendarBoard.timelineTab', 'Hourly timeline'),
            itemsCount: (count) =>
                t('mineralui.calendarBoard.itemsCount', '{count} items').replace('{count}', String(count)),
        }),
        [t]
    )
}

export function useMFileManagerTexts(): MFileManagerTexts {
    const t = useTranslate()

    return useMemo(
        () => ({
            home: t('mineralui.fileManager.home', 'Home'),
            searchPlaceholder: t('mineralui.fileManager.searchPlaceholder', 'Search in folder...'),
            emptyText: t('mineralui.fileManager.emptyText', 'This folder is empty.'),
            folders: t('mineralui.fileManager.folders', 'Folders'),
            noFoldersAvailable: t('mineralui.fileManager.noFoldersAvailable', 'No folders available.'),
            currentFolder: t('mineralui.fileManager.currentFolder', 'Current folder'),
            filteredBy: (query) =>
                t('mineralui.fileManager.filteredBy', 'Filtered by "{query}"').replace('{query}', query),
            listView: t('mineralui.fileManager.listView', 'List'),
            gridView: t('mineralui.fileManager.gridView', 'Grid'),
            folder: t('mineralui.fileManager.folder', 'Folder'),
            file: t('mineralui.fileManager.file', 'File'),
            preview: t('mineralui.fileManager.preview', 'Preview'),
            path: t('mineralui.fileManager.path', 'Path'),
            selectItemToInspect: t(
                'mineralui.fileManager.selectItemToInspect',
                'Select a file or folder to inspect its details.'
            ),
            itemsCount: (count) =>
                t('mineralui.fileManager.itemsCount', '{count} items').replace('{count}', String(count)),
            rename: t('mineralui.fileManager.rename', 'Rename'),
            moveTo: t('mineralui.fileManager.moveTo', 'Move to...'),
            delete: t('mineralui.fileManager.delete', 'Delete'),
            download: t('mineralui.fileManager.download', 'Download'),
            newFolder: t('mineralui.fileManager.newFolder', 'New folder'),
        }),
        [t]
    )
}

// Cookie-consent texts moved to @banzamel/honey in mineralui-pro 2.0.0.
// Consumers that need to retheme cookie copy now pass `texts` directly to
// `<CookieConsentProvider>` from `@banzamel/honey`.
