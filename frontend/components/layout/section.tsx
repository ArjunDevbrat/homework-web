import type { ElementType, ReactNode } from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

type SectionProps = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly className?: string;
  readonly containerClassName?: string;
  readonly tone?: 'canvas' | 'surface';
  readonly density?: 'default' | 'dense';
  readonly bordered?: boolean;
  readonly as?: ElementType;
  readonly testId?: string;
};

export const Section = ({
  children,
  id,
  className,
  containerClassName,
  tone = 'canvas',
  density = 'default',
  bordered = true,
  as: Component = 'section',
  testId,
}: SectionProps) => (
  <Component
    className={cn(
      tone === 'surface' ? 'bg-surface' : 'bg-canvas',
      bordered && 'border-t border-hairline',
      className,
    )}
    data-testid={testId}
    id={id}
  >
    <Container
      className={cn(density === 'dense' ? 'py-14 sm:py-16' : 'py-20 sm:py-24 lg:py-28', containerClassName)}
    >
      {children}
    </Container>
  </Component>
);
