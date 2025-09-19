import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.5 2.1C5.4 3.4 2.1 7.2 2.1 11.5c0 3.3 1.7 6.3 4.4 8" />
      <path d="M14.5 2.1c4.1 1.3 7.4 5.1 7.4 9.4 0 3.3-1.7 6.3-4.4 8" />
      <path d="M12 22v-3.3" />
      <path d="M12 14.5v-3.2" />
      <path d="M4.5 10.5h15" />
      <path d="M4.5 15.5h15" />
    </svg>
  );
}
