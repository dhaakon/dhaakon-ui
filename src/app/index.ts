/**
 * @dhaakon/ui/app — application composites.
 *
 * Assemblies rather than primitives: the shells, headers, metric bands, feeds
 * and filter bars that application screens are actually made of. Everything
 * here is built from `@dhaakon/ui`, so it inherits the same tokens and the
 * same React Aria behaviour.
 *
 * Its counterpart is `@dhaakon/ui/site`, which carries the editorial patterns
 * from dhaakon.com.
 */

/* ---- shell & navigation ------------------------------------------ */
export { AppShell, type AppShellProps } from './AppShell';
export { HeaderNav, type HeaderNavProps, type HeaderNavLink } from './HeaderNav';
export { SidebarNav, type SidebarNavProps, type SidebarNavGroup, type SidebarNavItem } from './SidebarNav';
export {
  PageHeader,
  SectionHeader,
  type PageHeaderProps,
  type SectionHeaderProps,
} from './PageHeader';
export { TreeView, type TreeViewProps, type TreeNode } from './TreeView';
export { CommandMenu, type CommandMenuProps, type Command } from './CommandMenu';

/* ---- data ---------------------------------------------------------- */
export {
  MetricTile,
  MetricRow,
  Sparkline,
  type MetricTileProps,
  type MetricRowProps,
  type SparklineProps,
} from './Metrics';
export { StatList, type StatListProps, type Stat } from './StatList';
export { ActivityFeed, type ActivityFeedProps, type ActivityItem } from './ActivityFeed';
export { DataGrid, type DataGridProps } from './DataGrid';
export { FilterBar, type FilterBarProps, type AppliedFilter } from './FilterBar';
export { PaginationBar, type PaginationBarProps } from './PaginationBar';
export { FileList, type FileListProps, type UploadFile } from './FileList';

/* ---- forms & flows ------------------------------------------------- */
export { FormSection, SettingRow, type FormSectionProps, type SettingRowProps } from './Form';
export {
  VerificationCodeInput,
  type VerificationCodeInputProps,
} from './VerificationCodeInput';
export { ProgressSteps, type ProgressStepsProps, type Step } from './ProgressSteps';
export { ConfirmDialog, type ConfirmDialogProps } from './ConfirmDialog';

/* ---- messaging & pages --------------------------------------------- */
export { NotificationList, type NotificationListProps, type Notification } from './NotificationList';
export { InlineCTA, type InlineCTAProps } from './InlineCTA';
export { LoginPanel, type LoginPanelProps } from './LoginPanel';
export { ErrorPage, type ErrorPageProps } from './ErrorPage';
