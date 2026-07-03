export interface BlogSection {
  /** Anchor id — sections with an id and heading appear in the table of contents */
  id?: string;
  heading?: string;
  /** Heading level: 2 (default) or 3 */
  level?: 2 | 3;
  /** Paragraphs separated by \n\n. Supports inline links: [text](/path) or [text](https://...) */
  body?: string;
  list?: { type: 'ul' | 'ol'; items: string[] };
  table?: { caption?: string; headers: string[]; rows: string[][] };
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Short title for the <title> tag (max ~60 chars incl. suffix). Falls back to title. */
  seoTitle?: string;
  /** Meta description (150–160 chars). Falls back to a truncated excerpt. */
  seoDescription?: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author?: string;
  tags?: string[];
  coverImage: string;
  coverImageAlt?: string;
  coverImageWidth?: number;
  coverImageHeight?: number;
  sections: BlogSection[];
  faqs?: BlogFAQ[];
  cta?: {
    heading: string;
    body: string;
  };
}

export const blogs: BlogPost[] = [
  {
    slug: 'healthcare-staffing-challenges',
    title: 'Healthcare Staffing Challenges: Smarter Workforce Management for Better Patient Care',
    excerpt: 'From workforce shortages and scheduling difficulties to compliance requirements and employee burnout — managing healthcare staff has become increasingly complex. Here is how technology changes that.',
    category: 'Healthcare',
    readTime: '4 min read',
    date: 'Jun 03, 2025',
    coverImage: '/blog/blog-healthcare-staffing.webp',
    sections: [
      {
        body: 'Healthcare organisations face growing staffing challenges that impact patient care, employee wellbeing, and operational efficiency. From workforce shortages and scheduling difficulties to compliance requirements and employee burnout, managing healthcare staff has become increasingly complex.',
      },
      {
        heading: 'The Challenge of Healthcare Staffing',
        body: 'Healthcare providers must ensure adequate staffing levels 24/7 while balancing employee availability, qualifications, and patient demand. Staff shortages often lead to increased workloads, overtime costs, and scheduling gaps, putting additional pressure on both employees and managers.\n\nWhen healthcare facilities struggle to fill shifts, patient care quality can be affected, and employee satisfaction may decline. High turnover rates further increase recruitment costs and workforce instability.',
      },
      {
        heading: 'Scheduling and Compliance Complexities',
        body: 'Creating accurate schedules manually can be time-consuming and prone to errors. Double bookings, missed shifts, last-minute changes, and payroll inaccuracies can disrupt operations and create unnecessary stress for healthcare teams.\n\nIn addition, healthcare organisations must comply with strict regulations, including work-hour limits, licensing requirements, and employee certifications. Tracking these requirements manually increases the risk of compliance issues and administrative burdens.',
      },
      {
        heading: 'The Impact of Employee Burnout',
        body: 'Healthcare professionals work in demanding environments where long hours and heavy workloads can contribute to burnout. Overworked employees are more likely to experience stress, reduced productivity, and job dissatisfaction, leading to higher turnover rates.\n\nProviding balanced schedules and better workforce visibility can help healthcare organisations improve employee wellbeing and retention.',
      },
      {
        heading: 'How Technology Can Help',
        body: 'Modern workforce management software simplifies healthcare staffing by automating scheduling, attendance tracking, shift management, and workforce communication. Real-time updates help managers quickly respond to staffing changes while ensuring shifts remain fully covered.\n\nAutomation reduces administrative workload, minimises scheduling errors, and improves workforce efficiency, allowing healthcare teams to focus on delivering quality patient care.',
      },
      {
        heading: 'How Logezy Supports Healthcare Providers',
        body: "Logezy's workforce management platform helps healthcare organisations streamline scheduling, monitor attendance, manage compliance, and improve staff communication. With automated workforce planning and real-time visibility, healthcare providers can reduce staffing gaps, control labour costs, and enhance employee satisfaction.",
      },
    ],
    cta: {
      heading: 'Ready to simplify healthcare staffing?',
      body: "Healthcare staffing challenges continue to evolve, but the right technology can make workforce management simpler and more efficient. With Logezy, healthcare providers can confidently manage their workforce and focus on what matters most: exceptional patient care.",
    },
  },
  {
    slug: 'branded-mobile-app-recruitment',
    title: 'Why Your Recruitment Agency Needs a Branded Mobile App',
    excerpt: 'A branded mobile app is no longer optional. It is a competitive advantage. Improve communication, enhance candidate experience, and strengthen your brand in a digital-first recruitment market.',
    category: 'Technology',
    readTime: '3 min read',
    date: 'Jun 10, 2025',
    coverImage: '/blog/blog-branded-mobile-app.webp',
    sections: [
      {
        body: 'The recruitment industry is evolving rapidly, and agencies need smarter ways to connect with candidates, workers, and clients. A branded mobile app helps recruitment agencies streamline operations, improve communication, and strengthen their brand presence.',
      },
      {
        heading: 'Improve Candidate Experience',
        body: "Today's workforce expects instant access to jobs and updates. A branded mobile app allows candidates to view vacancies, accept shifts, submit availability, upload documents, and stay connected with recruiters anytime, anywhere.",
      },
      {
        heading: 'Strengthen Your Brand',
        body: "A mobile app branded with your agency's logo and identity keeps your business front and centre. Instead of relying on third-party platforms, candidates engage directly with your agency, helping build trust and loyalty.",
      },
      {
        heading: 'Enhance Communication',
        body: 'Missed calls and delayed emails can lead to unfilled shifts and lost opportunities. With push notifications and real-time updates, agencies can instantly communicate job alerts, shift changes, and important announcements to workers.',
      },
      {
        heading: 'Simplify Workforce Management',
        body: 'Managing schedules manually can be time-consuming and prone to errors. A mobile app enables workers to view schedules, confirm shifts, submit timesheets, and receive updates in real time, reducing administrative workload and improving efficiency.',
      },
      {
        heading: 'Drive Business Growth',
        body: 'By automating routine tasks and improving engagement, a branded mobile app helps agencies operate more efficiently, deliver better service, and stay ahead of competitors.',
      },
      {
        heading: 'How Logezy Helps',
        body: "Logezy's branded mobile app solution empowers recruitment agencies to manage their workforce under their own brand. From shift management and timesheets to communication and onboarding, Logezy provides everything agencies need to build stronger relationships with their workforce.",
      },
    ],
    cta: {
      heading: 'Give your agency a competitive edge',
      body: "A branded mobile app is no longer optional. It is a competitive advantage that improves communication, enhances candidate experience, strengthens your brand, and helps your agency grow faster in a digital-first recruitment market.",
    },
  },
  {
    slug: 'reduce-agency-admin-smart-scheduling',
    title: 'How to Cut Agency Admin Time with Smart Scheduling Software',
    excerpt: 'Recruitment agencies lose dozens of hours every week to manual scheduling, chasing availability, and fixing rota errors. Here is how switching to smart scheduling software gives that time back.',
    category: 'Agency Tips',
    readTime: '5 min read',
    date: 'Jun 18, 2025',
    coverImage: '/blog/blog-agency-admin-time.webp',
    sections: [
      {
        body: "For most temp recruitment agencies, the admin never stops. Coordinating availability, building weekly rotas, chasing confirmations, fixing last-minute gaps. It all adds up. Many consultants spend more time on scheduling admin than they do on revenue-generating activity. The good news is that smart scheduling software can change that completely.",
      },
      {
        heading: 'The Hidden Cost of Manual Scheduling',
        body: "Manual scheduling is not just slow — it is expensive. When consultants build rotas in spreadsheets or communicate shifts by phone and email, errors are inevitable. Double bookings, unconfirmed shifts, and missed availability windows cost agencies real money through unfilled shifts and last-minute cover costs.\n\nBeyond financial impact, the repetitive nature of manual scheduling contributes to staff burnout within the agency itself. When your consultants are bogged down in admin, they cannot focus on building client relationships or growing the business.",
      },
      {
        heading: 'Availability Management in Real Time',
        body: "One of the biggest time drains in temp staffing is chasing workers for their availability. Phone calls, WhatsApp messages, and spreadsheet updates consume hours every week — and the information is often already out of date by the time it is collated.\n\nWith a digital availability management system, workers update their own availability directly from their phones. The moment a shift needs filling, the system instantly shows you who is free, qualified, and available — no chasing required.",
      },
      {
        heading: 'Automated Shift Notifications',
        body: "Once you have identified available workers, the next bottleneck is notifying them. Sending individual messages or making calls one by one is neither scalable nor reliable.\n\nSmart scheduling software sends automated shift notifications to multiple workers simultaneously. Workers can accept or decline in one tap, and the system tracks responses in real time. Your consultants see exactly where each shift stands without lifting the phone.",
      },
      {
        heading: 'Compliance Built Into the Workflow',
        body: "In healthcare and education staffing, compliance is not optional — it is essential. Yet many agencies still manage DBS certificates, right-to-work documents, and professional registrations in separate spreadsheets or filing systems.\n\nWhen compliance tracking is built directly into your scheduling software, the system prevents workers with expired documents from being placed on shifts. Automated alerts notify both the worker and your team before a document expires, keeping your agency audit-ready without the manual effort.",
      },
      {
        heading: 'From Timesheet to Invoice Without the Paperwork',
        body: "The end of each shift should be the beginning of a fast, accurate payment cycle. But when timesheets are paper-based or submitted via email, the approval and invoicing process can take days — or longer.\n\nDigital timesheets submitted via mobile, approved with a single click, and automatically fed into invoicing cut the time from shift completion to invoice generation from days to minutes. That means faster cash flow for your agency and a better experience for workers and clients alike.",
      },
      {
        heading: 'What Smart Scheduling Looks Like in Practice',
        body: "Consider a healthcare staffing agency covering a busy weekend. On Friday afternoon, three nurses cancel. Without smart software, a consultant spends the next hour calling through a list of workers, waiting for callbacks, and hoping the shifts get filled in time.\n\nWith smart scheduling software, the same situation is resolved in minutes. Available, qualified nurses are identified instantly. Notifications go out automatically. Workers confirm in a tap. The shifts are filled before the consultant has finished their coffee.",
      },
    ],
    cta: {
      heading: 'See how much admin time Logezy can save your agency',
      body: "Logezy brings scheduling, availability, compliance, timesheets, and communication into one connected platform, so your team spends less time on admin and more time growing the business. Book a free demo and see the difference.",
    },
  },
  {
    slug: 'workforce-management-software-guide',
    title: 'Workforce Management Software: The Complete Guide to Improving Productivity, Compliance & Employee Scheduling in 2026',
    seoTitle: 'Workforce Management Software: 2026 Guide',
    seoDescription: 'Discover how workforce management software improves employee scheduling, digital timesheets, attendance tracking, payroll integration and workforce compliance.',
    excerpt: 'Workforce management has never been more complex. This complete guide explains what workforce management software is, the challenges it solves, the key features to look for, and how businesses use it to improve productivity, compliance, and employee scheduling.',
    category: 'Workforce',
    readTime: '9 min read',
    date: 'Jul 03, 2026',
    author: 'Logezy Team',
    tags: [
      'Workforce Management Software',
      'Employee Scheduling Software',
      'Digital Timesheets',
      'Attendance Tracking',
      'Payroll Integration',
      'Workforce Compliance',
      'Workforce Automation',
      'Temporary Recruitment Software',
    ],
    coverImage: '/blog/workforce-management-software-guide.png',
    coverImageAlt: 'Workforce management software illustration showing employee scheduling, digital timesheets, attendance tracking and compliance tools in one platform',
    coverImageWidth: 512,
    coverImageHeight: 512,
    sections: [
      {
        id: 'introduction',
        heading: 'Introduction',
        body: "Today's businesses face increasing pressure to manage larger workforces while maintaining productivity, controlling labour costs, and ensuring compliance with ever-changing employment regulations. Whether you run a recruitment agency, healthcare provider, hospitality business, security company, cleaning contractor, or facilities management organisation, workforce management has become more complex than ever before.\n\nTraditional methods such as spreadsheets, paper timesheets, manual workforce scheduling, and disconnected communication channels create unnecessary delays, payroll errors, staffing shortages, compliance risks, and administrative overload. These challenges not only affect business performance but also reduce employee satisfaction and customer service quality.\n\nThis is where workforce management software makes a difference. Modern staff management software automates everyday operational tasks, giving managers complete visibility over their workforce while helping employees stay connected through mobile technology. From intelligent employee scheduling software and attendance tracking to payroll integration and workforce compliance monitoring, the right platform enables businesses to work smarter — not harder.\n\nIn this guide, we explore what workforce management software is, the challenges it solves, its key [features](/features), and why businesses are increasingly adopting workforce automation to improve efficiency and support long-term growth.",
      },
      {
        id: 'why-workforce-management-is-challenging',
        heading: 'Why Workforce Management Has Become More Challenging',
        body: 'Managing employees today involves far more than simply assigning shifts. Organisations must coordinate multiple locations, monitor attendance, track working hours, comply with employment regulations such as the [UK Working Time Regulations](https://www.gov.uk/maximum-weekly-working-hours), communicate with employees in real time, and process accurate payroll — all while meeting customer expectations.\n\nMany businesses still rely on manual processes that consume valuable management time and increase the likelihood of human error. Common workforce management challenges include:',
        list: {
          type: 'ul',
          items: [
            'Staff shortages and last-minute shift changes',
            'Scheduling conflicts and double bookings',
            'Payroll inaccuracies caused by manual data entry',
            'Poor communication between managers and employees',
            'Workforce compliance risks and missing documentation',
            'Employee burnout and low engagement',
            'High administrative workload for managers',
            'Low workforce visibility across sites and clients',
            'Rising labour costs and uncontrolled overtime',
          ],
        },
      },
      {
        body: 'Without the right systems in place, these issues can quickly affect productivity, profitability, and employee retention.',
      },
      {
        id: 'what-is-workforce-management-software',
        heading: 'What Is Workforce Management Software?',
        body: 'Workforce management software (WFM) is a digital platform designed to simplify how businesses manage their employees throughout the entire workforce lifecycle.\n\nInstead of juggling multiple spreadsheets, paper records, and separate software tools, organisations can manage workforce scheduling, attendance tracking, digital timesheets, leave requests, compliance, payroll, communication, and reporting from a single platform.\n\nBy automating repetitive administrative tasks, workforce management software enables managers to spend less time on paperwork and more time focusing on business growth and customer service. For staffing agencies, this same technology is often called temporary recruitment software, because it also covers candidate onboarding, shift booking, and client invoicing. Learn more about how Logezy approaches this on our [About page](/about).',
      },
      {
        id: 'key-features',
        heading: 'Key Features Every Workforce Management Software Should Include',
        body: 'Not all staff management software is created equal. These are the core capabilities to look for when comparing platforms.',
      },
      {
        id: 'smart-employee-scheduling',
        heading: '1. Smart Employee Scheduling',
        level: 3,
        body: 'Creating employee schedules manually often results in double bookings, unfilled shifts, overtime costs, and employee dissatisfaction.\n\nModern [employee scheduling software](/product/scheduling) automates workforce scheduling by matching employees based on availability, qualifications, skills, and business requirements. Managers can publish schedules instantly while employees receive real-time updates through mobile apps.',
      },
      {
        id: 'attendance-time-tracking',
        heading: '2. Attendance and Time Tracking',
        level: 3,
        body: 'Accurate attendance records are essential for payroll, compliance, and productivity.\n\nDigital attendance tracking enables businesses to monitor employee clock-ins, working hours, breaks, overtime, and shift completion without relying on paper records. GPS-verified clock-in and clock-out adds a further layer of confidence for remote and multi-site teams.\n\nThis improves payroll accuracy while reducing time theft and administrative effort.',
      },
      {
        id: 'digital-timesheets',
        heading: '3. Digital Timesheets',
        level: 3,
        body: 'Paper timesheets are prone to mistakes, delays, and missing information.\n\n[Digital timesheets](/product/timesheets) allow employees to submit working hours electronically, enabling managers to approve records quickly and prepare payroll with greater accuracy. The result is faster processing, fewer disputes, and reduced payroll errors.',
      },
      {
        id: 'compliance-management',
        heading: '4. Workforce Compliance Management',
        level: 3,
        body: "Businesses operating in regulated industries must ensure employees remain compliant with licensing, training, working time limits, and [right-to-work documentation](https://www.gov.uk/check-job-applicant-right-to-work).\n\nAutomated [workforce compliance monitoring](/product/compliance) helps businesses maintain accurate employee records, receive alerts before documents expire, and stay audit-ready — reducing legal and financial risks.",
      },
      {
        id: 'mobile-workforce-management',
        heading: '5. Mobile Workforce Management',
        level: 3,
        body: "Today's workforce expects mobile access. With a [branded mobile app](/product/mobile-app), employees should be able to:",
        list: {
          type: 'ul',
          items: [
            'View schedules and upcoming shifts',
            'Accept or decline shifts in one tap',
            'Update their availability in real time',
            'Submit digital timesheets from their phone',
            'Receive instant notifications and reminders',
            'Access important documents securely',
          ],
        },
      },
      {
        body: 'A mobile-first workforce creates better communication while reducing missed shifts and administrative queries.',
      },
      {
        id: 'payroll-integration',
        heading: '6. Payroll Integration',
        level: 3,
        body: 'Payroll preparation often consumes significant administrative time.\n\nPayroll integration connects workforce management software with your payroll and [invoicing](/product/invoicing) systems, automating calculations based on approved digital timesheets and attendance records. This reduces manual data entry, improves accuracy, and speeds up payroll processing for both employees and clients.',
      },
      {
        id: 'reporting-analytics',
        heading: '7. Real-Time Reporting and Analytics',
        level: 3,
        body: 'Modern workforce management platforms provide valuable business insights through dashboards and reports. Managers can monitor:',
        list: {
          type: 'ul',
          items: [
            'Labour costs and budget performance',
            'Employee attendance and punctuality',
            'Shift coverage and fill rates',
            'Overtime and working-hour trends',
            'Productivity across teams and locations',
            'Workforce compliance status at a glance',
          ],
        },
      },
      {
        body: 'These insights support faster decision-making and continuous operational improvement.',
      },
      {
        id: 'manual-vs-automated',
        heading: 'Manual Processes vs Workforce Automation: A Comparison',
        body: 'The difference between manual workforce management and workforce automation becomes clear when you compare everyday tasks side by side:',
        table: {
          caption: 'Manual workforce management compared with workforce management software',
          headers: ['Task', 'Manual Process', 'With Workforce Management Software'],
          rows: [
            ['Shift scheduling', 'Hours in spreadsheets, frequent double bookings', 'Automated shift matching in minutes'],
            ['Timesheets', 'Paper forms chased at the end of each week', 'Digital timesheets submitted and approved in one click'],
            ['Attendance tracking', 'Sign-in sheets with time theft risk', 'GPS-verified mobile clock-in and clock-out'],
            ['Compliance', 'Certificates stored in separate files, expiries missed', 'Automated alerts and audit-ready records'],
            ['Payroll', 'Manual data entry with recurring errors', 'Payroll integration from approved hours'],
            ['Communication', 'Individual calls, texts, and voicemails', 'Instant push notifications to the right workers'],
          ],
        },
      },
      {
        id: 'industries',
        heading: 'Industries That Benefit from Workforce Management Software',
        body: 'Although every business manages employees differently, workforce management software provides value across multiple industries.\n\nRecruitment agencies use temporary recruitment software to schedule temporary workers, manage placements, communicate with candidates, and streamline payroll. [Healthcare organisations](/industries/healthcare) rely on workforce management software to coordinate nurses, carers, agency staff, and healthcare professionals while maintaining strict compliance. Hospitality businesses use digital workforce scheduling to manage seasonal demand, while security companies, cleaning contractors, facilities management providers, logistics businesses, and construction firms all benefit from better workforce visibility and automated scheduling.',
        table: {
          caption: 'How different industries use workforce management software',
          headers: ['Industry', 'Primary use case'],
          rows: [
            ['Recruitment agencies', 'Temporary worker scheduling, placements, and client invoicing'],
            ['Healthcare & care providers', 'Compliant staffing for nurses, carers, and agency professionals'],
            ['Hospitality', 'Flexible rotas that respond to seasonal demand'],
            ['Security & cleaning', 'Multi-site shift coverage with GPS-verified attendance'],
            ['Facilities & logistics', 'Workforce visibility across locations and contracts'],
          ],
        },
      },
      {
        id: 'benefits',
        heading: 'Benefits of Workforce Management Software',
        body: 'Businesses investing in staff management software often experience measurable improvements across operations. Key benefits include:',
        list: {
          type: 'ul',
          items: [
            'Increased productivity and faster staff scheduling',
            'Reduced administrative workload for managers',
            'Improved employee engagement and retention',
            'Better workforce visibility across sites',
            'Accurate payroll processing through payroll integration',
            'Stronger workforce compliance management',
            'Lower labour costs and reduced overtime',
            'Fewer scheduling errors and unfilled shifts',
            'Enhanced customer service quality',
          ],
        },
      },
      {
        body: 'Most importantly, managers gain more time to focus on strategic growth instead of repetitive administrative tasks. Employment bodies such as [ACAS](https://www.acas.org.uk/) consistently highlight fair, predictable scheduling and accurate pay as key drivers of employee wellbeing — outcomes that good workforce management software directly supports.',
      },
      {
        id: 'how-to-choose',
        heading: 'How to Choose the Right Workforce Management Software',
        body: 'With so many platforms available, a structured evaluation helps you find the right fit. Follow these steps:',
        list: {
          type: 'ol',
          items: [
            'Map your current workflow — list where time is lost across scheduling, timesheets, attendance tracking, compliance, and payroll.',
            'Prioritise must-have features — for most agencies this means employee scheduling software, digital timesheets, and workforce compliance tools in one platform.',
            'Check mobile capability — your workers should be able to manage shifts, availability, and documents from a branded mobile app.',
            'Confirm payroll integration — approved hours should flow straight into payroll and invoicing without re-keying.',
            'Review reporting — make sure dashboards cover labour costs, fill rates, and compliance status.',
            'Compare pricing models — look for transparent, scalable pricing that grows with your workforce. See our [pricing](/pricing) for an example.',
            'Book a demo — test the platform against your real scenarios before committing. You can [contact our team](/contact) to arrange one.',
          ],
        },
      },
      {
        id: 'how-logezy-helps',
        heading: 'How Logezy Simplifies Workforce Management',
        body: "Logezy provides an all-in-one workforce management platform designed for businesses managing temporary, remote, mobile, and distributed workforces.\n\nWith intelligent [employee scheduling](/product/scheduling), [digital timesheets](/product/timesheets), attendance tracking, [compliance monitoring](/product/compliance), payroll integration, [branded mobile apps](/product/mobile-app), employee self-service, real-time communication, and powerful reporting tools, Logezy helps organisations simplify workforce operations from a single platform.\n\nWhether you're managing hundreds of temporary workers or multiple client locations, Logezy provides the visibility and workforce automation needed to improve efficiency while delivering a better experience for managers, employees, and clients alike. Explore the full [feature list](/features) or view [pricing](/pricing) to get started.",
      },
    ],
    faqs: [
      {
        question: 'What is workforce management software?',
        answer: 'Workforce management software is a digital platform that helps businesses plan, schedule, and monitor their workforce. It typically combines employee scheduling, attendance tracking, digital timesheets, compliance management, payroll integration, and reporting in one system.',
      },
      {
        question: 'How does employee scheduling software reduce costs?',
        answer: 'Employee scheduling software matches the right workers to the right shifts automatically, preventing double bookings, unfilled shifts, and unnecessary overtime. Fewer scheduling errors mean lower agency cover costs and less time spent on manual rota building.',
      },
      {
        question: 'What are digital timesheets and why do they matter?',
        answer: 'Digital timesheets let employees submit their working hours electronically, usually from a mobile app. Managers approve them in one click, and the approved hours flow directly into payroll — reducing errors, disputes, and processing time compared with paper timesheets.',
      },
      {
        question: 'Can workforce management software help with compliance?',
        answer: 'Yes. Workforce compliance features track right-to-work documents, DBS checks, training certificates, and professional registrations. The system alerts you before documents expire and can prevent non-compliant workers from being scheduled, keeping your business audit-ready.',
      },
      {
        question: 'Does workforce management software integrate with payroll?',
        answer: 'Most modern platforms offer payroll integration. Approved timesheet and attendance data flows automatically into payroll and invoicing, removing manual data entry and significantly improving pay accuracy and speed.',
      },
      {
        question: 'Is workforce management software suitable for small agencies?',
        answer: 'Yes. Small and growing agencies often see the biggest gains because workforce automation removes admin work that would otherwise require extra staff. Look for scalable pricing so the platform grows with your workforce.',
      },
      {
        question: 'What is the difference between workforce management software and temporary recruitment software?',
        answer: 'Temporary recruitment software is workforce management software tailored to staffing agencies. In addition to scheduling, timesheets, and compliance, it covers candidate onboarding, shift booking across multiple clients, and client invoicing.',
      },
      {
        question: 'How does attendance tracking work in modern platforms?',
        answer: 'Employees clock in and out from a mobile app, often with GPS verification to confirm they are at the correct site. The system records working hours, breaks, and overtime automatically, feeding accurate data into timesheets and payroll.',
      },
      {
        question: 'How long does it take to implement workforce management software?',
        answer: 'Implementation time varies by workforce size, but cloud-based platforms like Logezy can typically be set up in days rather than months. Data import, branding, and training are usually handled by the provider during onboarding.',
      },
      {
        question: 'How much does workforce management software cost?',
        answer: 'Pricing usually depends on the number of active workers and the features you need. Logezy offers transparent, scalable plans — see the pricing page or book a free demo for a quote tailored to your agency.',
      },
    ],
    cta: {
      heading: 'Ready to modernise your workforce management?',
      body: 'Logezy brings employee scheduling, digital timesheets, attendance tracking, workforce compliance, and payroll integration into one connected platform built for UK staffing agencies and workforce-driven businesses. Book a free demo and see how much time your team could save.',
    },
  },
];
