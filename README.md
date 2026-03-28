# MineralUI

React component framework for dashboards, admin panels, documentation shells, settings screens and data-heavy internal products.

- npm: `@banzamel/mineralui`
- version: `0.10.3`
- peer dependencies: `react >= 19`, `react-dom >= 19`
- repository: `https://github.com/Banzamel/mineralui`
- homepage: `https://mineralui.banzamel.pl`
- styles: bundled and auto-injected on component import

## Installation

```bash
npm install @banzamel/mineralui
```

No separate CSS import is required.

## Quick Start

```tsx
import {
    MThemeProvider,
    MCard,
    MCardHeader,
    MCardBody,
    MInput,
    MSelect,
    MButton,
} from '@banzamel/mineralui'

function AccountSettings() {
    return (
        <MThemeProvider mode="dark">
            <MCard>
                <MCardHeader title="Workspace settings" description="Basic account data and role assignment." />
                <MCardBody>
                    <MInput label="Workspace name" placeholder="Banzamel Studio" fullWidth />
                    <MSelect
                        label="Default role"
                        fullWidth
                        options={[
                            {value: 'owner', label: 'Owner'},
                            {value: 'editor', label: 'Editor'},
                        ]}
                    />
                    <MButton>Save changes</MButton>
                </MCardBody>
            </MCard>
        </MThemeProvider>
    )
}
```

## Grouped Imports

MineralUI supports both the main entry and grouped subpath exports.

```tsx
import {MButton, MCheckbox} from '@banzamel/mineralui/controls'
import {MCard, MCardBody} from '@banzamel/mineralui/cards'
import {MShowcaseCarousel, MMasonry} from '@banzamel/mineralui/media'
import {MTimeAgo, MProgressBar} from '@banzamel/mineralui/display'
```

Available subpaths:

- `@banzamel/mineralui/cards`
- `@banzamel/mineralui/controls`
- `@banzamel/mineralui/data`
- `@banzamel/mineralui/display`
- `@banzamel/mineralui/dropdowns`
- `@banzamel/mineralui/feedback`
- `@banzamel/mineralui/form`
- `@banzamel/mineralui/i18n`
- `@banzamel/mineralui/icons`
- `@banzamel/mineralui/inputs`
- `@banzamel/mineralui/layout`
- `@banzamel/mineralui/media`
- `@banzamel/mineralui/overlays`
- `@banzamel/mineralui/primitives`
- `@banzamel/mineralui/theme`
- `@banzamel/mineralui/typography`
- `@banzamel/mineralui/utils`

## What Is Included

### Theme and foundations
- `MThemeProvider`, `useMTheme`
- `MI18nProvider`, `useMI18n`
- `MPortal`, `MPopover`
- CSS variable token system for dark and light mode
- scoped theme overrides through the provider

### Layout
- `MContainer`, `MSection`
- `MStack`, `MInline`, `MGrid`, `MGridItem`
- `MSurface`, `MDivider`
- `MHeader`, `MFooter`, `MNavbar`, `MNavs`, `MTabs`
- `MSidebar`, `MSidebarHeader`, `MSidebarBody`, `MSidebarNav`, `MSidebarItem`, `MSidebarGroup`, `MSidebarFooter`, `MSidebarDivider`
- `MSubNav`, `MBreadcrumb`, `MPagination`
- `MAppShell`, `MBody`

### Cards
- `MCard`, `MCardHeader`, `MCardBody`, `MCardFooter`
- `MCardPayment`
- `MCardBusiness`
- `MCardService`
- `MCardGrid`

### Data
- `MDataTable`
- `MTreeView`
- `MTaskList`
- `MCalendarBoard`, `MCalendarDayCell`, `MCalendarEventList`, `MCalendarEventItem`, `MCalendarEventPopover`, `MCalendarTimeline`

### Feedback
- `MAlert`, `MBanner`, `MBadge`, `MTag`
- `MSpinner`, `MLoader`
- `MToastProvider`, `useMToast`

### Overlays
- `MModal`
- `MDrawer`, `MDrawerHeader`, `MDrawerBody`, `MDrawerFooter`
- `MTooltip`
- `MPopconfirm`
- `MDropdownMenu`, `MDropdownItem`, `MDropdownGroup`, `MDropdownDivider`

### Media
- `MAvatar`
- `MImage`
- `MGallery`
- `MCarousel`
- `MShowcaseCarousel`
- `MShowcaseCarouselItem`
- `MMasonry`
- `MMasonryItem`

### Display
- `MCollapsible`
- `MAccordion`, `MAccordionItem`
- `MProgressBar`
- `MCountUp`
- `MTimeAgo`
- `MRating`
- `MColorPicker`
- `MQrCode`

### Typography
- `MHeading`, `MText`, `MSubText`, `MLink`, `MCode`, `MList`, `MListItem`, `MKbd`

### Controls
- `MButton`
- `MCheckbox`
- `MRadio`, `MRadioGroup`
- `MToggle`
- `MSlider`

### Inputs
- `MInput`, `MTextarea`
- `MInputPassword`, `MInputNumber`, `MInputSearch`, `MInputEmail`
- `MInputPhone`, `MInputName`, `MInputIBAN`, `MInputTaxId`
- `MInputCurrency`, `MInputCreditCard`, `MInputPostCode`
- `MInputOTP`
- `MInputSlider`
- `MInputFile`
- `MInputGroup`

### Dropdowns
- `MSelect`
- `MAutocomplete`
- `MDatePicker`
- `MDateRangePicker`
- `MTimePicker`

### Form and utilities
- `MForm`, `useFormField`, `useFormContext`
- validators, formatters, date helpers, postal-code helpers and credit-card helpers
- `useDebounce`, `useDebouncedCallback`
- `useClickOutside`
- `useKeyboardNav`
- `useInteractionEffect`
- `useReveal`
- `useGhostText`
- `formatRelativeTime`, `formatAbsoluteTime`

### Icons
- `MIcon` base component
- 210 built-in glyphs across app icons, file types, flags and brands
- tree-shakeable individual exports
- used internally across inputs, tables, navigation, cards and overlays

## Feature Highlights

### Layout-first API
- `MAppShell` auto-detects `MSidebar` among direct children
- `MSidebarBody` and `MDrawerBody` keep scrolling inside the body area, while header and footer stay pinned
- `MDrawerHeader`, `MDrawerFooter`, `MSidebarHeader` and `MSidebarFooter` support optional bordered separation
- `MStack`, `MInline` and `MGrid` cover the majority of dashboard and docs layouts without extra utility libraries

### Card and content system
- `MCard` is the generic content container
- specialized cards cover payment, business and service use cases
- `MCardGrid` wraps card collections with built-in search, filters and sorting
- `MShowcaseCarousel` and `MMasonry` cover richer gallery and card-wall layouts

### Media layouts
- `MShowcaseCarousel` starts from the middle item by default and also supports `initialIndex`
- `MShowcaseCarouselItem` gives structured image, overlay, body and footer slots
- `MMasonryItem` gives the same structured model for masonry walls
- `MImage`, `MGallery` and `MMasonryItem` support click ripple for interactive media

### Form-heavy workflows
- specialized inputs handle formatting and validation instead of pushing that logic into every app
- `MInputCreditCard` detects brand and formats as the user types
- `MInputPostCode` validates by country rule set
- `MInputFile` supports drag and drop, thumbnails and built-in crop flow
- `MInputOTP` supports auto-focus and paste
- `MInputSlider` keeps slider and numeric field in sync

### Date and time workflows
- `MDatePicker`, `MDateRangePicker` and `MTimePicker` cover common date input needs
- `MDateRangePicker` supports presets and side-panel workflows
- `MTimeAgo` formats relative time through `Intl.RelativeTimeFormat` and falls back to absolute dates after a threshold
- `MDatePicker`, `MDateRangePicker` and `MTimeAgo` can follow the active `MI18nProvider` through `document.documentElement.lang`
- calendar month and weekday labels are resolved through `Intl.DateTimeFormat`, so locale is no longer limited to manual `pl` / `en` tables
- `locale` stays available as an explicit override when a picker should render in a different language than the current app shell

### Data and navigation
- `MDataTable` supports sorting, filtering, pagination and row selection
- `MTreeView` supports selection, context actions and automatic file-type icons
- `MBreadcrumb` handles deep hierarchies with collapsed middle items
- `MPagination` supports numbered and compact page flows

### Shared interaction model
- buttons, cards, images and other interactive elements can share the same ripple/click-effect behavior
- built-in icons are used across framework components, so products stay visually consistent without extra icon packages
- alerts and toasts have built-in status icons with override or disable support

## Design System Notes

MineralUI is driven by CSS variables and readable class names.

```css
:root {
    --mineral-primary-rgb: 0, 165, 222;
    --mineral-primary: rgba(var(--mineral-primary-rgb), 1);

    --mineral-success-rgb: 22, 163, 74;
    --mineral-error-rgb: 220, 38, 38;
    --mineral-warning-rgb: 234, 124, 0;
    --mineral-info-rgb: 59, 130, 246;

    --mineral-surface: rgba(21, 29, 46, 1);
    --mineral-page-bg: rgba(15, 23, 42, 1);
    --mineral-input-bg: rgba(37, 51, 71, 1);

    --mineral-text: rgba(226, 232, 240, 1);
    --mineral-text-secondary: rgba(100, 116, 139, 1);

    --mineral-border: rgba(255, 255, 255, 0.15);
    --mineral-border-hover: rgba(255, 255, 255, 0.25);
    --mineral-border-focus: var(--mineral-primary);

    --mineral-z-popover: 1000;
    --mineral-z-modal: 1100;
    --mineral-z-tooltip: 1150;
    --mineral-z-toast: 1200;
}
```

You can theme the package in four layers:

- token overrides through `--mineral-*`
- component props such as `color`, `fcolor`, `spacing`, `padding`, `fsize`
- `className` for local integration
- `MThemeProvider` for `mode` and scoped token overrides

Framework defaults:

- plain CSS, not CSS Modules
- readable, override-friendly class names
- no runtime dependencies besides React peer dependencies
- dark and light mode supported through the same token system
- typography reset and scrollbar styling come from the bundled framework styles

## Repository

- GitHub: `https://github.com/Banzamel/mineralui`
- npm: `https://www.npmjs.com/package/@banzamel/mineralui`
