import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { DhaakonProvider } from '@dhaakon/ui';
import { MotionConfig } from '@dhaakon/motion/react';
import '@dhaakon/ui/styles.css';
import './docs.css';

import { Layout } from './parts/Layout';
import { Home } from './pages/Home';
import { Install } from './pages/Install';
import { Foundations } from './pages/Foundations';
import { ComponentIndex } from './pages/ComponentIndex';
import { ComponentPage } from './pages/ComponentPage';
import { Showcase } from './pages/Showcase';

// Hash routing so the static build works behind any path without server rewrites.
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'install', element: <Install /> },
      { path: 'foundations', element: <Foundations /> },
      { path: 'showcase', element: <Showcase /> },
      { path: 'components', element: <ComponentIndex /> },
      { path: 'components/:slug', element: <ComponentPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DhaakonProvider>
      {/* The system curve, matching --dhk-ease, so JS motion and CSS agree. */}
      <MotionConfig transition={{ duration: 420, easing: 'dhaakon' }}>
        <RouterProvider router={router} />
      </MotionConfig>
    </DhaakonProvider>
  </StrictMode>,
);
