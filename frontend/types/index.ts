export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly description: string;
};

export type SiteConfig = {
  readonly name: string;
  readonly legalName: string;
  readonly coachName: string;
  readonly tagline: string;
  readonly description: string;
  readonly url: string;
  readonly email: string;
  readonly socials: readonly SocialLink[];
};

export type SocialLink = {
  readonly platform: 'instagram' | 'youtube';
  readonly handle: string;
  readonly href: string;
  readonly label: string;
};

export type Credential = {
  readonly title: string;
  readonly issuer: string;
  readonly abbreviation: string;
  readonly detail: string;
};

export type Specialty = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: IconName;
  readonly outcomes: readonly string[];
};

export type Program = {
  readonly slug: string;
  readonly name: string;
  readonly durationWeeks: number;
  readonly format: string;
  readonly priceLabel: string;
  readonly bestFor: string;
  readonly summary: string;
  readonly inclusions: readonly string[];
  readonly featured: boolean;
};

export type Resource = {
  readonly slug: string;
  readonly title: string;
  readonly type: 'Guide' | 'Checklist' | 'Calculator' | 'Video';
  readonly readTime: string;
  readonly summary: string;
  readonly icon: IconName;
};

export type Transformation = {
  readonly slug: string;
  readonly clientAlias: string;
  readonly ageBracket: string;
  readonly focus: string;
  readonly durationLabel: string;
  readonly headlineMetric: string;
  readonly secondaryMetrics: readonly string[];
  readonly story: string;
};

export type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type ProcessStep = {
  readonly step: number;
  readonly title: string;
  readonly description: string;
};

export type IconName =
  | 'activity'
  | 'apple'
  | 'calendar-check'
  | 'clipboard-list'
  | 'dumbbell'
  | 'flame'
  | 'graduation-cap'
  | 'heart-pulse'
  | 'leaf'
  | 'line-chart'
  | 'message-circle'
  | 'moon'
  | 'notebook-pen'
  | 'play-circle'
  | 'shield-check'
  | 'sparkles'
  | 'utensils';

export type ActionState<TFieldKey extends string = string> = {
  readonly status: 'idle' | 'success' | 'error';
  readonly message: string;
  readonly fieldErrors?: Partial<Record<TFieldKey, string>>;
};
