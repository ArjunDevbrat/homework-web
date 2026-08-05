import {
  Activity,
  Apple,
  CalendarCheck,
  ClipboardList,
  Dumbbell,
  Flame,
  GraduationCap,
  HeartPulse,
  Leaf,
  LineChart,
  MessageCircle,
  Moon,
  NotebookPen,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Utensils,
  type LucideIcon,
} from 'lucide-react';

import type { IconName } from '@/types';

const registry: Record<IconName, LucideIcon> = {
  activity: Activity,
  apple: Apple,
  'calendar-check': CalendarCheck,
  'clipboard-list': ClipboardList,
  dumbbell: Dumbbell,
  flame: Flame,
  'graduation-cap': GraduationCap,
  'heart-pulse': HeartPulse,
  leaf: Leaf,
  'line-chart': LineChart,
  'message-circle': MessageCircle,
  moon: Moon,
  'notebook-pen': NotebookPen,
  'play-circle': PlayCircle,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  utensils: Utensils,
};

export function getIcon(name: IconName): LucideIcon {
  return registry[name];
}
