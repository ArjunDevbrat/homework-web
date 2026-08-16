/**
 * Domain types for the HOMEWORK platform.
 *
 * Every value rendered by the UI is described here first — components consume these
 * types and never invent their own shapes. All collections are readonly so content
 * cannot be mutated at runtime.
 */

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

export type IconName =
  | 'activity'
  | 'apple'
  | 'award'
  | 'baby'
  | 'bar-chart'
  | 'brain'
  | 'calendar-check'
  | 'clipboard-list'
  | 'droplet'
  | 'dumbbell'
  | 'egg'
  | 'flame'
  | 'flask-conical'
  | 'graduation-cap'
  | 'heart'
  | 'heart-pulse'
  | 'leaf'
  | 'line-chart'
  | 'message-circle'
  | 'moon'
  | 'notebook-pen'
  | 'party-popper'
  | 'play-circle'
  | 'salad'
  | 'scale'
  | 'shield-check'
  | 'shield-plus'
  | 'smartphone'
  | 'sparkles'
  | 'stethoscope'
  | 'sun'
  | 'target'
  | 'trending-up'
  | 'users'
  | 'utensils'
  | 'video'
  | 'wheat'
  | 'wind';

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly description: string;
};

export type SocialLink = {
  readonly platform: 'instagram' | 'youtube';
  readonly handle: string;
  readonly href: string;
  readonly label: string;
};

export type SiteConfig = {
  readonly name: string;
  readonly legalName: string;
  readonly coachName: string;
  readonly tagline: string;
  readonly description: string;
  readonly url: string;
  readonly email: string;
  readonly whatsappNumber: string;
  readonly socials: readonly SocialLink[];
};

/* ------------------------------------------------------------------ */
/* Homepage hero                                                       */
/* ------------------------------------------------------------------ */

export type HeroMetrics = {
  readonly headline: string;
  readonly subheadline: string;
  readonly primaryCtaLabel: string;
  readonly secondaryCtaLabel: string;
  readonly metrics: readonly HeroMetric[];
};

export type HeroMetric = {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly detail: string;
  readonly icon: IconName;
};

/* ------------------------------------------------------------------ */
/* Coach profile                                                       */
/* ------------------------------------------------------------------ */

export type Qualification = {
  readonly abbreviation: string;
  readonly title: string;
  readonly issuer: string;
  readonly detail: string;
};

export type CoachProfile = {
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly story: readonly string[];
  readonly shortStory: string;
  readonly qualifications: readonly Qualification[];
  readonly principles: readonly CoachPrinciple[];
  readonly portraitUrl: string;
  readonly portraitAlt: string;
  readonly introVideoUrl: string | null;
};

export type CoachPrinciple = {
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
};

/* ------------------------------------------------------------------ */
/* Conditions treated                                                  */
/* ------------------------------------------------------------------ */

export type ConditionCategory =
  | 'Body composition'
  | 'Metabolic'
  | 'Hormonal'
  | 'Cardiovascular'
  | 'Lifestyle';

export type ConditionTreated = {
  readonly slug: string;
  readonly name: string;
  readonly category: ConditionCategory;
  readonly summary: string;
  readonly icon: IconName;
  readonly featured: boolean;
};

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

export type ProgramPackage = {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly summary: string;
  readonly cadence: string;
  readonly priceLabel: string;
  readonly bestFor: string;
  readonly deliverables: readonly string[];
  readonly freeTrialDays: number | null;
  readonly featured: boolean;
  readonly icon: IconName;
};

/* ------------------------------------------------------------------ */
/* Workflow + client journey                                           */
/* ------------------------------------------------------------------ */

export type WorkflowStep = {
  readonly step: number;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
};

export type ClientJourneyStep = {
  readonly step: number;
  readonly timeLabel: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
};

/* ------------------------------------------------------------------ */
/* FAQs, resources, testimonials                                       */
/* ------------------------------------------------------------------ */

export type FAQCategory = 'Getting started' | 'Health conditions' | 'Equipment' | 'Nutrition' | 'Results';

export type FAQItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: FAQCategory;
};

export type FreeResourceFormat = 'Guide' | 'Checklist' | 'Calculator' | 'Video';

export type FreeResource = {
  readonly slug: string;
  readonly title: string;
  readonly format: FreeResourceFormat;
  readonly pages: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly icon: IconName;
  readonly fileUrl: string | null;
};

export type TestimonialItem = {
  readonly slug: string;
  readonly clientAlias: string;
  readonly ageBracket: string;
  readonly profession: string;
  readonly condition: string;
  readonly durationLabel: string;
  readonly headlineResult: string;
  readonly metrics: readonly string[];
  readonly quote: string;
  readonly story: string;
  readonly imageUrl: string | null;
};

/* ------------------------------------------------------------------ */
/* Forms                                                               */
/* ------------------------------------------------------------------ */

export type Gender = 'FEMALE' | 'MALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';

export type PrimaryGoal =
  | 'FAT_LOSS'
  | 'MUSCLE_BUILDING'
  | 'WEIGHT_GAIN'
  | 'DIABETES_MANAGEMENT'
  | 'PCOS_MANAGEMENT'
  | 'THYROID_MANAGEMENT'
  | 'LIFESTYLE_MODIFICATION'
  | 'HEALTHY_AGING'
  | 'POSTPARTUM_FITNESS';

/** Payload captured by the consultation form on /contact. */
export type ConsultationFormData = {
  readonly fullName: string;
  readonly phone: string;
  readonly age: number;
  readonly gender: Gender;
  readonly goal: PrimaryGoal;
  readonly healthIssue: string;
  readonly profession: string;
  readonly email?: string;
  readonly programSlug?: string;
  readonly consent: true;
};

export type ContactSubmissionData = {
  readonly fullName: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
};

export type SelectOption<TValue extends string = string> = {
  readonly value: TValue;
  readonly label: string;
};

export type ActionState<TFieldKey extends string = string> = {
  readonly status: 'idle' | 'success' | 'error';
  readonly message: string;
  readonly fieldErrors?: Partial<Record<TFieldKey, string>>;
  readonly whatsappUrl?: string;
};
