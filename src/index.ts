/**
 * @dhaakon/ui — design system + component library for the dhaakon-network.
 *
 * Import the stylesheet once at your app entry:
 *   import '@dhaakon/ui/styles.css';
 * then wrap your tree:
 *   import { DhaakonProvider } from '@dhaakon/ui';
 */

export { DhaakonProvider, type DhaakonProviderProps } from './components/Provider/DhaakonProvider';

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button/Button';

export { Field, useField, type FieldProps } from './components/Field/Field';
export { Input, type InputProps } from './components/Input/Input';
export { Textarea, type TextareaProps } from './components/Textarea/Textarea';

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
} from './components/Card/Card';

export { Badge, type BadgeProps, type BadgeTone } from './components/Badge/Badge';

export {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  type TabsProps,
  type TabProps,
  type TabPanelProps,
} from './components/Tabs/Tabs';

export { Table, type TableProps, type Column } from './components/Table/Table';

export { Dialog, type DialogProps } from './components/Dialog/Dialog';

export {
  ToastProvider,
  useToast,
  type ToastOptions,
  type ToastTone,
} from './components/Toast/Toast';

export { cn } from './lib/cn';
export * as tokens from './tokens';
