import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Link, RouterProvider, createHashRouter } from "react-router-dom";
import { DhaakonProvider } from "@dhaakon/ui";
import { MotionConfig } from "@dhaakon/motion/react";
import "@dhaakon/ui/styles.css";
import "./docs.css";
import { Layout } from "./parts/Layout";

// Metadata is small; examples, source snippets, and compositions load on demand.
const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home })),
);
const Install = lazy(() =>
  import("./pages/Install").then((m) => ({ default: m.Install })),
);
const Foundations = lazy(() =>
  import("./pages/Foundations").then((m) => ({ default: m.Foundations })),
);
const ComponentIndex = lazy(() =>
  import("./pages/ComponentIndex").then((m) => ({ default: m.ComponentIndex })),
);
const ComponentPage = lazy(() =>
  import("./pages/ComponentPage").then((m) => ({ default: m.ComponentPage })),
);
const Showcase = lazy(() =>
  import("./pages/Showcase").then((m) => ({ default: m.Showcase })),
);
const Workbench = lazy(() =>
  import("./pages/Workbench").then((m) => ({ default: m.Workbench })),
);
const Editorial = lazy(() =>
  import("./pages/Editorial").then((m) => ({ default: m.Editorial })),
);
const Accessibility = lazy(() =>
  import("./pages/Accessibility").then((m) => ({ default: m.Accessibility })),
);

// Keep published hash URLs working on static hosts without rewrite assumptions.
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "install", element: <Install /> },
      { path: "foundations", element: <Foundations /> },
      { path: "workbench", element: <Workbench /> },
      { path: "editorial", element: <Editorial /> },
      { path: "accessibility", element: <Accessibility /> },
      { path: "showcase", element: <Showcase /> },
      { path: "components", element: <ComponentIndex /> },
      { path: "components/:slug", element: <ComponentPage /> },
      {
        path: "*",
        element: (
          <>
            <div className="doc-kicker">404 / Off the map</div>
            <h1 className="doc-h1">No study at this address.</h1>
            <p className="doc-p">
              The component atlas is a good place to pick up the thread.
            </p>
            <Link className="doc-action" to="/components">
              Explore the atlas ↗
            </Link>
          </>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DhaakonProvider>
      <MotionConfig transition={{ duration: 420, easing: "dhaakon" }}>
        <RouterProvider router={router} />
      </MotionConfig>
    </DhaakonProvider>
  </StrictMode>,
);
