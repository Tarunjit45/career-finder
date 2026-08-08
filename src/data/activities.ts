import { MicroSimulation } from '@/types';

export const MICRO_SIMULATIONS: Record<string, MicroSimulation> = {
  'ui-ux-designer': {
    scenario: 'Imagine you are designing a food-delivery app used by hungry people.',
    question: 'Which screen would you improve first to help users get their food faster?',
    options: [
      {
        id: 'search',
        label: 'Search & Filters',
        rationale: 'Helping users instantly find specific cuisines or dietary needs.',
      },
      {
        id: 'restaurant_page',
        label: 'Restaurant Menu Layout',
        rationale: 'Making menu items, photos, and prices crystal clear.',
      },
      {
        id: 'checkout',
        label: 'Checkout & Payment',
        rationale: 'Removing surprise fees and making one-tap ordering frictionless.',
      },
      {
        id: 'order_tracking',
        label: 'Live Order Tracker',
        rationale: 'Giving peace of mind with real-time driver GPS animations.',
      },
    ],
    explanation:
      'Interesting! You just made a core UX prioritization decision by evaluating user friction points.',
  },
  'ai-engineer': {
    scenario: 'Imagine you are building a smart book recommendation assistant.',
    question: 'What signal should your AI model prioritize to give the best recommendation?',
    options: [
      {
        id: 'genre_history',
        label: 'Reading History & Genres',
        rationale: 'Content-based filtering using past proven preferences.',
      },
      {
        id: 'friend_likes',
        label: 'Books Friends Liked',
        rationale: 'Collaborative social filtering using peer taste graphs.',
      },
      {
        id: 'recent_search',
        label: 'Topics Searched This Week',
        rationale: 'Real-time contextual intent and current curiosities.',
      },
      {
        id: 'global_rating',
        label: 'Highest Rated Bestsellers',
        rationale: 'High-confidence baseline recommendations for anyone.',
      },
    ],
    explanation:
      'Fascinating! You just formulated a feature weighting heuristic for a machine learning model.',
  },
  'data-analyst': {
    scenario: 'An online store noticed an unexpected 30% drop in sales this Tuesday.',
    question: 'Where would you look first to find the root cause?',
    options: [
      {
        id: 'payment_logs',
        label: 'Payment Gateway Error Logs',
        rationale: 'Testing whether credit cards or digital wallets are failing technically.',
      },
      {
        id: 'traffic_sources',
        label: 'Marketing Traffic Sources',
        rationale: 'Checking if recent ads sent visitors who were not ready to buy.',
      },
      {
        id: 'mobile_vs_desktop',
        label: 'Device Breakdown (Mobile vs Desktop)',
        rationale: 'Investigating if a recent website update broke the mobile checkout button.',
      },
      {
        id: 'pricing_discount',
        label: 'Coupon & Pricing Changes',
        rationale: 'Checking if an active promotional discount code expired unexpectedly.',
      },
    ],
    explanation:
      'Spot on! You just applied root-cause hypothesis prioritization to solve a high-stakes business problem.',
  },
  'product-manager': {
    scenario: 'Your engineering team has 2 weeks before launch and can only build one more feature.',
    question: 'Which one do you choose to ship?',
    options: [
      {
        id: 'one_click_login',
        label: 'One-Click Social Sign-In',
        rationale: 'Cuts down registration drop-off by 40%.',
      },
      {
        id: 'dark_mode',
        label: 'Dark Mode Theme',
        rationale: 'Most requested feature on Twitter by vocal early adopters.',
      },
      {
        id: 'pdf_export',
        label: 'PDF Export for Reports',
        rationale: 'Needed by paying business customers.',
      },
      {
        id: 'live_chat',
        label: 'In-App Live Chat Help',
        rationale: 'Helps resolve early customer confusion immediately.',
      },
    ],
    explanation:
      'You just balanced user value, engineering constraints, and business ROI — the daily core of product management.',
  },
  'cybersecurity-specialist': {
    scenario: 'An employee received a suspicious email asking to urgently verify their cloud login.',
    question: 'What company-wide defense would you prioritize to prevent breaches?',
    options: [
      {
        id: 'mfa',
        label: 'Hardware Multi-Factor Authentication',
        rationale: 'Stops 99% of password-theft attacks even if credentials leak.',
      },
      {
        id: 'email_filtering',
        label: 'AI-Powered Email Domain Filter',
        rationale: 'Quarantines phishing links before they ever reach inboxes.',
      },
      {
        id: 'employee_training',
        label: 'Interactive Phishing Drills',
        rationale: 'Teaches staff how to spot fake URLs and pressure tactics.',
      },
      {
        id: 'zero_trust_vpn',
        label: 'Restricted Network Access',
        rationale: 'Limits database access only to verified secure company laptops.',
      },
    ],
    explanation:
      'Excellent! You just evaluated defense-in-depth security layers to protect critical infrastructure.',
  },
  'full-stack-developer': {
    scenario: 'A website takes 8 seconds to load on mobile phones during morning peak hours.',
    question: 'What would you optimize first to make it snappy?',
    options: [
      {
        id: 'compress_images',
        label: 'Compress & Resize Images',
        rationale: 'Large 5MB banners usually account for 70% of page weight.',
      },
      {
        id: 'cache_database',
        label: 'Add Database Caching',
        rationale: 'Stops repetitive queries from overloading the backend servers.',
      },
      {
        id: 'cdn_servers',
        label: 'Serve Assets via Global CDN',
        rationale: 'Delivers files from servers physically closest to the user.',
      },
      {
        id: 'defer_scripts',
        label: 'Defer Non-Essential Javascript',
        rationale: 'Lets the text and layout display before loading analytics scripts.',
      },
    ],
    explanation:
      'Great engineering intuition! You just analyzed performance bottlenecks across frontend and network layers.',
  },
};

export function getSimulationForCareer(careerId: string): MicroSimulation {
  if (MICRO_SIMULATIONS[careerId]) {
    return MICRO_SIMULATIONS[careerId];
  }

  // General default simulation
  return {
    scenario: 'Imagine your team is working on a major new project with an upcoming deadline.',
    question: 'What area of the problem would you instinctively want to take ownership of?',
    options: [
      {
        id: 'creative',
        label: 'Shaping the vision, design & user experience',
        rationale: 'Focusing on aesthetics, storytelling, and how people feel.',
      },
      {
        id: 'technical',
        label: 'Building the core mechanics & technical logic',
        rationale: 'Writing code, solving architecture, and making things work reliably.',
      },
      {
        id: 'analytical',
        label: 'Measuring data, testing scenarios & metrics',
        rationale: 'Finding trends, measuring success, and eliminating blind spots.',
      },
      {
        id: 'strategy',
        label: 'Coordinating people, timelines & execution',
        rationale: 'Ensuring all parts connect smoothly and deliver maximum value.',
      },
    ],
    explanation:
      'Interesting! Your instinct here highlights your natural problem-solving preference.',
  };
}
