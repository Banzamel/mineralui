# MineralUI

React component framework for dashboards, admin panels, documentation shells, settings screens and data-heavy internal products.

- npm: `@banzamel/mineralui`
- release version: `0.10.0`
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
- `MSidebar`, `MSidebarItem`, `MSidebarGroup`, `MSidebarDivider` — top-level items outside groups now share group-header styling
- `MSubNav`
- `MBreadcrumb` — single-line path navigation with collapsible middle items and ellipsis overflow
- `MPagination` — numbered and simple page navigation
- `MAppShell`, `MBody` — top-level app structure; auto-detects `MSidebar` among direct children and wraps the rest in an internal content column

### Cards
- `MCard`, `MCardHeader`, `MCardBody`, `MCardFooter` — generic content card
- `MCardPayment` — display-only payment card with balance, masked number, holder name and brand badge
- `MCardBusiness` — business card with `user` and `company` variants, avatar, online status indicator, contact info, QR code and social links
- `MCardService` — service/course/product card with `service`, `course` and `product` variants, gallery, rating, favorites, dropdown menu, participant avatars and add-to-cart
- `MCardGrid` — grid container with built-in search, filter by object fields and sort toolbar

### Data
- `MDataTable` — data-driven table with sorting, filtering, pagination and row selection
- `MTreeView` — hierarchical tree list with dashed indent guide lines, automatic file/folder icons by extension and selection
- `MTaskList`, `MTaskItem` — checklist-style task tracking
- `MCalendarBoard`, `MCalendarDayCell`, `MCalendarEventList`, `MCalendarEventItem`, `MCalendarEventPopover`, `MCalendarTimeline`

### Feedback
- `MAlert`, `MBanner` — inline and page-level messaging
- `MBadge` — compact semantic label with `pulsing` prop for attention
- `MTag` — interactive tags with close buttons and outlined variant
- `MSpinner`, `MLoader` — loading indicators
- `MToastProvider`, `useMToast` — toast notification system with auto-dismiss, smooth fade-out animation and 6 position options

### Overlays
- `MModal` — blocking overlay for dense details and mobile-friendly dialogs
- `MDrawer` — slide-out panel from any edge of the screen
- `MTooltip` — hover/focus tooltip with 4 placements, delay and Portal-based rendering
- `MPopconfirm` — confirmation popover built on MPopover
- `MDropdownMenu`, `MDropdownItem`, `MDropdownGroup`, `MDropdownDivider` — context menus and action lists

### Media
- `MAvatar` — user avatar with size, shape and fallback initials
- `MImage` — image with aspect ratio, fallback and lazy loading
- `MGallery` — responsive image grid
- `MCarousel` — image and content slideshows

### Display
- `MAccordion`, `MAccordionItem` — disclosure group with single or multiple open state
- `MCollapsible` — single collapsible section
- `MProgressBar` — animated progress with label support
- `MCountUp` — animated number counters
- `MRating` — star-based interactive ratings
- `MColorPicker` — visual color picker with hue/saturation area, hex/rgb/hsl input and swatches

### Typography
- `MHeading`, `MText`, `MSubText`, `MLink`, `MCode`, `MList`, `MListItem`
- `MKbd` — inline keyboard key indicator for shortcuts and key combinations

### Controls
- `MButton` — action primitive with `pulsing` prop for attention-drawing glow animation
- `MCheckbox`
- `MRadio`, `MRadioGroup`
- `MToggle`
- `MSlider` — drag-based range input with marks and labels

### Inputs
- `MInput`, `MTextarea`
- `MInputPassword`, `MInputNumber`, `MInputSearch`, `MInputEmail`
- `MInputPhone`, `MInputName`, `MInputIBAN`, `MInputTaxId`, `MInputCurrency`
- `MInputCreditCard`, `MInputPostCode`
- `MInputOTP` — one-time password input with auto-focus and paste support
- `MInputSlider` — combined slider track with numeric input field
- `MInputFile` — file upload dropzone with drag-and-drop, thumbnails and image cropping
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

### Icons
- `MIcon` — base icon component with size, color and className support
- 130+ built-in SVG glyphs: arrows, chevrons, actions, devices, files, flags, brands and more
- All icons are tree-shakeable individual exports
- Used internally by `MRating`, `MSidebar`, `MTreeView` and other components

### Hooks and utilities
- `useReveal` — viewport reveal animation with IntersectionObserver
- `useGhostText` — inline ghost text suggestions for any text input
- `mergeClasses`
- `useDebounce`, `useDebouncedCallback`
- `useOutsideClick`
- `useKeyNavigation`
- `useClickEffect`

## Feature Highlights

### Layout-first API
- `MAppShell` auto-detects `MSidebar` among its direct children — no separate prop needed. Place `MSidebar`, `MHeader`, `MBody` and other elements as siblings inside `MAppShell`.
- `MBody` provides default padding for page content.
- `MStack`, `MInline` and `MGrid` cover the majority of internal dashboard layouts without extra utility libraries.
- `MGrid` supports equal columns by default and responsive span overrides with `sm`, `md`, `lg`, `xl`.
- `MSidebar` provides collapsible, nested navigation with grouped items and dividers. Top-level items outside groups automatically inherit group-header styling.

### Card system
- `MCard` is the generic container; specialized cards (`MCardPayment`, `MCardBusiness`, `MCardService`) handle domain-specific layouts.
- `MCardBusiness` supports `user` and `company` variants with pulsing online/offline status indicator, QR code and social links.
- `MCardService` covers three use cases (`service`, `course`, `product`) with gallery, avatar stack, rating, favorites and add-to-cart.
- `MCardGrid` wraps any card type with a toolbar for search, filtering by object fields and sort direction.

### Reveal animations
- `reveal` prop on `MCard`, `MStack`, `MInline`, `MSurface`, `MSection` — elements animate into view when they enter the viewport.
- Supports custom delay with `reveal={0.2}` for staggered effects.
- Respects `prefers-reduced-motion` automatically.

### Ghost text suggestions
- `ghostOptions` prop on `MInput` and `MTextarea` — shows inline ghost text as the user types.
- Tab or Enter accepts the suggestion, arrow keys cycle through matches.
- `useGhostText` hook is exported for use in custom components like chat inputs or search bars.

### Toast notifications
- `MToastProvider` wraps your app, `useMToast()` fires notifications from anywhere.
- 6 positions, 7 color variants, auto-dismiss with configurable duration.
- Smooth fade-out animation with scale and blur transition.

### Form-heavy components
- Specialized inputs handle formatting and validation instead of pushing that logic into every application.
- `MInputCreditCard` detects brand and keeps formatting readable.
- `MInputPostCode` validates against country-specific postal code rules.
- `MInputFile` supports drag-and-drop, file type filtering, size limits, image thumbnails and built-in crop editor.
- `MInputOTP` splits a code into individual digit fields with auto-focus and paste support.
- `MInputSlider` combines a slider track with a numeric input, keeping both in sync.

### Date workflows
- `MDatePicker` and `MDateRangePicker` support inline and popover usage.
- `MDateRangePicker` ships with 12 built-in presets and a toggleable `presetsSidebar` for quick range selection.
- `MCalendarBoard` covers non-form calendar surfaces such as planning, invoices, birthdays, and task density views.

### Data and navigation
- `MDataTable` — sortable, filterable, paginated table with row selection and custom cell rendering.
- `MBreadcrumb` — single-line path navigation with automatic ellipsis collapsing for deep hierarchies.
- `MPagination` — numbered and simple page controls with dot collapsing.
- `MTreeView` — hierarchical tree with dashed indent guide lines, automatic file/folder icons per extension and node selection.

### Interaction model
- `MButton` and `MBadge` support a `pulsing` prop for attention-drawing glow animation in the component's color.
- Buttons, cards, avatars, tabs and interactive inputs can share the same click effect model.
- Navigation and picker overlays render through shared popover primitives.

## Architecture

Components are organized into focused groups under `src/components/`:

| Group | Purpose |
|-------|---------|
| `cards` | Card containers and specialized card types |
| `data` | Tables, trees, calendars and task lists |
| `feedback` | Alerts, badges, tags, spinners and toasts |
| `overlays` | Modals, drawers, tooltips and dropdown menus |
| `media` | Images, galleries, carousels and avatars |
| `display` | Accordions, progress bars, ratings and color picker |
| `controls` | Buttons, checkboxes, radios, toggles and sliders |
| `inputs` | Text inputs and specialized input variants |
| `dropdowns` | Select, autocomplete and date/time pickers |
| `layout` | Containers, grids, sidebars and navigation |
| `typography` | Headings, text, links, code and lists |
| `form` | Form context, field hooks and validators |
| `primitives` | Portal and popover building blocks |

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

    /* Z-index layers */
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
- readable local class names
- no runtime dependencies besides React peer dependencies
- dark and light mode supported through the same token system
- default scrollbar styling and typography reset come from the framework styles

## Repository

- GitHub: `https://github.com/Banzamel/mineralui`
- npm: `https://www.npmjs.com/package/@banzamel/mineralui`
