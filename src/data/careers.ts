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
  // Technology
  {
    id: 'ai',
    areaId: 'tech-building',
    title: 'Artificial Intelligence',
    emoji: '🤖',
    tagline: 'Build intelligent systems',
    description: 'Design models and software that can reason, learn, and automate complex tasks.',
    careers: ['ai-engineer', 'ml-engineer', 'ai-product-manager'],
  },
  {
    id: 'software',
    areaId: 'tech-building',
    title: 'Software Engineering',
    emoji: '💻',
    tagline: 'Build software products',
    description: 'Craft reliable, high-performance web applications and backend systems.',
    careers: ['fullstack-developer', 'mobile-app-developer'],
  },
  {
    id: 'cybersecurity',
    areaId: 'tech-building',
    title: 'Cybersecurity',
    emoji: '🔐',
    tagline: 'Protect systems & data',
    description: 'Defend networks, protect private data, and outsmart security vulnerabilities.',
    careers: ['security-analyst'],
  },
  {
    id: 'data-analytics',
    areaId: 'tech-building',
    title: 'Data & Analytics',
    emoji: '📊',
    tagline: 'Find meaning in data',
    description: 'Turn massive datasets into clear statistical insights and actionable decisions.',
    careers: ['data-scientist'],
  },

  // Creativity & Design
  {
    id: 'product-design',
    areaId: 'creativity-design',
    title: 'Product & UX Design',
    emoji: '✨',
    tagline: 'Design seamless digital experiences',
    description: 'Create intuitive interfaces and effortless user journeys for modern digital apps.',
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
  {
    id: 'game-design',
    areaId: 'creativity-design',
    title: 'Interactive & Game Design',
    emoji: '🎮',
    tagline: 'Create playful interactive worlds',
    description: 'Design game mechanics, engaging narratives, and immersive interactive worlds.',
    careers: ['game-designer'],
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
    id: 'growth-marketing',
    areaId: 'business-strategy',
    title: 'Growth & Strategy',
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
  {
    id: 'clean-energy',
    areaId: 'science-discovery',
    title: 'Clean Energy & Climate',
    emoji: '☀️',
    tagline: 'Build sustainable systems',
    description: 'Develop renewable energy models, battery storage, and carbon-reduction tech.',
    careers: ['sustainability-analyst'],
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
    directionId: 'ai',
    areaId: 'tech-building',
    title: 'AI Engineer',
    emoji: '🤖',
    tagline: 'Builds AI-powered systems',
    oneLiner: 'Build intelligent software that can solve problems and reason with data.',
    whatTheyDo: [
      'Build and integrate large language models and neural networks into applications.',
      'Work with structured and unstructured data to train and fine-tune models.',
      'Write clean, modular code to deploy AI APIs into production systems.',
      'Evaluate model accuracy, prevent hallucination, and optimize latency.',
    ],
    youMayEnjoyIf: [
      'You love solving logical puzzles and thinking in algorithms.',
      'You are fascinated by how computers can understand language and vision.',
      'You like building real tools that make human life easier.',
    ],
    whatYouNeed: [
      'Python programming & software architecture',
      'Understanding of machine learning & LLM foundations',
      'API design and database integration',
      'Curiosity and continuous experimentation',
    ],
    waysToGetThere: [
      { stage: 'Foundation', description: 'Learn Python basics and essential computer science concepts.' },
      { stage: 'Core Skills', description: 'Understand neural networks, transformers, and API workflows.' },
      { stage: 'First Projects', description: 'Build 2–3 mini AI projects (e.g. intelligent search, document summarizer).' },
      { stage: 'Practical Exposure', description: 'Contribute to open-source tools or build full-stack prototypes.' },
      { stage: 'Career Launch', description: 'Apply for junior AI engineer roles, freelance, or launch an AI product.' },
    ],
    relatedCareerIds: ['ml-engineer', 'ai-product-manager', 'fullstack-developer'],
    nextSteps: [
      {
        id: 'ai-step-1',
        title: 'Explore what AI engineers actually do',
        description: 'Before writing code, understand what day-to-day work looks like and the core problems they solve.',
        durationMinutes: 5,
        actionType: 'read',
        content: {
          summary: 'An AI engineer sits between machine learning research and practical software development. They don’t just write formulas; they take existing intelligence models and weave them into intuitive products that users can touch and use.',
          keyTakeaways: [
            'AI engineers spend 40% of their time on data preparation and prompt/model evaluation.',
            'They focus on reliability: making sure the model gives fast, accurate, and safe answers.',
            'You do not need a PhD in math to build impactful AI applications today.',
          ],
          miniReflection: 'Does the idea of building tools that feel "smart" and save people hours of manual work excite your curiosity?',
        },
      },
      {
        id: 'ai-step-2',
        title: 'Learn the foundations of Python & Logic',
        description: 'Get comfortable with basic programming syntax, functions, and data structures.',
        durationMinutes: 15,
      },
      {
        id: 'ai-step-3',
        title: 'Build your first simple AI project',
        description: 'Connect a basic LLM API to summarize notes or answer questions.',
        durationMinutes: 30,
      },
      {
        id: 'ai-step-4',
        title: 'Deepen your AI toolchain skills',
        description: 'Explore embeddings, vector search, and model fine-tuning.',
      },
      {
        id: 'ai-step-5',
        title: 'Build your public portfolio',
        description: 'Showcase 2 live interactive applications on GitHub.',
      },
      {
        id: 'ai-step-6',
        title: 'Find first opportunities',
        description: 'Connect with startups, internships, or freelance clients.',
      },
    ],
  },

  // 2. Machine Learning Engineer
  {
    id: 'ml-engineer',
    directionId: 'ai',
    areaId: 'tech-building',
    title: 'Machine Learning Engineer',
    emoji: '🧠',
    tagline: 'Builds systems that learn from data',
    oneLiner: 'Develop mathematical models and scalable pipelines that predict patterns from massive data.',
    whatTheyDo: [
      'Train statistical machine learning and deep learning models.',
      'Optimize data pipelines for high-throughput training and inference.',
      'Deploy models at scale using cloud infrastructure and Docker.',
      'Monitor model drift and retrain models on fresh real-world data.',
    ],
    youMayEnjoyIf: [
      'You enjoy math, statistics, and finding hidden patterns in numbers.',
      'You like optimizing performance and squeezing efficiency out of code.',
      'You appreciate rigorous experimentation and testing hypotheses.',
    ],
    whatYouNeed: [
      'Mathematics (Linear Algebra, Calculus, Probability)',
      'Python, PyTorch or TensorFlow',
      'Data engineering and cloud computing',
      'Experimentation and metric tracking',
    ],
    waysToGetThere: [
      { stage: 'Foundation', description: 'Master calculus, linear algebra, and Python data libraries (NumPy, Pandas).' },
      { stage: 'Core Skills', description: 'Train classical models (regressions, random forests) and neural networks.' },
      { stage: 'Projects', description: 'Build end-to-end prediction systems on public datasets (Kaggle).' },
      { stage: 'Scale', description: 'Learn MLOps: packaging models and setting up automated retraining.' },
      { stage: 'Career Launch', description: 'Join data science and ML engineering teams in high-growth companies.' },
    ],
    relatedCareerIds: ['ai-engineer', 'data-scientist'],
    nextSteps: [
      {
        id: 'ml-step-1',
        title: 'Explore the ML Engineer role',
        description: 'Learn the difference between training models and engineering production ML pipelines.',
        durationMinutes: 5,
        actionType: 'read',
        content: {
          summary: 'Machine Learning Engineers are the bridge between data science insights and high-reliability production systems. They ensure models can handle millions of live user queries every second without crashing.',
          keyTakeaways: [
            'Strong foundation in statistics combined with clean software engineering.',
            'Heavy focus on data hygiene, performance benchmarks, and cloud architectures.',
            'High demand across autonomous vehicles, finance, recommendation engines, and robotics.',
          ],
          miniReflection: 'Do you enjoy the intersection of mathematical reasoning and high-performance computing?',
        },
      },
      { id: 'ml-step-2', title: 'Learn Python, NumPy & Pandas', description: 'Master data manipulation fundamentals.' },
      { id: 'ml-step-3', title: 'Train your first predictive model', description: 'Build a classifier for real-world data.' },
      { id: 'ml-step-4', title: 'Explore Deep Learning with PyTorch', description: 'Construct and train neural networks.' },
      { id: 'ml-step-5', title: 'Learn MLOps & model deployment', description: 'Serve your model via a fast API endpoint.' },
    ],
  },

  // 3. AI Product Manager
  {
    id: 'ai-product-manager',
    directionId: 'ai',
    areaId: 'tech-building',
    title: 'AI Product Manager',
    emoji: '🧭',
    tagline: 'Helps build products using AI',
    oneLiner: 'Define what AI products should do, why they matter, and how users interact with them.',
    whatTheyDo: [
      'Identify valuable user problems that AI can uniquely solve.',
      'Collaborate with AI engineers and designers to build intuitive product flows.',
      'Define success metrics, evaluate user feedback, and test feature iterations.',
      'Balance technological capabilities with safety, ethics, and business goals.',
    ],
    youMayEnjoyIf: [
      'You love technology but prefer strategic thinking and communication over pure coding.',
      'You are curious about human psychology and user behavior.',
      'You enjoy connecting diverse specialists toward a shared mission.',
    ],
    whatYouNeed: [
      'Understanding of AI capabilities and constraints',
      'User research and product design sensibilities',
      'Strategic communication and roadmapping',
      'Data-driven decision making',
    ],
    waysToGetThere: [
      { stage: 'Foundation', description: 'Understand basic technology principles, product lifecycle, and user needs.' },
      { stage: 'Core Skills', description: 'Learn AI literacy (what LLMs and models can/cannot do reliably).' },
      { stage: 'Projects', description: 'Write product requirement documents (PRDs) and interactive prototypes.' },
      { stage: 'Collaboration', description: 'Lead a student or hackathon project uniting designers and engineers.' },
      { stage: 'Career Launch', description: 'Join an associate product manager program or transition from business/tech.' },
    ],
    relatedCareerIds: ['ai-engineer', 'product-manager', 'ui-ux-designer'],
    nextSteps: [
      {
        id: 'aipm-step-1',
        title: 'Understand the AI Product Manager role',
        description: 'See how AI PMs define the "what" and "why" behind intelligent software products.',
        durationMinutes: 5,
        actionType: 'read',
        content: {
          summary: 'An AI Product Manager focuses on customer empathy and business value. While engineers ask "How do we build this model?", the AI PM asks "Is this the most important problem to solve for our users right now?"',
          keyTakeaways: [
            'You do not need to write production code, but you must understand model limitations and costs.',
            'You turn complex technical capabilities into simple, delightful experiences.',
            'You guide the ethical guardrails and safety of AI features.',
          ],
          miniReflection: 'Do you like being the conductor of an orchestra, bringing tech, design, and business together?',
        },
      },
      { id: 'aipm-step-2', title: 'Learn Product Discovery & User Research', description: 'Master customer interview techniques.' },
      { id: 'aipm-step-3', title: 'Write an AI Product Spec (PRD)', description: 'Structure requirements for a smart feature.' },
      { id: 'aipm-step-4', title: 'Build a no-code AI prototype', description: 'Test an idea with real users.' },
      { id: 'aipm-step-5', title: 'Prepare for product management case studies', description: 'Practice strategic product thinking.' },
    ],
  },

  // 4. Full-Stack Developer
  {
    id: 'fullstack-developer',
    directionId: 'software',
    areaId: 'tech-building',
    title: 'Full-Stack Developer',
    emoji: '💻',
    tagline: 'Builds end-to-end web software',
    oneLiner: 'Create responsive web apps, interactive user interfaces, and robust backend APIs.',
    whatTheyDo: [
      'Design and code interactive user interfaces using modern frameworks (React/Next.js).',
      'Build scalable server endpoints and manage databases (PostgreSQL/Node.js).',
      'Connect authentication, payment processing, and external services.',
      'Optimize web performance, accessibility, and search engine visibility.',
    ],
    youMayEnjoyIf: [
      'You love the satisfaction of building something from scratch and seeing it work instantly.',
      'You enjoy both the visual presentation and behind-the-scenes logic.',
      'You like building tools people use in their everyday lives.',
    ],
    whatYouNeed: [
      'HTML, CSS, TypeScript & modern React/Next.js',
      'Backend development and relational databases',
      'Version control (Git) and deployment platforms',
      'Problem solving and debugging agility',
    ],
    waysToGetThere: [
      { stage: 'Foundation', description: 'Master semantic HTML, CSS styling, and JavaScript logic.' },
      { stage: 'Frontend', description: 'Learn TypeScript and modern component frameworks (React).' },
      { stage: 'Backend & DB', description: 'Build APIs with Node.js and store data with PostgreSQL/Supabase.' },
      { stage: 'Full-Stack Apps', description: 'Build 3 complete live applications with authentication and databases.' },
      { stage: 'Career Launch', description: 'Apply for junior developer roles or launch SaaS products.' },
    ],
    relatedCareerIds: ['mobile-app-developer', 'ui-ux-designer', 'ai-engineer'],
    nextSteps: [
      {
        id: 'fs-step-1',
        title: 'Explore what Full-Stack Developers build',
        description: 'See how modern web applications come together from browser to database.',
        durationMinutes: 5,
        actionType: 'read',
        content: {
          summary: 'Full-stack developers are the digital carpenters of the internet. They craft the buttons you tap on your phone, the servers that process your requests, and the databases that keep your information safe.',
          keyTakeaways: [
            'Immediate visual feedback makes web development one of the most rewarding skills to learn.',
            'Versatility allows you to build complete startup ideas independently.',
            'Huge global demand with vast freelance and remote work opportunities.',
          ],
          miniReflection: 'Would you feel proud opening your phone and showing friends an app you coded yourself?',
        },
      },
      { id: 'fs-step-2', title: 'Learn Modern Web Foundations', description: 'HTML, Tailwind CSS, and JavaScript.' },
      { id: 'fs-step-3', title: 'Build an Interactive Web App', description: 'Create a live app with React & Next.js.' },
      { id: 'fs-step-4', title: 'Add a Database & Authentication', description: 'Connect Supabase for persistent data.' },
      { id: 'fs-step-5', title: 'Deploy to the World', description: 'Publish your live app on Vercel.' },
    ],
  },

  // 5. UI/UX & Product Designer
  {
    id: 'ui-ux-designer',
    directionId: 'product-design',
    areaId: 'creativity-design',
    title: 'UI/UX & Product Designer',
    emoji: '✨',
    tagline: 'Designs intuitive digital experiences',
    oneLiner: 'Design digital products that are intuitive, beautiful, and a pleasure to use.',
    whatTheyDo: [
      'Conduct user interviews to understand pain points and desires.',
      'Create wireframes, user journeys, and interactive Figma prototypes.',
      'Design clean design systems with typography, color palettes, and components.',
      'Collaborate closely with developers to ensure pixel-perfect implementation.',
    ],
    youMayEnjoyIf: [
      'You are sensitive to aesthetics, typography, and clean layouts.',
      'You constantly notice when an app or website feels clunky and wonder how to fix it.',
      'You love putting yourself in the shoes of other people.',
    ],
    whatYouNeed: [
      'Figma & design prototyping tools',
      'Understanding of visual hierarchy and typography',
      'User research and usability testing',
      'Empathy and communication',
    ],
    waysToGetThere: [
      { stage: 'Foundation', description: 'Learn design fundamentals: typography, color theory, spacing, and contrast.' },
      { stage: 'Tools', description: 'Master Figma, auto-layout, and reusable component libraries.' },
      { stage: 'Redesigns & Case Studies', description: 'Redesign a frustrating real-world app and document your rationale.' },
      { stage: 'Portfolio', description: 'Build a clean 3-project portfolio showcasing your thinking process.' },
      { stage: 'Career Launch', description: 'Join design studios, tech startups, or freelance design teams.' },
    ],
    relatedCareerIds: ['brand-designer', 'product-manager', 'fullstack-developer'],
    nextSteps: [
      {
        id: 'ux-step-1',
        title: 'Explore UI/UX Product Design',
        description: 'Understand the difference between visual art and functional problem-solving design.',
        durationMinutes: 5,
        actionType: 'read',
        content: {
          summary: 'Product design is not about decorating a screen; it is about making complicated tasks feel effortless and calm. Good design is often invisible because it gets out of the user’s way.',
          keyTakeaways: [
            'Designers solve real human frustrations using visual structure.',
            'It blends human psychology, visual taste, and business clarity.',
            'A great portfolio of case studies is the single most important asset to get hired.',
          ],
          miniReflection: 'Do you notice small visual details, fonts, and clean spacing when using your favorite apps?',
        },
      },
      { id: 'ux-step-2', title: 'Learn Design Fundamentals & Figma', description: 'Master layout, components, and typography.' },
      { id: 'ux-step-3', title: 'Conduct your first user research', description: 'Interview 3 people about an everyday problem.' },
      { id: 'ux-step-4', title: 'Create an interactive clickable prototype', description: 'Design a mobile app flow in Figma.' },
      { id: 'ux-step-5', title: 'Publish your design case study', description: 'Present the problem, iteration, and solution.' },
    ],
  },

  // 6. Data Scientist
  {
    id: 'data-scientist',
    directionId: 'data-analytics',
    areaId: 'tech-building',
    title: 'Data Scientist',
    emoji: '📊',
    tagline: 'Finds meaning in complex data',
    oneLiner: 'Analyze complex datasets to uncover hidden trends, test hypotheses, and drive decisions.',
    whatTheyDo: [
      'Extract, clean, and explore massive datasets from diverse sources.',
      'Build statistical models and test hypotheses to validate business questions.',
      'Create intuitive visual dashboards and communicate findings to leadership.',
      'Develop machine learning models to forecast future trends.',
    ],
    youMayEnjoyIf: [
      'You are naturally curious and love digging for truth using facts.',
      'You enjoy organizing chaotic information into clean charts.',
      'You like answering "Why did this happen?" with evidence.',
    ],
    whatYouNeed: [
      'Python or R for data analysis (Pandas, SciPy)',
      'SQL for database querying',
      'Statistics and experimental design',
      'Data visualization & storytelling',
    ],
    waysToGetThere: [
      { stage: 'Foundation', description: 'Learn SQL and Python data analysis libraries.' },
      { stage: 'Statistics', description: 'Understand hypothesis testing, probability, and regression.' },
      { stage: 'Exploration', description: 'Analyze open-source datasets (sports, climate, economics).' },
      { stage: 'Visual Dashboards', description: 'Build interactive dashboards and clear data reports.' },
      { stage: 'Career Launch', description: 'Join analytics teams across tech, finance, healthcare, or retail.' },
    ],
    relatedCareerIds: ['ml-engineer', 'ai-engineer', 'growth-strategist'],
    nextSteps: [
      {
        id: 'ds-step-1',
        title: 'Explore the Data Scientist career',
        description: 'See how data scientists turn raw numbers into strategic clarity.',
        durationMinutes: 5,
        actionType: 'read',
        content: {
          summary: 'Data scientists are the digital detectives of modern companies. They sift through mountains of user interactions, sales logs, and sensory data to explain what is happening and predict what will happen next.',
          keyTakeaways: [
            'Combines detective curiosity with statistical rigor.',
            'Powers key decisions from Spotify song recommendations to medical trial analysis.',
            'SQL and Python are the two most essential core tools to learn first.',
          ],
          miniReflection: 'Do you feel excited when you discover an unexpected insight hiding in a chart or spreadsheet?',
        },
      },
      { id: 'ds-step-2', title: 'Learn SQL & Database Querying', description: 'Extract and filter records from databases.' },
      { id: 'ds-step-3', title: 'Analyze real datasets with Python', description: 'Clean data and calculate correlations.' },
      { id: 'ds-step-4', title: 'Build a Data Story & Dashboard', description: 'Present findings visually.' },
    ],
  },

  // 7. Product Manager
  {
    id: 'product-manager',
    directionId: 'product-management',
    areaId: 'business-strategy',
    title: 'Product Manager',
    emoji: '🧭',
    tagline: 'Leads products from idea to launch',
    oneLiner: 'Guide the strategy, roadmap, and execution for digital products that solve real problems.',
    whatTheyDo: [
      'Define the product vision, prioritize roadmap features, and set milestones.',
      'Unite developers, designers, sales, and marketing around a unified goal.',
      'Interview customers, study analytics, and identify high-leverage opportunities.',
      'Make trade-offs between speed, quality, and business impact.',
    ],
    youMayEnjoyIf: [
      'You enjoy seeing the big picture and organizing chaos into clear plans.',
      'You have great empathy for users and an instinct for business.',
      'You love collaborating with different kinds of creative and technical minds.',
    ],
    whatYouNeed: [
      'Product strategy and roadmapping',
      'User research and data analysis',
      'Clear written and verbal communication',
      'Leadership through influence and trust',
    ],
    waysToGetThere: [
      { stage: 'Foundation', description: 'Understand basic business principles, software development, and design.' },
      { stage: 'Product Sense', description: 'Analyze popular apps: why features exist and how they make money.' },
      { stage: 'Mini Projects', description: 'Create product teardowns and feature improvement proposals.' },
      { stage: 'Leadership', description: 'Lead a student venture, hackathon project, or startup initiative.' },
      { stage: 'Career Launch', description: 'Apply for APM programs or transition from engineering/design/consulting.' },
    ],
    relatedCareerIds: ['ai-product-manager', 'growth-strategist', 'ui-ux-designer'],
    nextSteps: [
      {
        id: 'pm-step-1',
        title: 'Explore the Product Manager role',
        description: 'Understand how PMs influence product direction without having direct authority.',
        durationMinutes: 5,
        actionType: 'read',
        content: {
          summary: 'Product Managers are often called the "mini-CEOs" of a feature or product line, but their real superpower is clarity: understanding customer pain so deeply that every decision makes sense to the whole team.',
          keyTakeaways: [
            'PMs focus on problem clarity before jumping into solutions.',
            'They align engineers and designers toward maximum customer value.',
            'High strategic impact with clear progression into executive leadership.',
          ],
          miniReflection: 'When you look at an app you love, do you often think about how to make it 10x better for users?',
        },
      },
      { id: 'pm-step-2', title: 'Learn Product Discovery Frameworks', description: 'Understand Jobs-to-be-Done and prioritization.' },
      { id: 'pm-step-3', title: 'Write a Product Teardown', description: 'Analyze why a successful product works.' },
    ],
  },
];
