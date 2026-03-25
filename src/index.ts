// Styles
import './theme/index.css'

// Theme
export {MThemeProvider, MineralThemeProvider, useMTheme, useTheme} from './theme'
export type {MineralTheme, MineralMode, MineralModePreference, MineralColor, MineralSize, MineralFontColor, MineralThemeScope} from './theme'

// I18n
export {MI18nProvider, useMI18n} from './i18n'
export type {MI18nProviderProps, MI18nContextValue} from './i18n'

// Utils
export {cn as mergeClasses, cn} from './utils/cn'
export {
    validateRequired,
    validateMinLength,
    validateMaxLength,
    validatePattern,
    validateRange,
    validateEmail,
    validatePhone,
    validateIBAN,
    validateNIP,
    validatePESEL,
    validateREGON,
    validatePostCode,
    validateCardNumber,
    composeValidators,
} from './utils/validators'
export type {ValidationResult, ValidatorFn} from './utils/validators'
export {
    formatPostCode,
    formatIBAN,
    formatCardNumber,
    unformatIBAN,
    formatPhone,
    formatNIP,
    formatCurrency,
    parseCurrencyToNumber,
    stripNonDigits,
    stripNonAlphanumeric,
    capitalizeWords,
    adjustCursorAfterFormat,
} from './utils/formatters'
export type {PhoneFormatOptions, CurrencyFormatOptions} from './utils/formatters'
export {getPostCodeRule, postCodeCountries, postCodeRules} from './utils/postalCodes'
export type {PostCodeRule} from './utils/postalCodes'
export {creditCardBrands, detectCardBrand, stripCardNumber} from './utils/creditCards'
export type {CreditCardBrand, CreditCardBrandDetails} from './utils/creditCards'
export {
    formatDate,
    parseDate,
    daysInMonth,
    firstDayOfMonth,
    isSameDay,
    isDateInRange,
    stripTime,
    addMonths,
    addYears,
    getDayNames,
    getMonthNames,
    parseTime,
    formatTime,
} from './utils/dateUtils'
export {useDebounce, useDebouncedCallback} from './utils/useDebounce'
export {useClickOutside as useOutsideClick, useClickOutside} from './utils/useClickOutside'
export {useKeyboardNav as useKeyNavigation, useKeyboardNav} from './utils/useKeyboardNav'
export type {UseKeyboardNavOptions, UseKeyboardNavOptions as UseKeyNavigationOptions} from './utils/useKeyboardNav'
export {useInteractionEffect as useClickEffect, useInteractionEffect} from './utils/useInteractionEffect'
export type {
    MineralClickEffect,
    UseInteractionEffectOptions,
    UseInteractionEffectResult,
} from './utils/useInteractionEffect'
export {useReveal} from './utils/useReveal'
export type {RevealProp} from './utils/useReveal'
export {useGhostText} from './utils/useGhostText'
export type {GhostTextOptions, GhostTextReturn} from './utils/useGhostText'

// Primitives
export {Portal} from './components/primitives/Portal'
export type {PortalProps} from './components/primitives/Portal'
export {Popover} from './components/primitives/Popover'
export type {PopoverProps, PopoverPlacement} from './components/primitives/Popover'
export {Portal as MPortal} from './components/primitives/Portal'
export type {PortalProps as MPortalProps} from './components/primitives/Portal'
export {Popover as MPopover} from './components/primitives/Popover'
export type {
    PopoverProps as MPopoverProps,
    PopoverPlacement as MPopoverPlacement,
} from './components/primitives/Popover'

// Layout
export {
    Container,
    MHeader,
    MFooter,
    MNavbar,
    MNavs,
    MTabs,
    Section,
    Stack,
    Inline,
    Grid,
    MGrid,
    MGridItem,
    Surface,
    Divider,
    MSidebar,
    MSidebarHeader,
    MSidebarNav,
    MSidebarItem,
    MSidebarGroup,
    MSidebarFooter,
    MSidebarDivider,
    MSubNav,
    MBreadcrumb,
    MPagination,
    AppShell,
    Body,
} from './components/layout'
export {
    Container as MContainer,
    Section as MSection,
    Stack as MStack,
    Inline as MInline,
    Surface as MSurface,
    Divider as MDivider,
    AppShell as MAppShell,
    Body as MBody,
} from './components/layout'
export type {
    ContainerProps,
    ContainerSize,
    MHeaderProps,
    MHeaderTone,
    MFooterProps,
    MNavbarProps,
    MNavbarTone,
    MNavbarJustify,
    MNavbarAlign,
    MNavsProps,
    MNavsItem,
    MNavsOrientation,
    MNavsGap,
    MTabsProps,
    MTabsItem,
    MTabsVariant,
    MTabsSize,
    SectionProps,
    SectionSpacing,
    SectionTone,
    StackProps,
    StackGap,
    StackAlign,
    InlineProps,
    InlineAlign,
    InlineJustify,
    InlineWrap,
    GridProps,
    GridColumns,
    MGridProps,
    MGridItemProps,
    MGridType,
    MGridColumns,
    SurfaceProps,
    SurfaceTone,
    DividerProps,
    MSidebarProps,
    MSidebarHeaderProps,
    MSidebarNavProps,
    MSidebarItemProps,
    MSidebarGroupProps,
    MSidebarFooterProps,
    MSidebarDividerProps,
    MSidebarMode,
    MSubNavProps,
    MSubNavItem,
    MBreadcrumbProps,
    MBreadcrumbItem,
    MPaginationProps,
    AppShellProps,
    BodyProps,
} from './components/layout'
export type {
    ContainerProps as MContainerProps,
    SectionProps as MSectionProps,
    StackProps as MStackProps,
    InlineProps as MInlineProps,
    SurfaceProps as MSurfaceProps,
    DividerProps as MDividerProps,
    AppShellProps as MAppShellProps,
    BodyProps as MBodyProps,
} from './components/layout'

// Controls
export {Button} from './components/controls/Button'
export type {ButtonProps, ButtonVariant} from './components/controls/Button'
export {Button as MButton} from './components/controls/Button'
export type {ButtonProps as MButtonProps, ButtonVariant as MButtonVariant} from './components/controls/Button'
export {Checkbox} from './components/controls/Checkbox'
export type {CheckboxProps} from './components/controls/Checkbox'
export {Checkbox as MCheckbox} from './components/controls/Checkbox'
export type {CheckboxProps as MCheckboxProps} from './components/controls/Checkbox'
export {Radio, RadioGroup} from './components/controls/Radio'
export type {RadioProps, RadioGroupProps} from './components/controls/Radio'
export {Radio as MRadio, RadioGroup as MRadioGroup} from './components/controls/Radio'
export type {RadioProps as MRadioProps, RadioGroupProps as MRadioGroupProps} from './components/controls/Radio'
export {Toggle} from './components/controls/Toggle'
export type {ToggleProps} from './components/controls/Toggle'
export {Toggle as MToggle} from './components/controls/Toggle'
export type {ToggleProps as MToggleProps} from './components/controls/Toggle'
export {Slider} from './components/controls/Slider'
export type {SliderProps, SliderMark} from './components/controls/Slider'
export {Slider as MSlider} from './components/controls/Slider'
export type {SliderProps as MSliderProps, SliderMark as MSliderMark} from './components/controls/Slider'

// Display
export {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Badge,
    Alert,
    Collapsible,
    Accordion,
    AccordionItem,
    Spinner,
    Loader,
    Avatar,
    Modal,
    CalendarBoard,
    CalendarDayCell,
    CalendarEventList,
    CalendarEventItem,
    CalendarEventPopover,
    CalendarTimeline,
    MDropdownMenu,
    MDropdownItem,
    MDropdownGroup,
    MDropdownDivider,
    ProgressBar,
    CountUp,
    Rating,
    Banner,
    Image,
    Gallery,
    Carousel,
    TaskList,
    CardPayment,
    Tooltip,
    ToastProvider,
    useToast,
    Tag,
    Drawer,
    Popconfirm,
    DataTable,
    ColorPicker,
    TreeView,
} from './components/display'
export {
    Card as MCard,
    CardHeader as MCardHeader,
    CardBody as MCardBody,
    CardFooter as MCardFooter,
    Badge as MBadge,
    Alert as MAlert,
    Collapsible as MCollapsible,
    Accordion as MAccordion,
    AccordionItem as MAccordionItem,
    Spinner as MSpinner,
    Loader as MLoader,
    Avatar as MAvatar,
    Modal as MModal,
    CalendarBoard as MCalendarBoard,
    CalendarDayCell as MCalendarDayCell,
    CalendarEventList as MCalendarEventList,
    CalendarEventItem as MCalendarEventItem,
    CalendarEventPopover as MCalendarEventPopover,
    CalendarTimeline as MCalendarTimeline,
    ProgressBar as MProgressBar,
    CountUp as MCountUp,
    Rating as MRating,
    Banner as MBanner,
    Image as MImage,
    Gallery as MGallery,
    Carousel as MCarousel,
    TaskList as MTaskList,
    CardPayment as MCardPayment,
    Tooltip as MTooltip,
    ToastProvider as MToastProvider,
    useToast as useMToast,
    Tag as MTag,
    Drawer as MDrawer,
    Popconfirm as MPopconfirm,
    DataTable as MDataTable,
    ColorPicker as MColorPicker,
    TreeView as MTreeView,
} from './components/display'
export type {
    CardProps,
    BadgeProps,
    AlertProps,
    CollapsibleProps,
    AccordionProps,
    AccordionItemProps,
    SpinnerProps,
    LoaderProps,
    AvatarProps,
    AvatarSize,
    AvatarShape,
    ModalProps,
    ModalSize,
    CalendarBoardProps,
    CalendarBoardLocale,
    CalendarDetailsTrigger,
    CalendarDetailsMode,
    CalendarBoardView,
    CalendarEvent,
    CalendarFilterOption,
    CalendarEventItemProps,
    CalendarEventListProps,
    CalendarEventPopoverProps,
    CalendarEventStatus,
    CalendarEventUser,
    CalendarDayCellProps,
    CalendarDayRenderContext,
    CalendarTimelineProps,
    CalendarTimelineSlotState,
    MDropdownMenuProps,
    MDropdownItemProps,
    MDropdownGroupProps,
    MDropdownDividerProps,
    ProgressBarProps,
    CountUpProps,
    RatingProps,
    BannerProps,
    BannerVariant,
    ImageProps,
    ImageFit,
    ImageRatio,
    GalleryProps,
    GalleryItem,
    GalleryColumns,
    CarouselProps,
    CarouselTransition,
    TaskListProps,
    TaskItem,
    CardPaymentProps,
    CardPaymentBrand,
    TooltipProps,
    TooltipPlacement,
    ToastProviderProps,
    ToastOptions,
    ToastEntry,
    ToastPosition,
    ToastContext,
    TagProps,
    TagVariant,
    DrawerProps,
    DrawerSide,
    DrawerSize,
    PopconfirmProps,
    DataTableProps,
    DataTableColumn,
    DataTableSort,
    DataTableSortDir,
    ColorPickerProps,
    ColorPickerFormat,
    TreeViewProps,
    TreeNode,
} from './components/display'
export type {
    CardProps as MCardProps,
    BadgeProps as MBadgeProps,
    AlertProps as MAlertProps,
    CollapsibleProps as MCollapsibleProps,
    AccordionProps as MAccordionProps,
    AccordionItemProps as MAccordionItemProps,
    SpinnerProps as MSpinnerProps,
    LoaderProps as MLoaderProps,
    AvatarProps as MAvatarProps,
    AvatarSize as MAvatarSize,
    AvatarShape as MAvatarShape,
    ModalProps as MModalProps,
    ModalSize as MModalSize,
    CalendarBoardProps as MCalendarBoardProps,
    CalendarBoardLocale as MCalendarBoardLocale,
    CalendarDetailsTrigger as MCalendarDetailsTrigger,
    CalendarDetailsMode as MCalendarDetailsMode,
    CalendarBoardView as MCalendarBoardView,
    CalendarEvent as MCalendarEvent,
    CalendarFilterOption as MCalendarFilterOption,
    CalendarEventItemProps as MCalendarEventItemProps,
    CalendarEventListProps as MCalendarEventListProps,
    CalendarEventPopoverProps as MCalendarEventPopoverProps,
    CalendarEventStatus as MCalendarEventStatus,
    CalendarEventUser as MCalendarEventUser,
    CalendarDayCellProps as MCalendarDayCellProps,
    CalendarDayRenderContext as MCalendarDayRenderContext,
    CalendarTimelineProps as MCalendarTimelineProps,
    CalendarTimelineSlotState as MCalendarTimelineSlotState,
    ProgressBarProps as MProgressBarProps,
    CountUpProps as MCountUpProps,
    RatingProps as MRatingProps,
    BannerProps as MBannerProps,
    BannerVariant as MBannerVariant,
    ImageProps as MImageProps,
    ImageFit as MImageFit,
    ImageRatio as MImageRatio,
    GalleryProps as MGalleryProps,
    GalleryItem as MGalleryItem,
    GalleryColumns as MGalleryColumns,
    CarouselProps as MCarouselProps,
    CarouselTransition as MCarouselTransition,
    TaskListProps as MTaskListProps,
    TaskItem as MTaskItem,
    CardPaymentProps as MCardPaymentProps,
    CardPaymentBrand as MCardPaymentBrand,
    TooltipProps as MTooltipProps,
    TooltipPlacement as MTooltipPlacement,
    ToastProviderProps as MToastProviderProps,
    ToastOptions as MToastOptions,
    ToastEntry as MToastEntry,
    ToastPosition as MToastPosition,
    ToastContext as MToastContext,
    TagProps as MTagProps,
    TagVariant as MTagVariant,
    DrawerProps as MDrawerProps,
    DrawerSide as MDrawerSide,
    DrawerSize as MDrawerSize,
    PopconfirmProps as MPopconfirmProps,
    DataTableProps as MDataTableProps,
    DataTableColumn as MDataTableColumn,
    DataTableSort as MDataTableSort,
    DataTableSortDir as MDataTableSortDir,
    ColorPickerProps as MColorPickerProps,
    ColorPickerFormat as MColorPickerFormat,
    TreeViewProps as MTreeViewProps,
    TreeNode as MTreeNode,
} from './components/display'

// Typography
export {Heading, Text, SubText, Code, List, ListItem, Kbd} from './components/typography'
export type {
    HeadingProps,
    HeadingLevel,
    TextProps,
    TextAlign,
    TextTone,
    TextSize,
    MLinkProps,
    MLinkTone,
    MLinkUnderline,
    CodeProps,
    ListProps,
    SubTextProps,
    SubTextSize,
    KbdProps,
} from './components/typography'
export {
    Heading as MHeading,
    Text as MText,
    SubText as MSubText,
    MLink,
    Code as MCode,
    List as MList,
    ListItem as MListItem,
    Kbd as MKbd,
} from './components/typography'
export type {
    HeadingProps as MHeadingProps,
    TextProps as MTextProps,
    TextAlign as MTextAlign,
    SubTextProps as MSubTextProps,
    SubTextSize as MSubTextSize,
    CodeProps as MCodeProps,
    ListProps as MListProps,
    KbdProps as MKbdProps,
} from './components/typography'

// Inputs
export {Input} from './components/inputs/Input'
export type {InputProps, InputVariant} from './components/inputs/Input'
export {Input as MInput} from './components/inputs/Input'
export type {InputProps as MInputProps, InputVariant as MInputVariant} from './components/inputs/Input'
export {Textarea} from './components/inputs/Textarea'
export type {TextareaProps, TextareaVariant} from './components/inputs/Textarea'
export {Textarea as MTextarea} from './components/inputs/Textarea'
export type {TextareaProps as MTextareaProps, TextareaVariant as MTextareaVariant} from './components/inputs/Textarea'
export {InputPassword} from './components/inputs/InputPassword'
export type {InputPasswordProps, PasswordStrength} from './components/inputs/InputPassword'
export {InputPassword as MInputPassword} from './components/inputs/InputPassword'
export type {
    InputPasswordProps as MInputPasswordProps,
    PasswordStrength as MPasswordStrength,
} from './components/inputs/InputPassword'
export {InputNumber} from './components/inputs/InputNumber'
export type {InputNumberProps} from './components/inputs/InputNumber'
export {InputNumber as MInputNumber} from './components/inputs/InputNumber'
export type {InputNumberProps as MInputNumberProps} from './components/inputs/InputNumber'
export {InputSearch} from './components/inputs/InputSearch'
export type {InputSearchProps} from './components/inputs/InputSearch'
export {InputSearch as MInputSearch} from './components/inputs/InputSearch'
export type {InputSearchProps as MInputSearchProps} from './components/inputs/InputSearch'
export {InputEmail} from './components/inputs/InputEmail'
export type {InputEmailProps} from './components/inputs/InputEmail'
export {InputEmail as MInputEmail} from './components/inputs/InputEmail'
export type {InputEmailProps as MInputEmailProps} from './components/inputs/InputEmail'
export {InputPhone} from './components/inputs/InputPhone'
export type {InputPhoneProps} from './components/inputs/InputPhone'
export {InputPhone as MInputPhone} from './components/inputs/InputPhone'
export type {InputPhoneProps as MInputPhoneProps} from './components/inputs/InputPhone'
export {InputName} from './components/inputs/InputName'
export type {InputNameProps} from './components/inputs/InputName'
export {InputName as MInputName} from './components/inputs/InputName'
export type {InputNameProps as MInputNameProps} from './components/inputs/InputName'
export {InputIBAN} from './components/inputs/InputIBAN'
export type {InputIBANProps} from './components/inputs/InputIBAN'
export {InputIBAN as MInputIBAN} from './components/inputs/InputIBAN'
export type {InputIBANProps as MInputIBANProps} from './components/inputs/InputIBAN'
export {InputTaxId} from './components/inputs/InputTaxId'
export type {InputTaxIdProps, TaxIdType} from './components/inputs/InputTaxId'
export {InputTaxId as MInputTaxId} from './components/inputs/InputTaxId'
export type {InputTaxIdProps as MInputTaxIdProps, TaxIdType as MTaxIdType} from './components/inputs/InputTaxId'
export {InputCurrency} from './components/inputs/InputCurrency'
export type {InputCurrencyProps} from './components/inputs/InputCurrency'
export {InputCurrency as MInputCurrency} from './components/inputs/InputCurrency'
export type {InputCurrencyProps as MInputCurrencyProps} from './components/inputs/InputCurrency'
export {InputCreditCard} from './components/inputs/InputCreditCard'
export type {InputCreditCardProps} from './components/inputs/InputCreditCard'
export {InputCreditCard as MInputCreditCard} from './components/inputs/InputCreditCard'
export type {InputCreditCardProps as MInputCreditCardProps} from './components/inputs/InputCreditCard'
export {InputGroup} from './components/inputs/InputGroup'
export type {InputGroupProps, InputGroupAddon, InputGroupSlot} from './components/inputs/InputGroup'
export {InputGroup as MInputGroup} from './components/inputs/InputGroup'
export type {
    InputGroupProps as MInputGroupProps,
    InputGroupAddon as MInputGroupAddon,
    InputGroupSlot as MInputGroupSlot,
} from './components/inputs/InputGroup'
export {InputPostCode} from './components/inputs/InputPostCode'
export type {InputPostCodeProps} from './components/inputs/InputPostCode'
export {InputPostCode as MInputPostCode} from './components/inputs/InputPostCode'
export type {InputPostCodeProps as MInputPostCodeProps} from './components/inputs/InputPostCode'
export {InputOTP} from './components/inputs/InputOTP'
export type {InputOTPProps} from './components/inputs/InputOTP'
export {InputOTP as MInputOTP} from './components/inputs/InputOTP'
export type {InputOTPProps as MInputOTPProps} from './components/inputs/InputOTP'
export {InputSlider} from './components/inputs/InputSlider'
export type {InputSliderProps} from './components/inputs/InputSlider'
export {InputSlider as MInputSlider} from './components/inputs/InputSlider'
export type {InputSliderProps as MInputSliderProps} from './components/inputs/InputSlider'
export {InputFile} from './components/inputs/InputFile'
export type {InputFileProps, InputFileCropOptions, InputFileCropShape} from './components/inputs/InputFile'
export {InputFile as MInputFile} from './components/inputs/InputFile'
export type {
    InputFileProps as MInputFileProps,
    InputFileCropOptions as MInputFileCropOptions,
    InputFileCropShape as MInputFileCropShape,
} from './components/inputs/InputFile'

// Dropdowns
export {Select} from './components/dropdowns/Select'
export type {SelectProps, SelectOption, SelectVariant} from './components/dropdowns/Select'
export {Select as MSelect} from './components/dropdowns/Select'
export type {
    SelectProps as MSelectProps,
    SelectOption as MSelectOption,
    SelectVariant as MSelectVariant,
} from './components/dropdowns/Select'
export {Autocomplete} from './components/dropdowns/Autocomplete'
export type {AutocompleteProps, AutocompleteVariant} from './components/dropdowns/Autocomplete'
export {Autocomplete as MAutocomplete} from './components/dropdowns/Autocomplete'
export type {
    AutocompleteProps as MAutocompleteProps,
    AutocompleteVariant as MAutocompleteVariant,
} from './components/dropdowns/Autocomplete'
export {DatePicker} from './components/dropdowns/DatePicker'
export type {DatePickerProps, DatePickerVariant} from './components/dropdowns/DatePicker'
export {DatePicker as MDatePicker} from './components/dropdowns/DatePicker'
export {DateRangePicker} from './components/dropdowns/DateRangePicker'
export type {DateRangePickerProps, DateRangePickerVariant, DateRangeValue} from './components/dropdowns/DateRangePicker'
export {DateRangePicker as MDateRangePicker} from './components/dropdowns/DateRangePicker'
export type {
    DatePickerProps as MDatePickerProps,
    DatePickerVariant as MDatePickerVariant,
} from './components/dropdowns/DatePicker'
export type {
    DateRangePickerProps as MDateRangePickerProps,
    DateRangePickerVariant as MDateRangePickerVariant,
    DateRangePreset as MDateRangePreset,
    DateRangeValue as MDateRangeValue,
} from './components/dropdowns/DateRangePicker'
export type {DateRangePreset} from './components/dropdowns/DateRangePicker'
export {TimePicker} from './components/dropdowns/TimePicker'
export type {TimePickerProps, TimePickerVariant} from './components/dropdowns/TimePicker'
export {TimePicker as MTimePicker} from './components/dropdowns/TimePicker'
export type {
    TimePickerProps as MTimePickerProps,
    TimePickerVariant as MTimePickerVariant,
} from './components/dropdowns/TimePicker'

// Form
export {Form, useFormField, useFormContext} from './components/form/Form'
export {Form as MForm} from './components/form/Form'
export type {
    FormProps,
    FormFieldProps,
    FormContextValue,
    FormHelpers,
    FieldRegistration,
    UseFormFieldReturn,
    UseFormFieldOptions,
} from './components/form/Form'
export type {
    FormProps as MFormProps,
    FormFieldProps as MFormFieldProps,
    FormContextValue as MFormContextValue,
    FormHelpers as MFormHelpers,
    FieldRegistration as MFieldRegistration,
    UseFormFieldReturn as MUseFormFieldReturn,
    UseFormFieldOptions as MUseFormFieldOptions,
} from './components/form/Form'
