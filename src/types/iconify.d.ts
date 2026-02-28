/// <reference types="iconify-icon" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon: string;
        width?: string | number;
        height?: string | number;
        'stroke-width'?: string | number;
      };
    }
  }
}

export {};
