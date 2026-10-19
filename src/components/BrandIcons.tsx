import type { SVGProps } from "react";

export function InstagramIcon({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SparkleIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true" {...props}>
      <path d="M12 2.5c.6 5.2 4.3 8.9 9.5 9.5-5.2.6-8.9 4.3-9.5 9.5-.6-5.2-4.3-8.9-9.5-9.5 5.2-.6 8.9-4.3 9.5-9.5Z" />
    </svg>
  );
}
