import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Marker, type GlyphName } from './Marker';

export interface SectionMarkerProps extends HTMLAttributes<HTMLDivElement> {
  /** Section number — "01", "02"… Rendered inside `[ ]`. */
  index: ReactNode;
  label: ReactNode;
  /** Trailing glyph. Default `arrow-se` (↘), as on dhaakon.com. */
  glyph?: GlyphName | null;
}

/** `[ 01 ] The approach ↘` */
export function SectionMarker({ index, label, glyph = 'arrow-se', className, ...rest }: SectionMarkerProps) {
  return (
    <div className={cn('dhk-sectionmarker', className)} {...rest}>
      <span className="dhk-sectionmarker__index">{index}</span>
      <span>{label}</span>
      {glyph && <Marker glyph={glyph} />}
    </div>
  );
}

export interface SectionIntroProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  index?: ReactNode;
  eyebrow?: ReactNode;
  markerGlyph?: GlyphName | null;
  /** Large statement line. */
  title: ReactNode;
  /** Serif line under the title. */
  subtitle?: ReactNode;
  /** Body paragraph. */
  lead?: ReactNode;
}

/** Marker → statement → serif subtitle → lead paragraph. The section opener. */
export function SectionIntro({
  index,
  eyebrow,
  markerGlyph,
  title,
  subtitle,
  lead,
  className,
  children,
  ...rest
}: SectionIntroProps) {
  return (
    <div className={cn('dhk-sectionintro', className)} {...rest}>
      {(index != null || eyebrow != null) && (
        <SectionMarker index={index ?? ''} label={eyebrow ?? ''} glyph={markerGlyph} />
      )}
      <h2 className="dhk-sectionintro__title">{title}</h2>
      {subtitle != null && <p className="dhk-sectionintro__subtitle">{subtitle}</p>}
      {lead != null && <p className="dhk-sectionintro__lead">{lead}</p>}
      {children}
    </div>
  );
}
