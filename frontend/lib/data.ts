import type {
  Credential,
  FaqItem,
  NavItem,
  ProcessStep,
  Program,
  Resource,
  SiteConfig,
  Specialty,
  Transformation,
} from '@/types';

export const siteConfig: SiteConfig = {
  name: 'HOMEWORK',
  legalName: 'HOMEWORK Coaching',
  coachName: 'Coach Samrat Aryan',
  tagline: 'Transform Your Health with Evidence-Based Nutrition & Fitness Coaching',
  description:
    'HOMEWORK is the evidence-based coaching practice of Coach Samrat Aryan — sustainable fat loss, muscle building, PCOS and diabetes management, and lifestyle coaching without crash diets or gym dependency.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'contact@homework.fit',
  socials: [
    {
      platform: 'instagram',
      handle: '@homework_samrat',
      href: 'https://instagram.com/homework_samrat',
      label: 'Instagram — @homework_samrat',
    },
    {
      platform: 'youtube',
      handle: '@samrataryan',
      href: 'https://youtube.com/@samrataryan',
      label: 'YouTube — @samrataryan',
    },
  ],
};

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', href: '/', description: 'Evidence-based coaching overview' },
  { label: 'About Coach', href: '/about-coach', description: 'Credentials and coaching philosophy' },
  { label: 'Programs', href: '/programs', description: 'Coaching tracks and what is included' },
  { label: 'Free Resources', href: '/free-resources', description: 'Guides, checklists and calculators' },
  { label: 'Transformations', href: '/transformations', description: 'Client case studies with real metrics' },
  { label: 'Contact', href: '/contact', description: 'Book a free consultation call' },
];

export const legalNav: readonly NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy', description: 'How your data is handled' },
  { label: 'Terms', href: '/terms', description: 'Terms of service' },
  { label: 'Refund Policy', href: '/refund-policy', description: 'Cancellations and refunds' },
];

export const credentials: readonly Credential[] = [
  {
    title: 'B.Sc Nutrition & Dietetics',
    issuer: 'University degree',
    abbreviation: 'B.Sc',
    detail: 'Three years of formal clinical nutrition, biochemistry and dietetics training.',
  },
  {
    title: 'Certified Strength & Hypertrophy Coach',
    issuer: 'HSF',
    abbreviation: 'HSF',
    detail: 'Evidence-based programming for strength, muscle gain and injury-aware progression.',
  },
  {
    title: 'Certified Yoga Coach',
    issuer: 'Yoga certification',
    abbreviation: 'Yoga',
    detail: 'Mobility, breathwork and stress regulation built into every coaching block.',
  },
];

export const trustPromises: readonly string[] = [
  'No crash diets, ever',
  'No gym dependency required',
  'Food you already eat at home',
  'Weekly 1:1 accountability',
];

export const specialties: readonly Specialty[] = [
  {
    slug: 'sustainable-fat-loss',
    title: 'Sustainable Fat Loss',
    summary:
      'A calorie strategy built around your regular home-cooked meals, so the weight you lose stays lost.',
    icon: 'flame',
    outcomes: ['Weekly deficit tuned to your energy', 'Zero banned-food lists', 'Plateau troubleshooting'],
  },
  {
    slug: 'muscle-building',
    title: 'Muscle Building',
    summary:
      'Progressive strength and hypertrophy programming that works with a gym, resistance bands, or bodyweight.',
    icon: 'dumbbell',
    outcomes: ['Protein targets that fit Indian diets', 'Home or gym variants', 'Documented progression'],
  },
  {
    slug: 'pcos-support',
    title: 'PCOS Management',
    summary:
      'Cycle-aware nutrition, insulin-sensitivity focused training and stress load management, coordinated with your doctor.',
    icon: 'heart-pulse',
    outcomes: ['Insulin-aware meal structure', 'Cycle-synced training load', 'Symptom tracking'],
  },
  {
    slug: 'diabetes-lifestyle',
    title: 'Diabetes & Lifestyle',
    summary:
      'Blood-sugar friendly plate building, walking protocols and sleep routines for long-term metabolic health.',
    icon: 'activity',
    outcomes: ['Glucose-aware carb timing', 'Daily movement targets', 'Sleep and stress routines'],
  },
];

export const programs: readonly Program[] = [
  {
    slug: 'foundation-12',
    name: 'Foundation 12',
    durationWeeks: 12,
    format: '1:1 online coaching',
    priceLabel: 'From ₹12,000 / 12 weeks',
    bestFor: 'First-time clients who want fat loss without giving up home food',
    summary:
      'The core HOMEWORK block: habit architecture, a flexible nutrition target and a training plan you can run anywhere.',
    inclusions: [
      'Personalised nutrition target with home-food swaps',
      'Training plan for gym, home or bands',
      'Weekly check-in with written review',
      'WhatsApp support on weekdays',
    ],
    featured: false,
  },
  {
    slug: 'strength-recomp',
    name: 'Strength & Recomp',
    durationWeeks: 16,
    format: '1:1 online coaching + form review',
    priceLabel: 'From ₹18,000 / 16 weeks',
    bestFor: 'Clients who want visible muscle and strength alongside fat loss',
    summary:
      'A periodised hypertrophy block with video form reviews, progressive overload tracking and recomposition nutrition.',
    inclusions: [
      'Periodised strength and hypertrophy programming',
      'Video form reviews every fortnight',
      'Protein-forward Indian meal frameworks',
      'Deload and travel protocols',
    ],
    featured: true,
  },
  {
    slug: 'clinical-care',
    name: 'Clinical Care Track',
    durationWeeks: 20,
    format: '1:1 coaching coordinated with your physician',
    priceLabel: 'From ₹24,000 / 20 weeks',
    bestFor: 'PCOS, prediabetes and type 2 diabetes management',
    summary:
      'A slower, safety-first track that works alongside your treating doctor with symptom and marker tracking.',
    inclusions: [
      'Insulin and cycle-aware nutrition structure',
      'Symptom, marker and cycle tracking sheets',
      'Low-impact training and mobility blocks',
      'Fortnightly video consultation',
    ],
    featured: false,
  },
];

export const programInclusions: readonly string[] = [
  'A nutrition target built from your existing kitchen, not a fixed diet chart',
  'Training you can complete at home, in a park or in a gym',
  'Weekly written check-in reviews with clear next actions',
  'Sleep, steps and stress protocols alongside food and training',
  'Travel, festival and eating-out playbooks',
  'Direct access to Coach Samrat on weekdays',
];

export const coachingProcess: readonly ProcessStep[] = [
  {
    step: 1,
    title: 'Free consultation',
    description:
      'A 20-minute call to understand your history, medical context, schedule and what has failed for you before.',
  },
  {
    step: 2,
    title: 'Your first block',
    description:
      'You receive a nutrition target, a training plan and two habits to install — nothing more, so it actually sticks.',
  },
  {
    step: 3,
    title: 'Weekly review and adjust',
    description:
      'Every week we review data, energy and adherence, then adjust. Progress is documented, never guessed.',
  },
];

export const coachingPrinciples: readonly { title: string; description: string; icon: Specialty['icon'] }[] = [
  {
    title: 'Evidence before opinion',
    description:
      'Every recommendation traces back to nutrition science and your own data — not trends, not detoxes, not fear.',
    icon: 'shield-check',
  },
  {
    title: 'Your kitchen, your plan',
    description:
      'Roti, rice, dal and sabzi stay on the menu. We adjust portions and structure instead of replacing your food culture.',
    icon: 'utensils',
  },
  {
    title: 'Habits that outlive the program',
    description:
      'The goal is that you can run your own nutrition and training after coaching ends. That is the homework.',
    icon: 'notebook-pen',
  },
];

export const resources: readonly Resource[] = [
  {
    slug: 'indian-protein-guide',
    title: 'The Indian Protein Guide',
    type: 'Guide',
    readTime: '9 min read',
    summary:
      'How to hit 1.6 g/kg protein using dal, paneer, curd, eggs and soya — with gram-level portions for each.',
    icon: 'utensils',
  },
  {
    slug: 'fat-loss-starter-checklist',
    title: 'Fat Loss Starter Checklist',
    type: 'Checklist',
    readTime: '4 min read',
    summary: 'The seven things to fix in week one before you touch a calorie tracker or buy a supplement.',
    icon: 'clipboard-list',
  },
  {
    slug: 'home-workout-library',
    title: 'Home Workout Library',
    type: 'Video',
    readTime: '12 videos',
    summary: 'Full-body progressions using bodyweight and one resistance band, filmed from two angles.',
    icon: 'play-circle',
  },
  {
    slug: 'pcos-plate-framework',
    title: 'PCOS Plate Framework',
    type: 'Guide',
    readTime: '7 min read',
    summary: 'A plate-building method for insulin sensitivity, plus which symptoms to log every cycle.',
    icon: 'heart-pulse',
  },
  {
    slug: 'maintenance-calorie-calculator',
    title: 'Maintenance Calorie Calculator',
    type: 'Calculator',
    readTime: '2 min',
    summary: 'Estimate your maintenance intake, then see the deficit range that keeps performance intact.',
    icon: 'line-chart',
  },
  {
    slug: 'sleep-reset-protocol',
    title: 'Sleep Reset Protocol',
    type: 'Checklist',
    readTime: '5 min read',
    summary: 'A two-week routine to move bedtime earlier without melatonin, built for late-shift schedules.',
    icon: 'moon',
  },
];

export const transformations: readonly Transformation[] = [
  {
    slug: 'anaya-fat-loss',
    clientAlias: 'Anaya R.',
    ageBracket: '31 years',
    focus: 'Sustainable fat loss',
    durationLabel: '24 weeks',
    headlineMetric: '-11.4 kg',
    secondaryMetrics: ['Waist -9 cm', 'Energy 4/10 → 8/10', 'Zero food restrictions'],
    story:
      'Anaya had cycled through three crash diets in two years. We kept her family meals intact, added a protein anchor to every plate and built a 6,000-step floor before touching training volume.',
  },
  {
    slug: 'karthik-recomp',
    clientAlias: 'Karthik S.',
    ageBracket: '27 years',
    focus: 'Muscle building',
    durationLabel: '16 weeks',
    headlineMetric: '+5.2 kg lean',
    secondaryMetrics: ['Bench 45 → 72.5 kg', 'Body fat -3.1%', 'Trained at home for 6 weeks'],
    story:
      'A relocation removed Karthik\u2019s gym access mid-block. We swapped to a band-and-bodyweight variant, held protein at 165 g and returned to barbells without losing a single strength marker.',
  },
  {
    slug: 'meera-pcos',
    clientAlias: 'Meera P.',
    ageBracket: '29 years',
    focus: 'PCOS management',
    durationLabel: '28 weeks',
    headlineMetric: 'Cycle regularity restored',
    secondaryMetrics: ['-7.8 kg', 'HbA1c 6.1 → 5.4', 'Cravings score halved'],
    story:
      'Working alongside Meera\u2019s gynaecologist, we prioritised insulin sensitivity: carb timing around training, 8,000 steps daily and strength twice a week. Cycles normalised by month five.',
  },
  {
    slug: 'rohit-diabetes',
    clientAlias: 'Rohit M.',
    ageBracket: '44 years',
    focus: 'Type 2 diabetes',
    durationLabel: '32 weeks',
    headlineMetric: 'HbA1c 8.2 → 6.3',
    secondaryMetrics: ['-9.6 kg', 'Post-meal walks 7 days/week', 'Medication reviewed by physician'],
    story:
      'Rohit travelled four days a week. We built an airport-and-hotel playbook, anchored every meal with protein and fibre, and added a 12-minute post-meal walk. All medication changes were made by his doctor.',
  },
];

export const homeFaqs: readonly FaqItem[] = [
  {
    question: 'Do I need a gym to work with you?',
    answer:
      'No. Every program ships with a home variant that uses bodyweight and a single resistance band. If you do have gym access, you get the barbell version of the same progression.',
  },
  {
    question: 'How do weekly check-ins actually work?',
    answer:
      'You submit a short form with weight trend, steps, training logs, sleep and energy. Within 24 hours you receive a written review with exactly what changes for the coming week.',
  },
  {
    question: 'Is coaching safe with PCOS or diabetes?',
    answer:
      'The Clinical Care Track is built for it. Coaching is nutrition and training support that runs alongside your treating doctor — we never alter, pause or prescribe medication.',
  },
  {
    question: 'What results can I realistically expect?',
    answer:
      'Most clients see 0.4–0.7% of bodyweight lost per week during a fat-loss block, and measurable strength gains within four weeks. Results vary with adherence, sleep, medical history and stress.',
  },
];

export const programFaqs: readonly FaqItem[] = [
  {
    question: 'Can I switch programs mid-way?',
    answer:
      'Yes. If your goal changes, the remaining weeks are transferred to the new track at no extra cost for the overlapping period.',
  },
  {
    question: 'Do you provide a fixed diet chart?',
    answer:
      'No fixed charts. You get a calorie and protein target, a plate-building framework and portion guides for the food already cooked in your home.',
  },
  {
    question: 'What if I travel frequently?',
    answer:
      'Every program includes travel protocols — hotel and airport meal choices, minimum effective training doses and a step floor for travel weeks.',
  },
  {
    question: 'Is there any supplement selling involved?',
    answer:
      'None. HOMEWORK does not sell or earn commission on supplements. If a supplement is genuinely useful, you are told which generic one to buy.',
  },
];

export const consultationSteps: readonly ProcessStep[] = [
  {
    step: 1,
    title: 'You submit the form',
    description: 'It takes under a minute. Nothing is shared with third parties and there is no sales sequence.',
  },
  {
    step: 2,
    title: 'Coach Samrat reviews it',
    description: 'Your goal, medical context and schedule are read personally before any call is scheduled.',
  },
  {
    step: 3,
    title: 'A 20-minute call, within 48 hours',
    description:
      'An honest assessment of what will work for you — including when coaching is not the right fit yet.',
  },
];

export const goalOptions = [
  { value: 'FAT_LOSS', label: 'Sustainable fat loss' },
  { value: 'MUSCLE_GAIN', label: 'Muscle building & strength' },
  { value: 'PCOS_MANAGEMENT', label: 'PCOS management' },
  { value: 'DIABETES_MANAGEMENT', label: 'Diabetes / prediabetes' },
  { value: 'LIFESTYLE_COACHING', label: 'General lifestyle coaching' },
] as const;
