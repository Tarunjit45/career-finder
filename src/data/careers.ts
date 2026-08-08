import { ExplorationArea, CareerDirection, Career } from '@/types';

export const EXPLORATION_AREAS: ExplorationArea[] = [
  {
    id: 'tech-building',
    title: 'Technology & Building',
    emoji: '🔧',
    tagline: 'Solving problems, building software, and understanding how technology works.',
    description:
      'If you enjoy logical puzzles, building tools that millions use, and understanding how complex systems function, this domain offers endless paths.',
    primaryDimensions: ['technology', 'analytical', 'practical'],
    directionCount: 4,
    careerCount: 8,
  },
  {
    id: 'creativity-design',
    title: 'Creativity & Design',
    emoji: '🎨',
    tagline: 'Creating ideas, visual experiences, and human-centered solutions.',
    description:
      'If you love making things intuitive, beautiful, and emotionally engaging, design and creative storytelling are your playgrounds.',
    primaryDimensions: ['creativity', 'people'],
    directionCount: 3,
    careerCount: 6,
  },
  {
    id: 'business-strategy',
    title: 'Business & Strategy',
    emoji: '💼',
    tagline: 'Leading ventures, turning ideas into impact, and orchestrating growth.',
    description:
      'If you enjoy seeing the big picture, bringing diverse teams together, and launching products into real markets, business leadership is built for you.',
    primaryDimensions: ['business', 'leadership', 'analytical'],
    directionCount: 3,
    careerCount: 6,
  },
  {
    id: 'science-discovery',
    title: 'Science & Discovery',
    emoji: '🔬',
    tagline: 'Understanding how the world works, finding answers, and pushing frontiers.',
    description:
      'If your curiosity drives you to research deep truths, test hypotheses, and solve foundational mysteries in biology or physics.',
    primaryDimensions: ['scientific', 'analytical'],
    directionCount: 2,
    careerCount: 4,
  },
  {
    id: 'people-society',
    title: 'People & Society',
    emoji: '👥',
    tagline: 'Empowering individuals, mentoring communities, and shaping culture.',
    description:
      'If you are driven by genuine empathy, human psychology, community development, and coaching others to thrive.',
    primaryDimensions: ['people', 'leadership'],
    directionCount: 2,
    careerCount: 4,
  },
  {
    id: 'healthcare-wellbeing',
    title: 'Healthcare & Wellbeing',
    emoji: '🌿',
    tagline: 'Nurturing health, modern care practices, and holistic human vitality.',
    description:
      'If you want to apply science and care directly to human health, nutrition, mental resilience, and modern healthcare tech.',
    primaryDimensions: ['people', 'scientific'],
    directionCount: 2,
    careerCount: 3,
  },
];

export const CAREER_DIRECTIONS: CareerDirection[] = [
  // Tech & Building
  {
    id: 'software-engineering',
    areaId: 'tech-building',
    title: 'Software Engineering',
    emoji: '💻',
    tagline: 'Build web, mobile, and cloud software',
    description: 'Transform concepts into robust, reliable digital applications used globally.',
    careers: ['full-stack-developer', 'mobile-developer'],
  },
  {
    id: 'ai-data',
    areaId: 'tech-building',
    title: 'Artificial Intelligence & Data',
    emoji: '🤖',
    tagline: 'Design smart algorithms and models',
    description: 'Train machine learning models and build intelligent AI-assisted products.',
    careers: ['ai-engineer', 'data-analyst'],
  },
  {
    id: 'cybersecurity',
    areaId: 'tech-building',
    title: 'Cybersecurity & Systems',
    emoji: '🛡️',
    tagline: 'Protect digital infrastructure and data',
    description: 'Safeguard networks, prevent cyber attacks, and ensure cloud system resilience.',
    careers: ['cybersecurity-specialist'],
  },

  // Creativity & Design
  {
    id: 'product-design',
    areaId: 'creativity-design',
    title: 'Product Design & UI/UX',
    emoji: '✨',
    tagline: 'Design frictionless human experiences',
    description: 'Bridge user psychology, interface aesthetics, and product interaction flows.',
    careers: ['ui-ux-designer'],
  },
  {
    id: 'brand-visual',
    areaId: 'creativity-design',
    title: 'Brand & Visual Identity',
    emoji: '🖌️',
    tagline: 'Craft visual storytelling',
    description: 'Shape memorable brand languages, typography, and visual aesthetics.',
    careers: ['brand-designer'],
  },

  // Business & Strategy
  {
    id: 'product-management',
    areaId: 'business-strategy',
    title: 'Product Management',
    emoji: '🧭',
    tagline: 'Guide products from concept to scale',
    description: 'Unite tech, design, and business teams to launch products people love.',
    careers: ['product-manager'],
  },
  {
    id: 'growth-strategy',
    areaId: 'business-strategy',
    title: 'Growth & Business Strategy',
    emoji: '📈',
    tagline: 'Scale products to new markets',
    description: 'Experiment with channels, audience psychology, and strategic positioning.',
    careers: ['growth-strategist'],
  },

  // Science & Discovery
  {
    id: 'biotech',
    areaId: 'science-discovery',
    title: 'Biotechnology & Life Sciences',
    emoji: '🧬',
    tagline: 'Innovate with biological systems',
    description: 'Harness genetic engineering and molecular tools to improve medicine and food.',
    careers: ['biotech-researcher'],
  },

  // People & Society
  {
    id: 'talent-culture',
    areaId: 'people-society',
    title: 'People & Culture',
    emoji: '🤝',
    tagline: 'Nurture high-performing teams',
    description: 'Create healthy workplace cultures, mentoring programs, and talent pathways.',
    careers: ['people-partner'],
  },
];

export const CAREERS: Career[] = [
  // 1. AI Engineer
  {
    id: 'ai-engineer',
    directionId: 'ai-data',
    areaId: 'tech-building',
    title: 'AI Engineer',
    emoji: '🤖',
    tagline: 'Builds AI-powered systems',
    oneLiner: 'Teaches computers to learn from data, reason, and solve problems with AI.',
    whatTheyDo: [
      'Design and deploy machine learning models and LLM applications.',
      'Process, clean, and optimize large-scale training datasets.',
      'Integrate AI capabilities (speech, vision, recommendation) into web and mobile apps.',
      'Fine-tune algorithms to be accurate, ethical, and fast.',
    ],
    youMayEnjoyIf: [
      'You are fascinated by how intelligent systems like ChatGPT work under the hood.',
      'You enjoy finding mathematical patterns and testing hypotheses.',
      'You like combining coding with logic to make tools that think and adapt.',
    ],
    whatYouNeed: ['Python & PyTorch', 'Machine Learning Models', 'Data Pipelines', 'Prompt Engineering', 'API Integration'],
    waysToGetThere: [
      { stage: 'School / Early', description: 'Learn Python basics, logic, and algebra fundamentals.' },
      { stage: 'College / Self-Taught', description: 'Build simple machine learning projects on Kaggle or GitHub.' },
      { stage: 'Career Launch', description: 'Contribute to open-source AI tools and build working AI web applications.' },
    ],
    learningProgression: {
      learn: 'Learn Python programming, linear algebra basics, and fundamentals of machine learning.',
      practice: 'Train classification and regression models on real datasets using scikit-learn & PyTorch.',
      build: 'Build an AI-powered application (e.g. intelligent search, document summarizer, or vision classifier).',
      portfolio: 'Publish full working source code and live demos on GitHub and Hugging Face.',
      experience: 'Contribute to open-source AI libraries or take on freelance AI automation gigs.',
      opportunity: 'Join high-growth tech startups, AI research labs, or launch independent AI SaaS tools.',
    },
    incomePaths: [
      {
        type: 'job',
        title: 'Full-Time AI / ML Engineer',
        emoji: '🎯',
        description: 'Employed by tech startups, AI companies, or global enterprises.',
        whereMoneyComesFrom: 'Company revenue paying for building and maintaining core AI product features.',
      },
      {
        type: 'freelance',
        title: 'AI Integration Consultant',
        emoji: '💼',
        description: 'Helping businesses integrate custom LLMs and automated workflows.',
        whereMoneyComesFrom: 'Client project fees ($3,000–$15,000 per project) for saving them hundreds of manual hours.',
      },
      {
        type: 'remote',
        title: 'Global Remote Contractor',
        emoji: '🌍',
        description: 'Working for US/European tech companies from anywhere in the world.',
        whereMoneyComesFrom: 'International tech companies seeking specialized machine learning talent.',
      },
      {
        type: 'products',
        title: 'Build & Sell Micro-AI SaaS',
        emoji: '📦',
        description: 'Creating niche AI tools, browser extensions, or API services.',
        whereMoneyComesFrom: 'Monthly recurring subscriptions ($19–$99/month) from hundreds of paying end-users.',
      },
    ],
    relatedCareerIds: ['full-stack-developer', 'data-analyst', 'cybersecurity-specialist'],
    nextSteps: [
      {
        id: 'ai-step-1',
        title: 'Experience AI Decision Making',
        description: 'Spend 5 minutes designing a recommendation algorithm logic for a real product.',
        durationMinutes: 5,
        actionType: 'simulate',
      },
    ],
  },

  // 2. UI/UX Designer
  {
    id: 'ui-ux-designer',
    directionId: 'product-design',
    areaId: 'creativity-design',
    title: 'UI/UX Designer',
    emoji: '🎨',
    tagline: 'Designs digital experiences',
    oneLiner: 'Designs how websites and mobile apps look, feel, and flow for real human beings.',
    whatTheyDo: [
      'Interview users to understand their frustrations and real needs.',
      'Create wireframes, user flows, and interactive prototypes in Figma.',
      'Design clean typography, color palettes, and polished component libraries.',
      'Test prototypes with real users to eliminate friction before engineers build.',
    ],
    youMayEnjoyIf: [
      'You care deeply about aesthetics, clean layouts, and visual harmony.',
      'You get frustrated when an app or website is confusing or clunky to use.',
      'You enjoy understanding human psychology and empathy.',
    ],
    whatYouNeed: ['Figma & Prototyping', 'User Research', 'Design Systems', 'Visual Hierarchy', 'Information Architecture'],
    waysToGetThere: [
      { stage: 'School / Early', description: 'Start sketching app ideas and learning free Figma tutorials online.' },
      { stage: 'College / Self-Taught', description: 'Redesign bad apps you use and publish case studies on Behance/Dribbble.' },
      { stage: 'Career Launch', description: 'Build a 3-project design portfolio and work with real startup founders.' },
    ],
    learningProgression: {
      learn: 'Master visual hierarchy, typography, color theory, and Figma fundamentals.',
      practice: 'Recreate famous apps (Airbnb, Spotify) to study their layout grids and component design.',
      build: 'Design an end-to-end mobile app addressing a real problem in your community or daily life.',
      portfolio: 'Write 3 comprehensive case studies detailing user problem, wireframes, and final prototypes.',
      experience: 'Design landing pages for friends, open-source projects, or early-stage student startups.',
      opportunity: 'Apply for product design roles at top tech companies, design studios, or freelance remotely.',
    },
    incomePaths: [
      {
        type: 'job',
        title: 'Product / UX Designer',
        emoji: '🎯',
        description: 'Working in-house on web and mobile products at tech companies.',
        whereMoneyComesFrom: 'Company payroll to increase user retention, sign-ups, and engagement.',
      },
      {
        type: 'freelance',
        title: 'Independent Brand & Web Designer',
        emoji: '💼',
        description: 'Designing high-converting websites and mobile interfaces for clients.',
        whereMoneyComesFrom: 'Clients paying fixed project rates ($1,500–$8,000) for bespoke design work.',
      },
      {
        type: 'remote',
        title: 'Remote Product Designer',
        emoji: '🌍',
        description: 'Working with international remote-first teams across time zones.',
        whereMoneyComesFrom: 'Global startups that hire talent worldwide without geographical restrictions.',
      },
      {
        type: 'products',
        title: 'Design Templates & UI Kits',
        emoji: '📦',
        description: 'Selling Figma design systems, icon packs, and Framer/Webflow templates.',
        whereMoneyComesFrom: 'Passive digital asset marketplaces and creator storefronts.',
      },
    ],
    relatedCareerIds: ['product-manager', 'brand-designer', 'full-stack-developer'],
    nextSteps: [
      {
        id: 'ux-step-1',
        title: 'Experience UX Prioritization',
        description: 'Spend 5 minutes making a real product layout decision for a delivery app.',
        durationMinutes: 5,
        actionType: 'simulate',
      },
    ],
  },

  // 3. Product Manager
  {
    id: 'product-manager',
    directionId: 'product-management',
    areaId: 'business-strategy',
    title: 'Product Manager',
    emoji: '🧭',
    tagline: 'Leads product vision and strategy',
    oneLiner: 'Discovers what users need and leads engineers and designers to build it.',
    whatTheyDo: [
      'Define the product roadmap and decide which features to build next.',
      'Balance user satisfaction, technical difficulty, and business revenue.',
      'Coordinate between engineering, design, marketing, and executives.',
      'Analyze product data and user feedback to continuously improve metrics.',
    ],
    youMayEnjoyIf: [
      'You enjoy seeing the big picture and organizing chaos into clear plans.',
      'You like talking with both technical and non-technical people.',
      'You want to decide what gets built and see it launched into the world.',
    ],
    whatYouNeed: ['Product Roadmapping', 'User Empathy', 'Data Analytics', 'Strategic Prioritization', 'Communication'],
    waysToGetThere: [
      { stage: 'School / Early', description: 'Organize school clubs, group events, or student initiatives.' },
      { stage: 'College / Self-Taught', description: 'Lead campus hackathon teams or launch a mini student project.' },
      { stage: 'Career Launch', description: 'Start as an Associate Product Manager (APM) or transition from design/engineering.' },
    ],
    learningProgression: {
      learn: 'Understand agile methodologies, user feedback loops, and basic software lifecycle.',
      practice: 'Write PRDs (Product Requirement Documents) for features you wish existing apps had.',
      build: 'Launch a small side project with 1 engineer and 1 designer to experience the full launch cycle.',
      portfolio: 'Document case studies showing how you identified a problem, prioritized solutions, and measured outcomes.',
      experience: 'Take on project lead responsibilities in your current role or university organizations.',
      opportunity: 'Join APM programs, tech startups as a product lead, or found your own venture.',
    },
    incomePaths: [
      {
        type: 'job',
        title: 'Product Manager / Group PM',
        emoji: '🎯',
        description: 'Leading product squads at startups or established tech giants.',
        whereMoneyComesFrom: 'Companies investing heavily in leaders who directly drive revenue and user growth.',
      },
      {
        type: 'startup',
        title: 'Startup Founder / Co-Founder',
        emoji: '🚀',
        description: 'Building and scaling a brand new company from scratch.',
        whereMoneyComesFrom: 'Customer revenue and venture capital investment.',
      },
      {
        type: 'contract',
        title: 'Fractional Head of Product',
        emoji: '🧑💻',
        description: 'Advising early-stage startups on product roadmap 10–15 hours/week.',
        whereMoneyComesFrom: 'Founders paying monthly retainer fees ($4,000–$10,000/month) for senior guidance.',
      },
    ],
    relatedCareerIds: ['ui-ux-designer', 'data-analyst', 'growth-strategist'],
    nextSteps: [
      {
        id: 'pm-step-1',
        title: 'Experience Product Feature Trade-offs',
        description: 'Spend 5 minutes balancing engineering effort vs user value before a launch.',
        durationMinutes: 5,
        actionType: 'simulate',
      },
    ],
  },

  // 4. Data Analyst
  {
    id: 'data-analyst',
    directionId: 'ai-data',
    areaId: 'tech-building',
    title: 'Data Analyst',
    emoji: '📊',
    tagline: 'Finds insights in numbers',
    oneLiner: 'Turns messy numbers and trends into clear stories that guide big decisions.',
    whatTheyDo: [
      'Extract data from databases using SQL and clean it with Python or Excel.',
      'Create interactive visual dashboards using tools like Tableau or PowerBI.',
      'Uncover patterns in user behavior, sales, and operational efficiency.',
      'Present findings to company leadership to answer strategic questions.',
    ],
    youMayEnjoyIf: [
      'You love finding hidden patterns and truth in numbers.',
      'You enjoy solving logic puzzles and organizing messy information.',
      'You like proving arguments with data rather than guesswork.',
    ],
    whatYouNeed: ['SQL & Databases', 'Python or R', 'Tableau / PowerBI', 'Statistical Analysis', 'Business Storytelling'],
    waysToGetThere: [
      { stage: 'School / Early', description: 'Get comfortable with spreadsheets, algebra, and basic statistics.' },
      { stage: 'College / Self-Taught', description: 'Learn SQL and analyze open datasets on sports, movies, or finance.' },
      { stage: 'Career Launch', description: 'Publish interactive Tableau dashboards and analysis write-ups.' },
    ],
    learningProgression: {
      learn: 'Master SQL queries, spreadsheet modeling, and basic descriptive statistics.',
      practice: 'Query real-world relational databases on Kaggle and write analytical summaries.',
      build: 'Build an end-to-end interactive dashboard answering a specific commercial question.',
      portfolio: 'Publish interactive Tableau public profiles and GitHub repositories with clean SQL scripts.',
      experience: 'Analyze data for non-profits, student organizations, or small local businesses.',
      opportunity: 'Land data analyst roles in tech, finance, e-commerce, or healthcare sectors.',
    },
    incomePaths: [
      {
        type: 'job',
        title: 'Business / Data Analyst',
        emoji: '🎯',
        description: 'Embedded within finance, marketing, or product analytics teams.',
        whereMoneyComesFrom: 'Companies saving millions by identifying waste and finding new revenue streams.',
      },
      {
        type: 'freelance',
        title: 'BI & Dashboard Consultant',
        emoji: '💼',
        description: 'Building custom executive dashboards for small and medium businesses.',
        whereMoneyComesFrom: 'Business owners paying for clear visibility into their daily cash flow and sales.',
      },
      {
        type: 'remote',
        title: 'Remote Analytics Contractor',
        emoji: '🌍',
        description: 'Providing quantitative analysis for global distributed companies.',
        whereMoneyComesFrom: 'International firms needing structured data modeling talent.',
      },
    ],
    relatedCareerIds: ['ai-engineer', 'product-manager', 'growth-strategist'],
    nextSteps: [
      {
        id: 'data-step-1',
        title: 'Experience Root-Cause Data Investigation',
        description: 'Spend 5 minutes diagnosing an unexpected drop in online sales.',
        durationMinutes: 5,
        actionType: 'simulate',
      },
    ],
  },

  // 5. Cybersecurity Specialist
  {
    id: 'cybersecurity-specialist',
    directionId: 'cybersecurity',
    areaId: 'tech-building',
    title: 'Cybersecurity Specialist',
    emoji: '🛡️',
    tagline: 'Defends digital infrastructure',
    oneLiner: 'Protects systems, networks, and confidential data from hackers and security threats.',
    whatTheyDo: [
      'Monitor networks 24/7 for suspicious activities and intrusion attempts.',
      'Conduct ethical penetration tests to find vulnerabilities before attackers do.',
      'Build defense-in-depth security policies and multi-factor access controls.',
      'Respond to and mitigate security incidents and data breach risks.',
    ],
    youMayEnjoyIf: [
      'You enjoy thinking like a detective to outsmart adversaries.',
      'You care about privacy, trust, and keeping important data safe.',
      'You find network systems and cryptography fascinating.',
    ],
    whatYouNeed: ['Network Security', 'Ethical Hacking', 'Linux Systems', 'Incident Response', 'Cloud Security'],
    waysToGetThere: [
      { stage: 'School / Early', description: 'Learn how computer networks work and play Capture The Flag (CTF) games.' },
      { stage: 'College / Self-Taught', description: 'Set up home virtual labs in Linux and practice ethical hacking techniques.' },
      { stage: 'Career Launch', description: 'Earn foundational certifications (CompTIA Security+, CEH) and join a SOC team.' },
    ],
    learningProgression: {
      learn: 'Understand TCP/IP networking, operating system security, and basic cryptography.',
      practice: 'Complete challenges on TryHackMe and Hack The Box platforms.',
      build: 'Build a secure home lab environment and configure firewalls and intrusion detection tools.',
      portfolio: 'Write detailed security audit write-ups and report ethical disclosures.',
      experience: 'Participate in bug bounty programs or join junior Security Operations Center (SOC) teams.',
      opportunity: 'Work as a Security Analyst, Penetration Tester, or Cloud Security Engineer.',
    },
    incomePaths: [
      {
        type: 'job',
        title: 'Security Operations / Pen Tester',
        emoji: '🎯',
        description: 'Defending enterprise systems and banking networks.',
        whereMoneyComesFrom: 'Companies paying top dollar to prevent catastrophic data breaches and ransomware.',
      },
      {
        type: 'freelance',
        title: 'Bug Bounty Hunter',
        emoji: '💼',
        description: 'Finding ethical security vulnerabilities in major platforms.',
        whereMoneyComesFrom: 'Bounties paid by companies like Google, Apple, and Shopify ($500–$50,000 per bug).',
      },
      {
        type: 'contract',
        title: 'Security Compliance Auditor',
        emoji: '🧑💻',
        description: 'Helping startups achieve SOC2 and ISO27001 security compliance.',
        whereMoneyComesFrom: 'B2B startups paying audit fees to sell software to Fortune 500 clients.',
      },
    ],
    relatedCareerIds: ['full-stack-developer', 'ai-engineer'],
    nextSteps: [
      {
        id: 'sec-step-1',
        title: 'Experience Cybersecurity Defense Decision',
        description: 'Spend 5 minutes designing a company-wide defense against a phishing breach.',
        durationMinutes: 5,
        actionType: 'simulate',
      },
    ],
  },

  // 6. Full-Stack Developer
  {
    id: 'full-stack-developer',
    directionId: 'software-engineering',
    areaId: 'tech-building',
    title: 'Full-Stack Developer',
    emoji: '💻',
    tagline: 'Builds complete web applications',
    oneLiner: 'Creates everything from user interfaces to backend servers and databases.',
    whatTheyDo: [
      'Write frontend user interfaces with React, Next.js, and modern CSS.',
      'Build robust backend APIs and server logic with Node.js, Python, or Go.',
      'Design database schemas and connect cloud storage infrastructure.',
      'Deploy, scale, and maintain applications in production.',
    ],
    youMayEnjoyIf: [
      'You want the power to turn any idea into a real website or app by yourself.',
      'You enjoy both visual building and logical backend architecture.',
      'You love seeing something you wrote used by people around the world.',
    ],
    whatYouNeed: ['TypeScript / JavaScript', 'React / Next.js', 'Node.js & APIs', 'Databases (SQL/NoSQL)', 'Git & Deployment'],
    waysToGetThere: [
      { stage: 'School / Early', description: 'Learn HTML, CSS, and basic JavaScript by making your first web page.' },
      { stage: 'College / Self-Taught', description: 'Build 3 full-stack projects connecting a database and user accounts.' },
      { stage: 'Career Launch', description: 'Deploy live web apps, contribute to open source, and apply for junior developer roles.' },
    ],
    learningProgression: {
      learn: 'Master HTML, modern CSS, JavaScript fundamentals, and API communication.',
      practice: 'Build interactive frontends and connect them to backend REST and GraphQL APIs.',
      build: 'Create a full-stack SaaS application with user authentication, database, and payments.',
      portfolio: 'Host live web apps on Vercel/Fly.io with clean, documented GitHub code.',
      experience: 'Build freelance client websites or contribute to active open-source software.',
      opportunity: 'Work as a full-stack engineer at high-growth startups, remote agencies, or as an indie hacker.',
    },
    incomePaths: [
      {
        type: 'job',
        title: 'Software Engineer (Frontend / Backend / Fullstack)',
        emoji: '🎯',
        description: 'Writing code for software products and tech infrastructure.',
        whereMoneyComesFrom: 'Tech company revenue driven by building and maintaining software products.',
      },
      {
        type: 'freelance',
        title: 'Freelance Web & App Developer',
        emoji: '💼',
        description: 'Building custom web apps, e-commerce stores, and MVPs for founders.',
        whereMoneyComesFrom: 'Clients paying fixed project rates ($2,000–$15,000) for completed software.',
      },
      {
        type: 'remote',
        title: 'Global Remote Engineer',
        emoji: '🌍',
        description: 'Working for US/European companies remotely from anywhere.',
        whereMoneyComesFrom: 'Global companies hiring engineering talent without borders.',
      },
      {
        type: 'products',
        title: 'Indie Micro-SaaS & Developer Tools',
        emoji: '📦',
        description: 'Building automated software tools that charge monthly subscriptions.',
        whereMoneyComesFrom: 'Direct customer subscriptions via Stripe.',
      },
    ],
    relatedCareerIds: ['ai-engineer', 'ui-ux-designer', 'cybersecurity-specialist'],
    nextSteps: [
      {
        id: 'dev-step-1',
        title: 'Experience Engineering Bottleneck Optimization',
        description: 'Spend 5 minutes analyzing performance bottlenecks on a high-traffic app.',
        durationMinutes: 5,
        actionType: 'simulate',
      },
    ],
  },
];
