import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LogoMark } from "@dhaakon/ui";
import {
  CATEGORIES,
  COMPONENTS,
  LAYERS,
  MOTION_DOCS_URL,
  STORYBOOK_URL,
  byLayer,
} from "../lib/registry";

const THEME_KEY = "dhaakon-ui-docs-theme";
const guides = [
  ["/", "Overview"],
  ["/workbench", "Research workbench"],
  ["/editorial", "Editorial practice"],
  ["/accessibility", "Interaction contracts"],
  ["/install", "Installation"],
  ["/foundations", "Foundations"],
  ["/components", "Component atlas"],
  ["/showcase", "Motion composition"],
] as const;

export function Layout() {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* Storage is optional. */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const main = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstRoute = useRef(true);
  const search = query.trim().toLowerCase();
  const matches = COMPONENTS.filter((c) =>
    `${c.name} ${c.category} ${c.summary}`.toLowerCase().includes(search),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* Session theme still works. */
    }
  }, [theme]);

  useEffect(() => {
    setMenuOpen(false);
    const page =
      guides.find(([path]) => path === location.pathname)?.[1] ??
      COMPONENTS.find((c) => location.pathname === `/components/${c.slug}`)
        ?.name ??
      "Page not found";
    document.title = `${page} — Dhaakon UI`;
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    main.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <>
      <a
        className="doc-skip"
        href="#doc-content"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
          main.current?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <header className="doc-top">
        <NavLink
          to="/"
          className="doc-top__brand"
          aria-label="Dhaakon UI overview"
        >
          <LogoMark size={22} />
          <span>
            Dhaakon <span className="doc-top__slash">/</span> UI
          </span>
        </NavLink>
        <span className="doc-top__ver">v{__KIT_VERSION__}</span>
        <nav className="doc-top__links" aria-label="Ecosystem">
          <a href="https://dhaakon.com" target="_blank" rel="noreferrer">
            Practice ↗
          </a>
          <a href={MOTION_DOCS_URL} target="_blank" rel="noreferrer">
            Motion ↗
          </a>
          <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">
            Storybook ↗
          </a>
        </nav>
        <button
          type="button"
          className="doc-top__theme"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          aria-label={`Use ${theme === "dark" ? "light" : "dark"} theme`}
        >
          <span aria-hidden>{theme === "dark" ? "◐" : "◑"}</span>
          <span className="doc-theme-label">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
        <button
          ref={menuButton}
          type="button"
          className="doc-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="doc-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close −" : "Explore +"}
        </button>
      </header>
      <div className="doc-shell">
        <nav
          id="doc-navigation"
          className={`doc-side${menuOpen ? " doc-side--open" : ""}`}
          aria-label="Documentation"
          onKeyDown={(event) => {
            if (event.key === "Escape" && menuOpen) {
              setMenuOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          <div className="doc-side__search">
            <label htmlFor="doc-search">Find a component</label>
            <input
              id="doc-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the atlas…"
            />
            {search && (
              <p role="status">
                {matches.length} matching{" "}
                {matches.length === 1 ? "page" : "pages"}
              </p>
            )}
          </div>
          {!search && (
            <div className="doc-side__guides">
              <div className="doc-side__group">The system</div>
              {guides.map(([path, label]) => (
                <NavLink
                  key={path}
                  to={path}
                  end
                  className={({ isActive }) => (isActive ? "is-active" : "")}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
          {LAYERS.map((layer) => {
            const items = byLayer(layer.id).filter((c) => matches.includes(c));
            if (!items.length) return null;
            return (
              <div key={layer.id}>
                <div className="doc-side__layer">
                  {layer.label}
                  <span>{String(items.length).padStart(2, "0")}</span>
                </div>
                {CATEGORIES.map((category) => {
                  const entries = items.filter((c) => c.category === category);
                  if (!entries.length) return null;
                  return (
                    <div key={category}>
                      <div className="doc-side__group">{category}</div>
                      {entries.map((c) => (
                        <NavLink
                          key={c.slug}
                          to={`/components/${c.slug}`}
                          className={({ isActive }) =>
                            isActive ? "is-active" : ""
                          }
                        >
                          {c.name}
                          {c.aria && (
                            <span
                              className="doc-side__aria"
                              title="Built on React Aria"
                            >
                              aria
                            </span>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {search && !matches.length && (
            <p className="doc-side__empty">
              No match. Try “select”, “data”, or “editorial”.
            </p>
          )}
          <div className="doc-side__foot">
            Built to make.
            <br />
            Documented to travel.
          </div>
        </nav>
        <main id="doc-content" data-route={location.pathname} ref={main} tabIndex={-1} className="doc-main">
          <Suspense
            fallback={
              <div className="doc-loading" role="status">
                Loading this study…
              </div>
            }
          >
            <Outlet />
          </Suspense>
          <footer className="doc-footer">
            <span>Dhaakon UI / {__KIT_VERSION__}</span>
            <Link to="/install">Build with the system ↗</Link>
          </footer>
        </main>
      </div>
    </>
  );
}
