import type { ElementType, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  readonly as?: ElementType;
  readonly width?: 'default' | 'narrow';
};

export const Container = ({
  as: Component = 'div',
  width = 'default',
  className,
  ...props
}: ContainerProps) => (
  <Component
    className={cn(
      'mx-auto w-full px-5 sm:px-6 lg:px-8',
      width === 'default' ? 'max-w-content' : 'max-w-3xl',
      className,
    )}
    {...props}
  />
);
