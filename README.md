# MineralUI

React component framework for dashboards, admin panels, documentation shells, settings screens and data-heavy internal products.

- npm: `@banzamel/mineralui`
- release version: `0.5.3`
- peer dependencies: `react >= 19`, `react-dom >= 19`
- repository: `https://github.com/Banzamel/mineralui`
- styles: auto-injected — CSS is bundled into JS and applied automatically on import

## Installation

```bash
npm install @banzamel/mineralui
```

No separate CSS import needed. Styles are auto-injected when you import any component.

## Quick Start

```tsx
import {
    MThemeProvider,
    MButton,
    MCard,
    MCardBody,
    MCardHeader,
    MInput,
    MSelect,
    MStack,
} from '@banzamel/mineralui'

function AccountSettings() {
    return (
        <MThemeProvider mode="dark">
            <MCard>
                <MCardHeader title="Workspace settings" description="Basic account data and role assignment." />
                <MCardBody>
                    <MStack gap="md">
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
                    </MStack>
                </MCardBody>
            </MCard>
        </MThemeProvider>
    )
}
```

## What Is Included

### Theme and primitives
- `MThemeProvider`, `useMTheme`
- `MPortal`, `MPopover`
- `MI18nProvider` — locale context for framework-level translations
- CSS variable token system for dark and light mode
- scoped theme overrides through the provider

### Layout
- `MContainer`, `MSection`
- `MStack`, `MInline`, `MGrid`, `MGridItem`
- `MSurface`, `MDivider`
- `MHeader`, `MFooter`, `MNavbar`, `MNavs`, `MTabs`
- `MSidebar`, `MSidebarItem`, `MSidebarGroup`, `MSidebarDivider`
- `MSubNav`

### Display
- `MCard`, `MCardHeader`, `MCardBody`, `MCardFooter`
- `MBadge`, `MAlert`, `MBanner`
- `MTable`, `MTableRoot`, `MTableHead`, `MTableBody`, `MTableRow`, `MTableHeadCell`, `MTableCell`
- `MCollapsible`, `MSpinner`, `MLoader`
- `MAvatar`, `MModal`
- `MImage`, `MGallery`
- `MCarousel`
- `MProgressBar`
- `MRating`
- `MCountUp`
- `MTaskList`, `MTaskItem`
- `MDropdownMenu`, `MDropdownMenuItem`, `MDropdownMenuDivider`
- `MCalendarBoard`, `MCalendarDayCell`, `MCalendarEventList`, `MCalendarEventItem`, `MCalendarEventPopover`, `MCalendarTimeline`

### Typography
- `MHeading`, `MText`, `MSubText`, `MLink`, `MCode`, `MList`, `MListItem`

### Controls
- `MButton`
- `MCheckbox`
- `MRadio`, `MRadioGroup`
- `MToggle`

### Inputs
- `MInput`, `MTextarea`
- `MInputPassword`, `MInputNumber`, `MInputSearch`, `MInputEmail`
- `MInputPhone`, `MInputName`, `MInputIBAN`, `MInputTaxId`, `MInputCurrency`
- `MInputCreditCard`, `MInputPostCode`
- `MInputGroup`

### Dropdowns
- `MSelect`
- `MAutocomplete`
- `MDatePicker`
- `MDateRangePicker` — supports `presetsSidebar` for a toggleable side panel with predefined date ranges
- `MTimePicker`

### Form and validation
- `MForm`, `useFormField`, `useFormContext`
- validators: `validateEmail`, `validatePhone`, `validateIBAN`, `validateNIP`, `validatePESEL`, `validateREGON`
- formatters: `formatIBAN`, `formatPhone`, `formatNIP`, `formatCurrency`, `parseCurrencyToNumber`
- date helpers: `formatDate`, `parseDate`, `formatTime`, `parseTime`

### Hooks and utilities
- `mergeClasses`
- `useDebounce`, `useDebouncedCallback`
- `useOutsideClick`
- `useKeyNavigation`
- `useClickEffect`

## Design System Notes

MineralUI is driven by CSS variables and readable class names.

```css
:root {
    /* Brand — override only *-rgb, the rest is auto-generated */
    --mineral-primary-rgb: 0, 165, 222;
    --mineral-primary: rgba(var(--mineral-primary-rgb), 1);

    /* Status palette */
    --mineral-success-rgb: 22, 163, 74;
    --mineral-error-rgb: 220, 38, 38;
    --mineral-warning-rgb: 234, 124, 0;
    --mineral-info-rgb: 59, 130, 246;

    /* Surface (dark mode default) */
    --mineral-surface: rgba(21, 29, 46, 1);
    --mineral-page-bg: rgba(15, 23, 42, 1);
    --mineral-input-bg: rgba(37, 51, 71, 1);

    /* Text */
    --mineral-text: rgba(226, 232, 240, 1);
    --mineral-text-secondary: rgba(100, 116, 139, 1);

    /* Borders */
    --mineral-border: rgba(255, 255, 255, 0.15);
    --mineral-border-hover: rgba(255, 255, 255, 0.25);
    --mineral-border-focus: var(--mineral-primary);
}
```

You can theme the package in four layers:
- token overrides through `--mineral-*`
- component props such as `color`, `fcolor`, `spacing`, `padding`, `fsize`
- `className` for local integration
- `MThemeProvider` for `mode` and scoped token overrides

Framework defaults:
- plain CSS, not CSS Modules
- readable local class names
- no runtime dependencies besides React peer dependencies
- dark and light mode supported through the same token system
- default scrollbar styling and typography reset come from the framework styles

## Feature Highlights

### Layout-first API
- `MStack`, `MInline` and `MGrid` cover the majority of internal dashboard layouts without extra utility libraries.
- `MGrid` supports equal columns by default and responsive span overrides with `sm`, `md`, `lg`, `xl`.
- `MSidebar` provides collapsible, nested navigation with grouped items and dividers.

### Form-heavy components
- Specialized inputs handle formatting and validation instead of pushing that logic into every application.
- `MInputCreditCard` detects brand and keeps formatting readable.
- `MInputPostCode` validates against country-specific postal code rules.

### Date workflows
- `MDatePicker` and `MDateRangePicker` support inline and popover usage.
- `MDateRangePicker` ships with 12 built-in presets and a toggleable `presetsSidebar` for quick range selection.
- `MCalendarBoard` covers non-form calendar surfaces such as planning, invoices, birthdays, and task density views.

### Rich display components
- `MCarousel` for image and content slideshows.
- `MImage` with aspect ratio, fallback and lazy loading. `MGallery` for responsive image grids.
- `MProgressBar` with animated fills and label support.
- `MRating` for star-based interactive ratings.
- `MCountUp` for animated number counters.
- `MTaskList` for checklist-style task tracking.
- `MDropdownMenu` for context menus and action lists.
- `MBanner` for page-level messaging.

### Interaction model
- Buttons, cards, avatars, tabs and interactive inputs can share the same click effect model.
- Navigation and picker overlays render through shared popover primitives.

## Repository

- GitHub: `https://github.com/Banzamel/mineralui`
- npm: `https://www.npmjs.com/package/@banzamel/mineralui`

## License

MIT - Rafal Polak
