import { Fragment, isValidElement, type ReactNode } from 'react';

/** Conditional JSX and blank text are absent messages; numeric zero is content. */
export function hasFieldMessage(message: ReactNode): boolean {
  if (message == null || typeof message === 'boolean') return false;
  if (typeof message === 'string') return message.trim().length > 0;
  if (Array.isArray(message)) return message.some(hasFieldMessage);
  if (isValidElement<{ children?: ReactNode }>(message) && message.type === Fragment) {
    return hasFieldMessage(message.props.children);
  }
  // Custom React elements are content: never invoke a component to inspect it.
  return true;
}
