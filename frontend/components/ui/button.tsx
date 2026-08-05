import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-[background-color,box-shadow,color,border-color] duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-slateink shadow-cta hover:bg-accent-hover hover:text-white',
  secondary: 'border border-hairline bg-surface text-slateink shadow-card hover:bg-accent-soft',
  ghost: 'bg-transparent text-slateink hover:bg-accent-soft',
  link: 'bg-transparent px-0 text-slateink underline decoration-hairline decoration-2 underline-offset-4 hover:decoration-accent',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], variant === 'link' ? 'h-auto' : sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly children: ReactNode;
};

export const Button = ({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) => (
  <button className={buttonClasses(variant, size, className)} {...props} />
);

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  readonly href: string;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly children: ReactNode;
};

export const ButtonLink = ({
  href,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) => {
  const classes = buttonClasses(variant, size, className);

  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return <a className={classes} href={href} {...props} />;
  }

  return <Link className={classes} href={href} {...props} />;
};
