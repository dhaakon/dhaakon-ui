import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LogoMark } from '@dhaakon/ui';
import { CATEGORIES, COMPONENTS, LAYERS, STORYBOOK_URL, byLayer } from '../lib/registry';

const THEME_KEY = 'dhaakon-ui-docs-theme';

export function Layout() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') ?? 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Private windows can throw on write; the theme still applies this session.
    }
  }, [theme]);

  return (
    <>
      <header className="doc-top">
        <NavLink to="/" className="doc-top__brand">
          <LogoMark size={20} /> Dhaakon UI
        </NavLink>
        <span className="doc-top__ver">v{__KIT_VERSION__}</span>
        <nav className="doc-top__links">
          <NavLink to="/install">Install</NavLink>
          <NavLink to="/foundations">Foundations</NavLink>
          <NavLink to="/components">Components</NavLink>
          <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">Storybook ↗</a>
          <button
            type="button"
            className="doc-top__theme"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </nav>
      </header>

      <div className="doc-shell">
        <nav className="doc-side">
          <div className="doc-side__group">Guide</div>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : '')}>Overview</NavLink>
          <NavLink to="/install" className={({ isActive }) => (isActive ? 'is-active' : '')}>Install</NavLink>
          <NavLink to="/foundations" className={({ isActive }) => (isActive ? 'is-active' : '')}>Foundations</NavLink>
          <NavLink to="/components" end className={({ isActive }) => (isActive ? 'is-active' : '')}>All components</NavLink>

          {LAYERS.map((layer) => {
            const inLayer = byLayer(layer.id);
            if (!inLayer.length) return null;
            return (
              <div key={layer.id}>
                <div className="doc-side__layer">{layer.label}</div>
                {CATEGORIES.map((cat) => {
                  const items = inLayer.filter((c) => c.category === cat);
                  if (!items.length) return null;
                  return (
                    <div key={cat}>
                      <div className="doc-side__group">{cat}</div>
                      {items.map((c) => (
                        <NavLink
                          key={c.slug}
                          to={`/components/${c.slug}`}
                          className={({ isActive }) => (isActive ? 'is-active' : '')}
                        >
                          {c.name}
                          {c.aria && <span className="doc-side__aria" title="Built on React Aria">aria</span>}
                        </NavLink>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <main className="doc-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
