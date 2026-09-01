import { type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Marker } from './Marker';

export interface LogoMarqueeProps extends HTMLAttributes<HTMLDivElement> {
  /** Names to scroll — "Ford", "Meta", "Google"… */
  logos: string[];
  /** Seconds for one full loop. Default 40. */
  speed?: number;
  /** Trailing ↗ on each, as on dhaakon.com. Default true. */
  arrow?: boolean;
}

/** The infinite client wall. Pauses on hover. */
export function LogoMarquee({ logos, speed = 40, arrow = true, className, ...rest }: LogoMarqueeProps) {
  const doubled = [...logos, ...logos];
  return (
    <div
      className={cn('dhk-marquee', className)}
      style={{ ['--dhk-marquee-duration' as string]: `${speed}s` }}
      {...rest}
    >
      <div className="dhk-marquee__track">
        {doubled.map((name, i) => (
          <span className="dhk-marquee__item" key={i} aria-hidden={i >= logos.length}>
            {name}
            {arrow && <Marker glyph="arrow-ne" />}
          </span>
        ))}
      </div>
    </div>
  );
}
