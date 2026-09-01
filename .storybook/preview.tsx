import type { Preview } from '@storybook/react-vite';
import { DhaakonProvider } from '../src/components/Provider/DhaakonProvider';
import '../src/styles/dhaakon-ui.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    options: {
      storySort: {
        order: ['Foundations', ['Introduction', 'Colour', 'Typography', 'Spacing & Motion'], 'Components'],
      },
    },
    a11y: { test: 'todo' },
  },
  globalTypes: {
    theme: {
      description: 'Colour theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, ctx) => (
      <DhaakonProvider theme={ctx.globals.theme as 'light' | 'dark'} className="sb-frame">
        <Story />
      </DhaakonProvider>
    ),
  ],
};

export default preview;
