import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Marker, type GlyphName } from './Marker';

export interface HeadingAnnotation {
  text: ReactNode;
  glyph?: GlyphName;
  /** Position as a percentage of the heading box. */
  x: number;
  y: number;
}

export interface DisplayHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  /** Floating mono annotations, staggered in — the `AI ↗ · craft ↘ · team ◎` layer. */
  annotations?: HeadingAnnotation[];
  as?: 'h1' | 'h2' | 'div';
}

/** The oversized Plex display line with scattered marker annotations. */
export function DisplayHeading({
  children,
  annotations = [],
  as: Tag = 'h1',
  className,
  ...rest
}: DisplayHeadingProps) {
  return (
    <Tag className={cn('dhk-displayheading', className)} {...rest}>
      {children}
      {annotations.length > 0 && (
        <span className="dhk-displayheading__annos" aria-hidden>
          {annotations.map((a, i) => (
            <span
              key={i}
              className="dhk-displayheading__anno"
              style={{ left: `${a.x}%`, top: `${a.y}%`, ['--dhk-anno-delay' as string]: `${i * 90}ms` }}
            >
              {a.text}
              {a.glyph && <Marker glyph={a.glyph} />}
            </span>
          ))}
        </span>
      )}
    </Tag>
  );
}
