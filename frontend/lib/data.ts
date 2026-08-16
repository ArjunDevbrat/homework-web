import type {
  ClientJourneyStep,
  CoachProfile,
  ConditionTreated,
  FAQItem,
  FreeResource,
  HeroMetrics,
  NavItem,
  ProgramPackage,
  SelectOption,
  SiteConfig,
  TestimonialItem,
  WorkflowStep,
} from '@/types';
import { FALLBACK_PORTRAIT_IMAGE, FALLBACK_TESTIMONIAL_IMAGE } from '@/lib/placeholders';

/* ------------------------------------------------------------------ */
/* Site configuration                                                  */
/* ------------------------------------------------------------------ */

export const siteConfig: SiteConfig = {
  name: 'HOMEWORK',
  legalName: 'HOMEWORK Coaching',
  coachName: 'Coach Samrat Aryan',
  tagline: 'Transform Your Health with Evidence-Based Nutrition & Fitness Coaching',
  description:
    'HOMEWORK is the evidence-based coaching practice of Coach Samrat Aryan — sustainable fat loss, muscle building, PCOS, thyroid and diabetes management, and lifestyle coaching you can run from home, without crash diets or gym dependency.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'contact@homework.fit',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
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
  { label: 'About Coach', href: '/about-coach', description: 'Credentials, story and coaching philosophy' },
  { label: 'Programs', href: '/programs', description: 'Holistic Health, Diet Plans and Exercise Only' },
  { label: 'Free Resources', href: '/free-resources', description: '8 free nutrition and training guides' },
  {
    label: 'Transformations',
    href: '/transformations',
    description: 'Client case studies with real metrics',
  },
  { label: 'Contact', href: '/contact', description: 'Book a free consultation call' },
];

export const legalNav: readonly NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy', description: 'How your data is handled' },
  { label: 'Terms', href: '/terms', description: 'Terms of service' },
  { label: 'Refund Policy', href: '/refund-policy', description: 'Cancellations and refunds' },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const heroContent: HeroMetrics = {
  headline: 'Transform your health with evidence-based nutrition & fitness coaching',
  subheadline:
    'Fat loss, muscle building and clinical support for diabetes, PCOS and thyroid — coached from home, around the food your family already cooks. No crash diets. No gym dependency.',
  primaryCtaLabel: 'Book Free Consultation',
  secondaryCtaLabel: 'Explore Programs',
  metrics: [
    {
      id: 'clients-counselled',
      value: '1500+',
      label: 'Clients counselled',
      detail: 'Across fat loss, muscle building and clinical lifestyle conditions.',
      icon: 'users',
    },
    {
      id: 'certified-coach',
      value: 'Certified',
      label: 'Coach & dietitian',
      detail: 'B.Sc Nutrition & Dietetics, strength and yoga certified.',
      icon: 'award',
    },
    {
      id: 'science-based',
      value: 'Science-based',
      label: 'Approach',
      detail: 'Every plan traced to nutrition research and your own weekly data.',
      icon: 'flask-conical',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Coach profile                                                       */
/* ------------------------------------------------------------------ */

export const coachProfile: CoachProfile = {
  name: 'Samrat Aryan',
  role: 'Nutritionist, Dietitian & Strength Coach',
  tagline:
    'From a skinny kid who could not gain a kilo, to coaching 1500+ people from their living rooms.',
  shortStory:
    'I overcame a thin physique the slow, evidence-based way — then built HOMEWORK so busy professionals can transform from home instead of depending on a gym.',
  story: [
    'I did not start as a coach. I started as the thin kid at the back of the room who could not gain a kilogram no matter how much he ate, and who tried every internet shortcut before realising none of them were built on evidence.',
    'Changing that took formal study — a B.Sc in Nutrition & Dietetics, then certification in strength and hypertrophy coaching, then yoga — and years of applying it to my own body before I ever applied it to anyone else’s.',
    'What I learned is that the plan is rarely the problem. The problem is that most plans assume an empty calendar, a stocked gym and a cook who only makes chicken and broccoli. Real life has night shifts, family meals, festivals and travel.',
    'So HOMEWORK is built backwards from your life: your kitchen, your schedule, your medical reports. Over 1500 people have now been counselled this way — most of them training from a corner of their living room with a pair of dumbbells and a band.',
  ],
  qualifications: [
    {
      abbreviation: 'B.Sc',
      title: 'B.Sc Nutrition & Dietetics',
      issuer: 'University degree',
      detail: 'Three years of clinical nutrition, biochemistry, physiology and dietetics training.',
    },
    {
      abbreviation: 'HSF',
      title: 'Certification in Strength & Hypertrophy',
      issuer: 'HSF',
      detail: 'Evidence-based programming for strength, muscle gain and injury-aware progression.',
    },
    {
      abbreviation: 'Yoga',
      title: 'Certification in Yoga',
      issuer: 'Yoga and Happiness',
      detail: 'Mobility, breathwork and stress regulation programmed alongside training blocks.',
    },
  ],
  principles: [
    {
      title: 'Evidence before opinion',
      description:
        'Every recommendation traces back to nutrition science and your own weekly data — not trends, not detoxes, not fear.',
      icon: 'flask-conical',
    },
    {
      title: 'Your kitchen, your plan',
      description:
        'Roti, rice, dal and sabzi stay on the menu. We adjust portions and structure instead of replacing your food culture.',
      icon: 'utensils',
    },
    {
      title: 'Home first, gym optional',
      description:
        'Daily live classes are designed for a living-room floor, a pair of dumbbells and a resistance band.',
      icon: 'video',
    },
    {
      title: 'Habits that outlive the program',
      description:
        'The goal is that you can run your own nutrition and training after coaching ends. That is the homework.',
      icon: 'notebook-pen',
    },
  ],
  portraitUrl: FALLBACK_PORTRAIT_IMAGE,
  portraitAlt: 'Coach Samrat Aryan, nutritionist and strength coach',
  introVideoUrl: null,
};

/* ------------------------------------------------------------------ */
/* 16 conditions treated                                               */
/* ------------------------------------------------------------------ */

export const conditionsTreated: readonly ConditionTreated[] = [
  {
    slug: 'fat-loss',
    name: 'Fat loss',
    category: 'Body composition',
    summary: 'A calorie strategy built on your regular home-cooked meals, so the fat you lose stays lost.',
    icon: 'flame',
    featured: true,
  },
  {
    slug: 'muscle-building',
    name: 'Muscle building',
    category: 'Body composition',
    summary:
      'Progressive strength work for dumbbells, bands or a gym, with protein targets that fit Indian diets.',
    icon: 'dumbbell',
    featured: true,
  },
  {
    slug: 'obesity',
    name: 'Obesity',
    category: 'Body composition',
    summary: 'Joint-friendly movement and a gradual deficit designed for long-term, sustainable reduction.',
    icon: 'scale',
    featured: false,
  },
  {
    slug: 'diabetes',
    name: 'Diabetes',
    category: 'Metabolic',
    summary:
      'Blood-sugar aware plate building, carb timing and post-meal walks, coordinated with your physician.',
    icon: 'droplet',
    featured: true,
  },
  {
    slug: 'prediabetes',
    name: 'Prediabetes',
    category: 'Metabolic',
    summary: 'Reverse the trend early with fibre-forward meals, strength training and a daily step floor.',
    icon: 'activity',
    featured: false,
  },
  {
    slug: 'pcos-pmos',
    name: 'PCOS / PMOS',
    category: 'Hormonal',
    summary:
      'Cycle-aware nutrition and insulin-sensitivity focused training, with symptom tracking every month.',
    icon: 'heart-pulse',
    featured: true,
  },
  {
    slug: 'thyroid',
    name: 'Thyroid',
    category: 'Hormonal',
    summary: 'Realistic energy and recovery management around hypo- or hyperthyroid medication and fatigue.',
    icon: 'shield-plus',
    featured: false,
  },
  {
    slug: 'fatty-liver',
    name: 'Fatty liver',
    category: 'Metabolic',
    summary: 'Reduce liver fat through calorie control, added-sugar reduction and consistent aerobic work.',
    icon: 'leaf',
    featured: false,
  },
  {
    slug: 'high-cholesterol',
    name: 'High cholesterol',
    category: 'Cardiovascular',
    summary:
      'Fibre, fat-quality and activity changes that move lipid panels without eliminating whole food groups.',
    icon: 'heart',
    featured: false,
  },
  {
    slug: 'hypertension',
    name: 'Hypertension',
    category: 'Cardiovascular',
    summary: 'Sodium awareness, potassium-rich meals, breathwork and steady cardio built into your week.',
    icon: 'stethoscope',
    featured: false,
  },
  {
    slug: 'weight-gain',
    name: 'Weight gain',
    category: 'Body composition',
    summary: 'Calorie-dense but digestible meal structures for people who genuinely struggle to eat enough.',
    icon: 'trending-up',
    featured: false,
  },
  {
    slug: 'lifestyle-modification',
    name: 'Lifestyle modification',
    category: 'Lifestyle',
    summary: 'Sleep, steps, screen time and stress protocols installed two habits at a time.',
    icon: 'sun',
    featured: false,
  },
  {
    slug: 'healthy-aging',
    name: 'Healthy aging',
    category: 'Lifestyle',
    summary: 'Protein, resistance training and mobility work that protect independence in later decades.',
    icon: 'sparkles',
    featured: false,
  },
  {
    slug: 'cardiovascular-disease',
    name: 'Cardiovascular disease',
    category: 'Cardiovascular',
    summary: 'Conservative, physician-coordinated exercise progression with strict intensity guardrails.',
    icon: 'heart-pulse',
    featured: false,
  },
  {
    slug: 'age-related-muscle-loss',
    name: 'Age-related muscle loss',
    category: 'Body composition',
    summary: 'Sarcopenia-focused strength and protein programming to rebuild lost lean mass safely.',
    icon: 'shield-check',
    featured: false,
  },
  {
    slug: 'postpartum-exercise',
    name: 'Postpartum exercise',
    category: 'Lifestyle',
    summary: 'Core and pelvic-floor aware return to training, paced around feeding, sleep and clearance.',
    icon: 'baby',
    featured: false,
  },
];

export const featuredConditions: readonly ConditionTreated[] = conditionsTreated.filter(
  (condition) => condition.featured,
);

export const trustPromises: readonly string[] = [
  'No crash diets, ever',
  'No gym dependency required',
  'Food you already eat at home',
  'Daily live classes with the coach',
];

/* ------------------------------------------------------------------ */
/* 3 core programs                                                     */
/* ------------------------------------------------------------------ */

export const programs: readonly ProgramPackage[] = [
  {
    slug: 'holistic-health',
    name: 'Holistic Health Program',
    tagline: 'Daily live exercise classes + weekly custom diet plans',
    summary:
      'The complete HOMEWORK experience. You train live with the coach every morning and receive a fresh, personalised diet plan every week, adjusted from your check-in data.',
    cadence: 'Daily live classes · weekly diet revision',
    priceLabel: 'Most complete — pricing shared on your consultation call',
    bestFor: 'Anyone who wants training, nutrition and accountability handled together',
    deliverables: [
      'Daily live online exercise classes with Coach Samrat',
      'Weekly custom diet plan rebuilt from your progress data',
      'Condition-specific structure for PCOS, thyroid or diabetes',
      'Weekly written progress review and habit targets',
      'WhatsApp support on weekdays',
      'Meditation and mobility sessions built into the week',
    ],
    freeTrialDays: null,
    featured: true,
    icon: 'sparkles',
  },
  {
    slug: 'diet-plans',
    name: 'Diet Plans Program',
    tagline: 'Weekly personalised diet plans',
    summary:
      'For people whose training is already sorted but whose nutrition keeps derailing. A new plan every week, built from your kitchen, your budget and your reports.',
    cadence: 'New personalised plan every week',
    priceLabel: 'Nutrition-only — pricing shared on your consultation call',
    bestFor: 'Self-directed trainees who need nutrition structure, not workouts',
    deliverables: [
      'Weekly personalised diet plan with gram-level portions',
      'Vegetarian, eggetarian and non-vegetarian variants',
      'Condition-aware adjustments for PCOS, thyroid, diabetes and fatty liver',
      'Eating-out, travel and festival swap lists',
      'Weekly check-in review of weight, energy and adherence',
    ],
    freeTrialDays: null,
    featured: false,
    icon: 'salad',
  },
  {
    slug: 'exercise-only',
    name: 'Exercise Only Program',
    tagline: 'Daily online exercise classes + 3-day free trial',
    summary:
      'Join the daily live class and train with a real coach watching your form. Start with a three-day free trial before you decide anything.',
    cadence: 'Daily live online classes',
    priceLabel: 'Training-only — starts with a 3-day free trial',
    bestFor: 'People who eat reasonably well but cannot stay consistent with training',
    deliverables: [
      'Daily live online exercise classes',
      '3-day free trial before you commit',
      'Live form correction during every session',
      'Home-friendly progressions using dumbbells and bands',
      'Weekly mobility and meditation sessions',
    ],
    freeTrialDays: 3,
    featured: false,
    icon: 'dumbbell',
  },
];

export const programInclusions: readonly string[] = [
  'A nutrition target built from your existing kitchen, not a fixed diet chart',
  'Training you can complete at home with dumbbells and a resistance band',
  'Weekly written check-in reviews with clear next actions',
  'Sleep, steps and stress protocols alongside food and training',
  'Travel, festival and eating-out playbooks',
  'Direct access to Coach Samrat on weekdays',
];

/* ------------------------------------------------------------------ */
/* Workflow (how coaching runs)                                        */
/* ------------------------------------------------------------------ */

export const workflowSteps: readonly WorkflowStep[] = [
  {
    step: 1,
    title: 'Free consultation',
    description:
      'A 20-minute call covering your history, medical reports, schedule and what has failed for you before.',
    icon: 'message-circle',
  },
  {
    step: 2,
    title: 'Assessment & program fit',
    description:
      'We agree on the right program — Holistic Health, Diet Plans or Exercise Only — and the pace your body can handle.',
    icon: 'clipboard-list',
  },
  {
    step: 3,
    title: 'Your first plan',
    description:
      'You receive a nutrition target, a home training plan and two habits to install. Nothing more, so it sticks.',
    icon: 'notebook-pen',
  },
  {
    step: 4,
    title: 'Daily live classes',
    description:
      'You train with the coach on camera each morning, with live form corrections and scaled variations.',
    icon: 'video',
  },
  {
    step: 5,
    title: 'Weekly review and adjust',
    description:
      'Every week we review your data, energy and adherence, then adjust. Progress is documented, never guessed.',
    icon: 'bar-chart',
  },
];

/* ------------------------------------------------------------------ */
/* A day in the life (7-step client journey)                           */
/* ------------------------------------------------------------------ */

export const clientJourney: readonly ClientJourneyStep[] = [
  {
    step: 1,
    timeLabel: '6:15 AM',
    title: 'Morning workout',
    description:
      'You roll out the mat at home and warm up before the live class begins — no commute, no queue for equipment.',
    icon: 'dumbbell',
  },
  {
    step: 2,
    timeLabel: '6:25 AM',
    title: 'WhatsApp check',
    description:
      'A quick message confirms sleep, soreness and yesterday’s meals so today’s session can be scaled correctly.',
    icon: 'smartphone',
  },
  {
    step: 3,
    timeLabel: '6:30 AM',
    title: 'Progress review',
    description:
      'Coach Samrat reviews your logged weight, steps and training numbers before the class starts.',
    icon: 'clipboard-list',
  },
  {
    step: 4,
    timeLabel: '6:35 AM',
    title: 'Live class',
    description:
      '45 minutes of guided training on camera, with real-time form correction and easier variations on demand.',
    icon: 'video',
  },
  {
    step: 5,
    timeLabel: '7:20 AM',
    title: 'Meditation & breathwork',
    description: 'A short guided wind-down to drop cortisol before the workday and protect recovery.',
    icon: 'wind',
  },
  {
    step: 6,
    timeLabel: '9:00 PM',
    title: 'Progress chart',
    description:
      'You update the shared chart — weight trend, steps, protein and energy — in under two minutes.',
    icon: 'line-chart',
  },
  {
    step: 7,
    timeLabel: 'Every Sunday',
    title: 'Celebration',
    description:
      'Wins get named out loud in the group: a first full push-up, a lower fasting sugar, a lost inch.',
    icon: 'party-popper',
  },
];

/* ------------------------------------------------------------------ */
/* 10 FAQs                                                             */
/* ------------------------------------------------------------------ */

export const faqs: readonly FAQItem[] = [
  {
    id: 'complete-beginner',
    question: 'I am a complete beginner and have never exercised. Can I still join?',
    answer:
      'Yes — most people who join HOMEWORK have never trained before. Every live class runs three versions of each movement: a beginner version (often seated or supported), a standard version and a harder progression. For your first two weeks you are asked to do only the beginner version, even if you feel capable of more, because the goal in week one is turning up daily, not soreness. Coach Samrat watches you on camera and corrects your form live, so you are never guessing whether you are doing it right.',
    category: 'Getting started',
  },
  {
    id: 'diabetic-safe',
    question: 'I am diabetic. Is this safe for me?',
    answer:
      'It is, with two conditions. First, you stay under the care of your treating doctor — HOMEWORK never starts, stops or changes medication. Second, you agree to check your sugars around training in the first fortnight so we can see how your body responds. Your plan is then built around blood-sugar friendly plate building, carbohydrate timing near training, post-meal walks and steady strength work, which is the combination with the strongest evidence behind it for improving insulin sensitivity. If your doctor adjusts your medication because your numbers improve, that decision remains entirely theirs.',
    category: 'Health conditions',
  },
  {
    id: 'pcos-thyroid',
    question: 'Will this work if I have PCOS or a thyroid condition?',
    answer:
      'Yes, and these are two of the most common reasons people reach out. For PCOS the focus is insulin sensitivity: a protein and fibre anchor at every meal, resistance training two to three times a week, a daily step floor, and stress and sleep work, plus monthly symptom and cycle logging so we can see what is actually shifting. For thyroid conditions the plan respects the reality of fluctuating energy — training volume is programmed conservatively and increased only when recovery data supports it. Medication always remains your doctor’s domain.',
    category: 'Health conditions',
  },
  {
    id: 'home-equipment',
    question: 'What equipment do I need at home?',
    answer:
      'A pair of dumbbells and one resistance band cover the entire programme. If you own adjustable dumbbells, even better — but a single fixed pair works, because progression is driven by tempo, range of motion, rest periods and repetitions long before it is driven by load. A mat, a sturdy chair and a wall are used for supported variations. If you own nothing at all on day one, the first week runs entirely on bodyweight while you buy a band, which costs less than a month of most gym memberships.',
    category: 'Equipment',
  },
  {
    id: 'no-gym',
    question: 'Do I need a gym membership?',
    answer:
      'No. HOMEWORK exists specifically because gym dependency is the reason most people stop. Every session is designed for a living-room floor. If you do have gym access you will receive the barbell and machine version of the same progression, so nothing is wasted — but nobody is ever blocked from progressing because they train at home or travel frequently.',
    category: 'Equipment',
  },
  {
    id: 'vegetarian',
    question: 'I am vegetarian. Can I still hit my protein targets?',
    answer:
      'Comfortably. Vegetarian, eggetarian and non-vegetarian variants are built for every plan. Protein is assembled from dal, rajma, chana, paneer, curd, milk, soya chunks, tofu and, where you allow it, eggs — with gram-level portions listed so you are never estimating. Where a vegetarian day genuinely falls short, a plain unflavoured protein powder is suggested as the cheapest generic option available. HOMEWORK does not sell supplements and earns no commission on any brand.',
    category: 'Nutrition',
  },
  {
    id: 'diet-chart',
    question: 'Will you give me a fixed diet chart?',
    answer:
      'No, and that is deliberate. Fixed charts fail the moment your family cooks something else. Instead you receive a weekly personalised plan: a calorie and protein target, a plate-building framework, portion guides for the food already cooked in your home, and swap lists for eating out, travelling and festivals. The plan is rebuilt every week from your check-in data rather than handed over once and forgotten.',
    category: 'Nutrition',
  },
  {
    id: 'two-week-results',
    question: 'What results can I expect in the first two weeks?',
    answer:
      'Honestly: less on the scale than you hope, and more everywhere else. Expect roughly 0.5 to 1.5 kg of change in the first fortnight, much of it water and gut content rather than fat. What genuinely does shift in two weeks is energy through the afternoon, sleep quality, digestion, post-meal sluggishness and how many repetitions you can complete. Real fat loss shows up as a trend across four to six weeks at about 0.4 to 0.7 percent of bodyweight per week. Anyone promising eight kilos in fourteen days is selling dehydration.',
    category: 'Results',
  },
  {
    id: 'missed-classes',
    question: 'What happens if I miss the live class or travel for work?',
    answer:
      'Nothing breaks. Every program includes a travel protocol — a minimum effective session that needs no equipment, hotel and airport meal choices, and a reduced step floor for travel weeks. If you miss a live class you receive the session plan to run in your own time, and the weekly review accounts for the disruption instead of pretending it did not happen.',
    category: 'Getting started',
  },
  {
    id: 'how-long',
    question: 'How long do I need to stay in coaching?',
    answer:
      'Most people see a meaningful, visible change across three to four months, and clinical markers such as HbA1c or lipid panels typically need three to six months to move properly. But the aim is not to keep you enrolled forever — the aim is that by the time you leave you can set your own targets, adjust your own plan and train without supervision. That is exactly why the practice is called HOMEWORK.',
    category: 'Results',
  },
];

export const homeFaqs: readonly FAQItem[] = faqs.slice(0, 5);
export const programFaqs: readonly FAQItem[] = faqs.slice(5);

/* ------------------------------------------------------------------ */
/* 8 free guides                                                       */
/* ------------------------------------------------------------------ */

export const freeResources: readonly FreeResource[] = [
  {
    slug: 'healthy-plate-concept',
    title: 'The Healthy Plate Concept',
    format: 'Guide',
    pages: '12 pages',
    summary:
      'The single framework behind every HOMEWORK meal plan: how to divide any Indian thali into protein, fibre, carbohydrate and fat without weighing a thing.',
    highlights: ['Plate ratios for 3 goals', 'Thali and lunchbox examples', 'Eating-out version'],
    icon: 'salad',
    fileUrl: null,
  },
  {
    slug: 'fat-loss-guide',
    title: 'Fat Loss Guide',
    format: 'Guide',
    pages: '18 pages',
    summary:
      'How to build a deficit you can actually hold for twelve weeks, plus exactly what to change first when the scale stops moving.',
    highlights: ['Deficit calculator walk-through', 'Plateau checklist', 'Weekend damage control'],
    icon: 'flame',
    fileUrl: null,
  },
  {
    slug: 'muscle-building-guide',
    title: 'Muscle Building Guide',
    format: 'Guide',
    pages: '16 pages',
    summary:
      'Progressive overload for home training — how to keep getting stronger with one pair of dumbbells and a band.',
    highlights: ['Progression ladder', 'Weekly volume targets', 'Home-to-gym conversions'],
    icon: 'dumbbell',
    fileUrl: null,
  },
  {
    slug: 'pcos-diet-guide',
    title: 'PCOS Diet Guide',
    format: 'Guide',
    pages: '14 pages',
    summary:
      'A plate-building method for insulin sensitivity, which symptoms to log each cycle, and the training pattern that supports both.',
    highlights: ['Insulin-aware meal structure', 'Cycle symptom tracker', 'Training load by phase'],
    icon: 'heart-pulse',
    fileUrl: null,
  },
  {
    slug: 'pregnancy-lactation-nutrition',
    title: 'Pregnancy & Lactation Nutrition',
    format: 'Guide',
    pages: '15 pages',
    summary:
      'Trimester-wise nutrient priorities, safe activity guidance and practical feeding-window meals — to be read alongside your obstetrician’s advice.',
    highlights: ['Trimester nutrient map', 'Lactation calorie needs', 'Safe movement guidance'],
    icon: 'baby',
    fileUrl: null,
  },
  {
    slug: 'gym-goers-nutrition',
    title: 'Nutrition for Gym Goers',
    format: 'Guide',
    pages: '13 pages',
    summary:
      'Pre- and post-workout eating that actually matters, and the four supplements with real evidence behind them.',
    highlights: ['Peri-workout timing', 'Evidence-backed supplements', 'Recomposition targets'],
    icon: 'utensils',
    fileUrl: null,
  },
  {
    slug: 'diabetes-diet-guide',
    title: 'Diabetes Diet Guide',
    format: 'Guide',
    pages: '17 pages',
    summary:
      'Carbohydrate timing, fibre sequencing and post-meal walking protocols for better fasting and post-prandial numbers.',
    highlights: ['Carb timing rules', 'Post-meal walk protocol', 'Sugar logging sheet'],
    icon: 'droplet',
    fileUrl: null,
  },
  {
    slug: 'high-protein-foods',
    title: 'High Protein Foods List',
    format: 'Checklist',
    pages: '6 pages',
    summary:
      'Gram-level protein content for 60+ Indian foods — vegetarian, eggetarian and non-vegetarian — with cost per 10 g of protein.',
    highlights: ['60+ foods ranked', 'Cost per 10 g protein', 'Vegetarian-only section'],
    icon: 'egg',
    fileUrl: null,
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials / transformations                                      */
/* ------------------------------------------------------------------ */

export const testimonials: readonly TestimonialItem[] = [
  {
    slug: 'anaya-fat-loss',
    clientAlias: 'Anaya R.',
    ageBracket: '31 years',
    profession: 'IT project manager',
    condition: 'Fat loss',
    durationLabel: '24 weeks',
    headlineResult: '-11.4 kg',
    metrics: ['Waist -9 cm', 'Energy 4/10 → 8/10', 'Zero food restrictions'],
    quote: 'Nobody at home had to cook separately for me. That is the only reason it lasted.',
    story:
      'Anaya had cycled through three crash diets in two years. We kept her family meals intact, added a protein anchor to every plate and built a 6,000-step floor before touching training volume.',
    imageUrl: FALLBACK_TESTIMONIAL_IMAGE,
  },
  {
    slug: 'karthik-recomp',
    clientAlias: 'Karthik S.',
    ageBracket: '27 years',
    profession: 'Product designer',
    condition: 'Muscle building',
    durationLabel: '16 weeks',
    headlineResult: '+5.2 kg lean',
    metrics: ['Bench 45 → 72.5 kg', 'Body fat -3.1%', 'Trained at home for 6 weeks'],
    quote: 'I lost gym access for six weeks and still added strength. That convinced me.',
    story:
      'A relocation removed Karthik’s gym access mid-block. We swapped to a dumbbell-and-band variant, held protein at 165 g and returned to barbells without losing a single strength marker.',
    imageUrl: null,
  },
  {
    slug: 'meera-pcos',
    clientAlias: 'Meera P.',
    ageBracket: '29 years',
    profession: 'School teacher',
    condition: 'PCOS',
    durationLabel: '28 weeks',
    headlineResult: 'Cycle regularity restored',
    metrics: ['-7.8 kg', 'HbA1c 6.1 → 5.4', 'Cravings score halved'],
    quote: 'For the first time in years my cycle was predictable, and no one put me on a fad diet.',
    story:
      'Working alongside Meera’s gynaecologist, we prioritised insulin sensitivity: carb timing around training, 8,000 steps daily and strength twice a week. Cycles normalised by month five.',
    imageUrl: null,
  },
  {
    slug: 'rohit-diabetes',
    clientAlias: 'Rohit M.',
    ageBracket: '44 years',
    profession: 'Regional sales head',
    condition: 'Type 2 diabetes',
    durationLabel: '32 weeks',
    headlineResult: 'HbA1c 8.2 → 6.3',
    metrics: ['-9.6 kg', 'Post-meal walks 7 days/week', 'Medication reviewed by physician'],
    quote: 'I travel four days a week. The plan assumed that instead of ignoring it.',
    story:
      'Rohit travelled constantly, so we built an airport-and-hotel playbook, anchored every meal with protein and fibre, and added a 12-minute post-meal walk. All medication changes were made by his doctor.',
    imageUrl: null,
  },
];

/* ------------------------------------------------------------------ */
/* Form select options                                                 */
/* ------------------------------------------------------------------ */

export const goalOptions: readonly SelectOption[] = [
  { value: 'FAT_LOSS', label: 'Fat loss' },
  { value: 'MUSCLE_BUILDING', label: 'Muscle building' },
  { value: 'WEIGHT_GAIN', label: 'Weight gain' },
  { value: 'DIABETES_MANAGEMENT', label: 'Diabetes / prediabetes management' },
  { value: 'PCOS_MANAGEMENT', label: 'PCOS / PMOS management' },
  { value: 'THYROID_MANAGEMENT', label: 'Thyroid management' },
  { value: 'LIFESTYLE_MODIFICATION', label: 'Lifestyle modification' },
  { value: 'HEALTHY_AGING', label: 'Healthy aging' },
  { value: 'POSTPARTUM_FITNESS', label: 'Postpartum fitness' },
];

export const genderOptions: readonly SelectOption[] = [
  { value: 'FEMALE', label: 'Female' },
  { value: 'MALE', label: 'Male' },
  { value: 'OTHER', label: 'Other' },
  { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];

export const consultationSteps: readonly WorkflowStep[] = [
  {
    step: 1,
    title: 'You submit the form',
    description:
      'It takes under a minute. Nothing is shared with third parties and there is no sales sequence.',
    icon: 'notebook-pen',
  },
  {
    step: 2,
    title: 'Coach Samrat reviews it',
    description: 'Your goal, health issue and profession are read personally before any call is scheduled.',
    icon: 'clipboard-list',
  },
  {
    step: 3,
    title: 'A 20-minute call, within 48 hours',
    description:
      'An honest assessment of what will work for you — including when coaching is not the right fit yet.',
    icon: 'message-circle',
  },
];
