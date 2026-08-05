'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type RevealProps = {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Minimal client-side scroll reveal wrapper. Kept intentionally tiny so that
 * Framer Motion never leaks into page-level Server Components.
 */
export const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
      viewport={{ once: true, amount: 0.2 }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
};

type RevealListProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export const RevealList = ({ children, className }: RevealListProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      transition={{ staggerChildren: 0.06 }}
      variants={{ hidden: {}, visible: {} }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
};

export const RevealItem = ({ children, className }: RevealListProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
