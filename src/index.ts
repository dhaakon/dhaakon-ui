/**
 * @dhaakon/ui — design system + component library for the dhaakon-network.
 *
 * Import the stylesheet once at your app entry:
 *   import '@dhaakon/ui/styles.css';
 * then wrap your tree:
 *   import { DhaakonProvider } from '@dhaakon/ui';
 *
 * Interactive components are built on React Aria, so keyboard behaviour,
 * focus management, screen-reader semantics and RTL come from Adobe's
 * primitives; everything here is appearance.
 */

export { DhaakonProvider, type DhaakonProviderProps } from './components/Provider/DhaakonProvider';
export { Logo, LogoMark, type LogoProps, type LogoMarkProps, type LogoVariant } from './components/Logo/Logo';

/* ---- actions ---------------------------------------------------- */
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button/Button';
export { ButtonGroup, type ButtonGroupProps } from './components/ButtonGroup/ButtonGroup';
export {
  Menu,
  MenuItem,
  MenuGroup,
  MenuSeparator,
  SubMenu,
  type MenuProps,
  type MenuItemProps,
  type MenuGroupProps,
  type SubMenuProps,
} from './components/Menu/Menu';
export { Toolbar, ToolbarSeparator, type ToolbarProps } from './components/Toolbar/Toolbar';

/* ---- forms ------------------------------------------------------ */
export { Field, useField, type FieldProps } from './components/Field/Field';
export { Input, type InputProps } from './components/Input/Input';
export { Textarea, type TextareaProps } from './components/Textarea/Textarea';
export { Checkbox, CheckboxGroup, type CheckboxProps, type CheckboxGroupProps } from './components/Checkbox/Checkbox';
export { Radio, RadioGroup, type RadioProps, type RadioGroupProps } from './components/Radio/Radio';
export { Switch, type SwitchProps } from './components/Switch/Switch';
export { Select, SelectItem, type SelectProps, type SelectItemProps } from './components/Select/Select';
export { ComboBox, type ComboBoxProps } from './components/ComboBox/ComboBox';
export { Slider, type SliderProps } from './components/Slider/Slider';
export { NumberField, type NumberFieldProps } from './components/NumberField/NumberField';
export { SearchField, type SearchFieldProps } from './components/SearchField/SearchField';
export {
  DateField,
  TimeField,
  Segments,
  type DateFieldProps,
  type TimeFieldProps,
} from './components/DateField/DateField';
export {
  Calendar,
  RangeCalendar,
  type CalendarProps,
  type RangeCalendarProps,
} from './components/Calendar/Calendar';
export {
  DatePicker,
  DateRangePicker,
  type DatePickerProps,
  type DateRangePickerProps,
} from './components/DatePicker/DatePicker';
export {
  ColorPicker,
  ColorField,
  ColorSwatch,
  type ColorPickerProps,
  type ColorFieldProps,
  type ColorSwatchProps,
} from './components/ColorPicker/ColorPicker';
export {
  FileTrigger,
  DropZone,
  type FileTriggerProps,
  type DropZoneProps,
} from './components/FileInput/FileInput';

/* ---- containment ------------------------------------------------ */
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
} from './components/Card/Card';
export {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  type TabsProps,
  type TabProps,
  type TabPanelProps,
} from './components/Tabs/Tabs';
export { Accordion, AccordionItem, type AccordionProps, type AccordionItemProps } from './components/Accordion/Accordion';
export { Table, type TableProps, type Column } from './components/Table/Table';
export {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataColumn,
  DataRow,
  DataCell,
  SelectionColumn,
  type DataTableProps,
  type ColumnProps,
  type RowProps,
  type CellProps,
} from './components/DataTable/DataTable';
export {
  GridList,
  GridListItem,
  GridListAction,
  type GridListProps,
  type GridListItemProps,
} from './components/GridList/GridList';
export { Dialog, type DialogProps } from './components/Dialog/Dialog';
export { Modal, type ModalProps } from './components/Modal/Modal';
export { Popover, type PopoverProps } from './components/Popover/Popover';

/* ---- status & feedback ------------------------------------------ */
export { Badge, type BadgeProps, type BadgeTone } from './components/Badge/Badge';
export { Tag, TagGroup, TagList, type TagProps, type TagGroupProps, type TagListProps } from './components/Tag/Tag';
export { Alert, type AlertProps, type AlertTone } from './components/Alert/Alert';
export {
  Progress,
  ProgressRing,
  type ProgressProps,
  type ProgressRingProps,
  type ProgressTone,
} from './components/Progress/Progress';
export { Spinner, Skeleton, type SpinnerProps, type SkeletonProps } from './components/Spinner/Spinner';
export { Meter, type MeterProps } from './components/Meter/Meter';
export { EmptyState, type EmptyStateProps } from './components/EmptyState/EmptyState';
export {
  ToastProvider,
  useToast,
  type ToastOptions,
  type ToastTone,
} from './components/Toast/Toast';
export { Tooltip, type TooltipProps } from './components/Tooltip/Tooltip';

/* ---- identity & navigation -------------------------------------- */
export {
  Avatar,
  AvatarGroup,
  type AvatarProps,
  type AvatarGroupProps,
  type AvatarSize,
  type AvatarStatus,
} from './components/Avatar/Avatar';
export { FeaturedIcon, type FeaturedIconProps, type FeaturedIconTone } from './components/FeaturedIcon/FeaturedIcon';
export { Breadcrumbs, Breadcrumb, type BreadcrumbsProps, type BreadcrumbProps } from './components/Breadcrumbs/Breadcrumbs';
export { Pagination, type PaginationProps } from './components/Pagination/Pagination';

/* ---- utilities --------------------------------------------------- */
export { cn } from './lib/cn';
export * as tokens from './tokens';
