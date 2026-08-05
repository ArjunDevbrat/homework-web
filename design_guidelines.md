{
  "project": {
    "name": "HOMEWORK (Coach Samrat Aryan)",
    "type": "conversion-first health coaching marketing site + lead capture",
    "brand_attributes": [
      "trustworthy (clinical-adjacent, evidence-based)",
      "calm + optimistic (no crash-diet energy)",
      "premium-clean (Apple spacing + Stripe micro-borders)",
      "human (coach-led, not faceless)",
      "mobile-first (Instagram/YouTube traffic)"
    ],
    "north_star_action": "Book Free Consultation",
    "audience": "Indian adults 22–45 seeking sustainable fat loss/muscle building/PCOS/diabetes support"
  },

  "design_vibe": {
    "style_fusion": [
      "Stripe/Linear: hairline dividers, crisp cards, calm whitespace",
      "Headspace/Levels: friendly-but-clinical tone, rounded geometry, data-led proof blocks",
      "Editorial proof: transformation stories as ‘case studies’ with metrics"
    ],
    "layout_principles": [
      "Z-pattern hero (headline → proof → CTA)",
      "Bento grids for specialties/programs/resources",
      "Magazine-style case study cards for transformations",
      "Sticky header + persistent CTA"
    ],
    "background_policy": {
      "must_be_light": true,
      "no_dark_sections": true,
      "gradient_usage": "Decorative only; max 20% viewport; never behind long text"
    }
  },

  "palette": {
    "hard_constraints_exact_hex": {
      "text_primary": "#1F2D3D",
      "accent_cta": "#22B8CF",
      "background": "#F8FCFD",
      "surface": "#FFFFFF",
      "border": "#E6F2F5",
      "hover": "#179DB3"
    },
    "semantic_tokens": {
      "--canvas": "#F8FCFD",
      "--surface": "#FFFFFF",
      "--text": "#1F2D3D",
      "--text-muted": "#5A6B7B",
      "--text-soft": "#8496A6",
      "--hairline": "#E6F2F5",
      "--accent": "#22B8CF",
      "--accent-hover": "#179DB3",
      "--accent-soft": "#E6F9FC",
      "--ring": "rgba(34, 184, 207, 0.35)",

      "--success": "#1F9D7A",
      "--success-soft": "#E7F7F2",
      "--warning": "#B7791F",
      "--warning-soft": "#FFF6E6",
      "--danger": "#C2413A",
      "--danger-soft": "#FDECEC"
    },
    "contrast_rules": {
      "cyan_text_on_white": {
        "rule": "Avoid #22B8CF for body/small text on white (fails WCAG AA).",
        "allowed": [
          "icons (filled glyphs)",
          "badges with cyan background + slate text",
          "large display numerals (>= 24px) if contrast is acceptable in context",
          "focus rings/outlines",
          "button backgrounds"
        ],
        "use_instead": {
          "links": "text-slateink underline decoration-hairline hover:decoration-accent",
          "small labels": "text-slateink or text-slateink-muted",
          "active nav": "text-slateink + underline indicator in accent"
        }
      }
    },
    "allowed_gradients_decorative_only": [
      {
        "name": "ice-wash",
        "css": "radial-gradient(900px circle at 10% 10%, rgba(34,184,207,0.12), transparent 55%), radial-gradient(700px circle at 90% 20%, rgba(34,184,207,0.08), transparent 60%)",
        "usage": "Hero background overlay only (behind short text)."
      }
    ]
  },

  "typography": {
    "font_pairing": {
      "display": {
        "google_font": "Bricolage Grotesque",
        "fallback": "system-ui",
        "why": "friendly, modern, slightly human—pairs well with clinical palette"
      },
      "body": {
        "google_font": "Instrument Sans",
        "fallback": "system-ui",
        "why": "high readability, neutral, professional"
      }
    },
    "css_vars": {
      "--font-display": "'Bricolage Grotesque'",
      "--font-sans": "'Instrument Sans'"
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slateink",
      "h2": "text-base md:text-lg font-medium text-slateink-muted",
      "section_title": "text-2xl sm:text-3xl font-semibold tracking-tight text-slateink",
      "body": "text-sm sm:text-base text-slateink-muted leading-relaxed",
      "small": "text-xs text-slateink-soft"
    },
    "copy_rules": [
      "Prefer short, evidence-led sentences.",
      "Use numbers + timeframes (e.g., ‘-6 kg in 12 weeks’) as proof blocks.",
      "Avoid hype words (‘shred’, ‘detox’)."
    ]
  },

  "spacing_and_grid": {
    "container": {
      "class": "mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8",
      "reading_width": "max-w-prose for long text blocks"
    },
    "section_padding": {
      "default": "py-20 sm:py-24 lg:py-32",
      "dense": "py-14 sm:py-16",
      "cta_band": "py-14 sm:py-16"
    },
    "grid_patterns": {
      "bento_3": "grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3",
      "bento_4": "grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4",
      "split": "grid gap-10 lg:grid-cols-12 lg:items-center",
      "split_left": "lg:col-span-6",
      "split_right": "lg:col-span-6"
    },
    "borders": {
      "micro_border": "border border-hairline",
      "section_divider": "border-t border-hairline"
    }
  },

  "elevation_and_radius": {
    "radius": {
      "card": "rounded-2xl",
      "button": "rounded-xl",
      "pill": "rounded-full"
    },
    "shadows": {
      "card": "shadow-card",
      "hover": "hover:shadow-card-hover",
      "cta": "shadow-cta"
    }
  },

  "components": {
    "component_path": {
      "note": "No shadcn installed. Hand-build primitives in /components/ui as .js (not .tsx). Named exports only.",
      "ui_primitives_to_create": [
        {
          "name": "Button",
          "path": "/app/frontend/components/ui/button.js",
          "variants": [
            {
              "name": "primary",
              "classes": "bg-accent text-slateink font-semibold shadow-cta hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--ring)]",
              "notes": "Cyan is background only; text stays slateink for contrast."
            },
            {
              "name": "secondary",
              "classes": "bg-surface text-slateink border border-hairline hover:bg-surface-muted",
              "notes": "For non-primary actions."
            },
            {
              "name": "ghost",
              "classes": "bg-transparent text-slateink hover:bg-accent-soft",
              "notes": "Use for header nav / subtle actions."
            }
          ],
          "sizes": {
            "sm": "h-9 px-3 text-sm",
            "md": "h-11 px-4 text-sm",
            "lg": "h-12 px-5 text-base"
          },
          "data_testid": "required on all buttons"
        },
        {
          "name": "Container",
          "path": "/app/frontend/components/ui/container.js",
          "classes": "mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8"
        },
        {
          "name": "Card",
          "path": "/app/frontend/components/ui/card.js",
          "anatomy": {
            "Card": "rounded-2xl border border-hairline bg-surface shadow-card",
            "CardHeader": "p-6",
            "CardContent": "px-6 pb-6",
            "CardFooter": "px-6 pb-6"
          }
        },
        {
          "name": "Badge",
          "path": "/app/frontend/components/ui/badge.js",
          "variants": [
            {
              "name": "metric",
              "classes": "inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-slateink border border-hairline"
            },
            {
              "name": "neutral",
              "classes": "inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-medium text-slateink-muted border border-hairline"
            }
          ]
        },
        {
          "name": "SectionHeading",
          "path": "/app/frontend/components/ui/section-heading.js",
          "props": ["eyebrow", "title", "subtitle", "align"],
          "rules": "Eyebrow uses text-xs uppercase tracking-widest text-slateink-soft; never cyan text."
        },
        {
          "name": "Input",
          "path": "/app/frontend/components/ui/input.js",
          "classes": "h-11 w-full rounded-xl border border-hairline bg-surface px-3 text-sm text-slateink placeholder:text-slateink-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--ring)]",
          "data_testid": "required"
        },
        {
          "name": "Textarea",
          "path": "/app/frontend/components/ui/textarea.js",
          "classes": "min-h-[120px] w-full rounded-xl border border-hairline bg-surface px-3 py-2 text-sm text-slateink placeholder:text-slateink-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--ring)]",
          "data_testid": "required"
        },
        {
          "name": "Select",
          "path": "/app/frontend/components/ui/select.js",
          "implementation": "Use Radix Select (recommended) or native select styled identically; ensure keyboard support.",
          "data_testid": "required"
        },
        {
          "name": "Accordion",
          "path": "/app/frontend/components/ui/accordion.js",
          "use_case": "FAQ-lite on Home + Programs page",
          "motion": "Use tailwindcss-animate keyframes already in config"
        },
        {
          "name": "Dialog",
          "path": "/app/frontend/components/ui/dialog.js",
          "use_case": "Mobile menu + optional ‘Book consultation’ quick form",
          "a11y": "Trap focus, close on Esc"
        }
      ],
      "layout_components": [
        {
          "name": "Header",
          "path": "/app/frontend/components/layout/header.js",
          "behavior": [
            "sticky top-0 z-50",
            "background: canvas with 80% opacity + backdrop-blur",
            "bottom hairline border",
            "desktop nav inline; mobile uses Dialog sheet"
          ],
          "cta": "Book Free Consultation (primary button)",
          "data_testid": {
            "logo": "site-header-logo",
            "nav": "site-header-nav",
            "mobile_menu_button": "site-header-mobile-menu-button",
            "cta": "site-header-book-consultation-button"
          }
        },
        {
          "name": "Footer",
          "path": "/app/frontend/components/layout/footer.js",
          "content": [
            "Credentials line",
            "Email + socials",
            "Legal links"
          ],
          "data_testid": {
            "footer": "site-footer",
            "privacy": "site-footer-privacy-link",
            "terms": "site-footer-terms-link",
            "refund": "site-footer-refund-link"
          }
        }
      ]
    }
  },

  "page_composition": {
    "home": {
      "sections_order": [
        {
          "name": "Hero",
          "layout": "split",
          "left": [
            "Badge: Evidence-based coaching",
            "H1: Transform Your Health…",
            "H2: Sustainable fat loss…",
            "Primary CTA + Secondary CTA (View Programs)",
            "Proof row: 3 mini metrics (e.g., ‘1:1 coaching’, ‘Weekly check-ins’, ‘Habit-first’)"
          ],
          "right": [
            "Coach portrait card (image) with micro-border",
            "Credentials chips (B.Sc, HSF, Yoga)"
          ],
          "notes": "Keep hero mostly server-rendered; any motion is optional and isolated."
        },
        {
          "name": "Trust / Credentials Strip",
          "layout": "horizontal scroll on mobile; grid on desktop",
          "content": [
            "Degrees + certifications",
            "Specialties (PCOS/Diabetes)",
            "‘No crash diets’ promise"
          ]
        },
        {
          "name": "Specialties Bento",
          "layout": "bento_4",
          "cards": ["Sustainable Fat Loss", "Muscle Building", "PCOS Support", "Diabetes/Lifestyle"]
        },
        {
          "name": "Programs Preview",
          "layout": "bento_3",
          "cards": "Each card: title, who it’s for, what you get (3 bullets), CTA"
        },
        {
          "name": "Transformations Preview",
          "layout": "masonry-ish 2-col on desktop; 1-col on mobile",
          "cards": "Before/after image + metric badge + short story"
        },
        {
          "name": "Free Resources Preview",
          "layout": "bento_3",
          "cards": "Guides/checklists/videos; each with icon + short description"
        },
        {
          "name": "FAQ-lite",
          "layout": "Accordion",
          "items": [
            "Do I need a gym?",
            "How do check-ins work?",
            "PCOS/diabetes safety?",
            "What results can I expect?"
          ]
        },
        {
          "name": "Final CTA Band",
          "layout": "center-left aligned (not centered text block)",
          "content": [
            "Short reassurance copy",
            "Primary CTA button",
            "Secondary: email link"
          ]
        }
      ]
    },
    "about_coach": {
      "sections": [
        "Hero: portrait + bio summary",
        "Credentials timeline (3 items)",
        "Coaching philosophy (3 principles)",
        "CTA band"
      ]
    },
    "programs": {
      "sections": [
        "Programs grid",
        "What’s included (checklist)",
        "Process steps (1-2-3)",
        "FAQ accordion",
        "CTA band"
      ]
    },
    "free_resources": {
      "sections": [
        "Resource categories tabs (optional)",
        "Cards list",
        "Email capture CTA (optional)"
      ]
    },
    "transformations": {
      "sections": [
        "Case studies grid",
        "Method disclaimer (results vary)",
        "CTA band"
      ]
    },
    "contact": {
      "sections": [
        "Contact hero",
        "Lead form card",
        "What happens next (3 steps)",
        "Social links"
      ]
    },
    "legal_pages": {
      "layout": "prose max-w-prose",
      "notes": "No cyan links; use underline + hairline decoration."
    }
  },

  "motion": {
    "principles": [
      "Motion is supportive, not decorative.",
      "No above-the-fold heavy client JS.",
      "Use Framer Motion only in small client wrappers."
    ],
    "tokens": {
      "duration_fast": 0.16,
      "duration_base": 0.24,
      "duration_slow": 0.42,
      "ease": "[0.22, 1, 0.36, 1]"
    },
    "micro_interactions": [
      {
        "component": "Button",
        "hover": "background shift + subtle shadow increase (no transform on all elements)",
        "press": "scale-95 only on button element",
        "focus": "ring-4 using accent ring"
      },
      {
        "component": "Card",
        "hover": "shadow-card-hover + border color stays hairline",
        "optional": "icon nudges 2px right on hover"
      },
      {
        "component": "Accordion",
        "open": "animate accordion-down (tailwindcss-animate)"
      }
    ],
    "scroll_reveal": {
      "use": "Only for below-the-fold sections",
      "implementation": "IntersectionObserver + CSS animation fade-up OR Framer Motion whileInView in a client wrapper",
      "stagger": "0.06s between items"
    }
  },

  "accessibility": {
    "wcag": "2.1 AA",
    "focus": "Always visible focus-visible ring; never remove outlines without replacement",
    "tap_targets": "min 44px height for primary actions",
    "forms": [
      "Labels always present (no placeholder-only)",
      "Error text uses danger color + role=alert",
      "Helper text uses text-slateink-soft"
    ],
    "images": [
      "Meaningful alt text",
      "Transformations: avoid identifying details; use consented images only"
    ]
  },

  "image_urls": {
    "hero_coach_portrait": [
      {
        "url": "https://images.unsplash.com/photo-1595886509089-b691b210fc5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYWxlJTIwZml0bmVzcyUyMGNvYWNoJTIwcG9ydHJhaXQlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MHx8fHRlYWx8MTc4NTkyNzcyOHww&ixlib=rb-4.1.0&q=85",
        "category": "hero",
        "description": "Coach portrait placeholder (swap with real Coach Samrat photo)."
      }
    ],
    "nutrition_resources": [
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXAlMjBib3dscyUyMG92ZXJoZWFkfGVufDB8fHx8MTc4NTkyNzc0N3ww&ixlib=rb-4.1.0&q=85",
        "category": "resources",
        "description": "Healthy bowl overhead for Free Resources cards/hero."
      },
      {
        "url": "https://images.unsplash.com/photo-1667499745120-f9bcef8f584e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxoZWFsdGh5JTIwbWVhbCUyMHByZXAlMjBib3dscyUyMG92ZXJoZWFkfGVufDB8fHx8MTc4NTkyNzc0N3ww&ixlib=rb-4.1.0&q=85",
        "category": "resources",
        "description": "Meal prep trays for resource thumbnails."
      }
    ],
    "transformations": [
      {
        "url": "https://images.pexels.com/photos/5714504/pexels-photo-5714504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "category": "transformations",
        "description": "Before/after style placeholder (use real client-approved transformations)."
      }
    ]
  },

  "instructions_to_main_agent": {
    "critical": [
      "Use the exact palette tokens already present in /app/frontend/tailwind.config.ts (slateink/accent/surface/canvas/hairline).",
      "Do NOT use cyan (#22B8CF) as small text on white; reserve it for button backgrounds, icons, rings, and soft badges.",
      "All interactive + key informational elements MUST include data-testid (kebab-case).",
      "Server Components by default; isolate Framer Motion into tiny client wrappers to avoid hydration mismatch.",
      "No centered app container; keep left-aligned reading flow.",
      "No universal transition: never transition-all."
    ],
    "recommended_libs": [
      {
        "name": "clsx + tailwind-merge",
        "why": "clean variant composition for UI primitives",
        "install": "npm i clsx tailwind-merge"
      },
      {
        "name": "@radix-ui/react-*",
        "why": "accessible primitives for Dialog/Accordion/Select",
        "install": "npm i @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-select"
      }
    ],
    "global_css": {
      "add": [
        "CSS variables for tokens (canvas/surface/text/accent/ring)",
        "selection color: background accent-soft, text slateink",
        "subtle noise overlay optional via background-image on body (very low opacity)"
      ]
    }
  },

  "appendix_general_ui_ux_design_guidelines": "<General UI UX Design Guidelines>\n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
