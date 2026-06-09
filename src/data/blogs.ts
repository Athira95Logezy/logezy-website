export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  coverImage: string;
  sections: {
    heading?: string;
    body: string;
  }[];
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
    date: 'May 2025',
    coverImage: '/nurse.png',
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
      body: "Healthcare staffing challenges continue to evolve, but the right technology can make workforce management simpler and more efficient. With Logezy, healthcare providers can confidently manage their workforce and focus on what matters most — exceptional patient care.",
    },
  },
  {
    slug: 'branded-mobile-app-recruitment',
    title: 'Why Your Recruitment Agency Needs a Branded Mobile App',
    excerpt: 'A branded mobile app is no longer a nice-to-have — it is a competitive advantage. Improve communication, enhance candidate experience, and strengthen your brand in a digital-first recruitment market.',
    category: 'Technology',
    readTime: '3 min read',
    date: 'May 2025',
    coverImage: '/mobile_app_main_screen.jpeg',
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
      body: "A branded mobile app is no longer a nice-to-have — it's a competitive advantage. It improves communication, enhances candidate experience, strengthens your brand, and helps your agency grow faster in a digital-first recruitment market.",
    },
  },
  {
    slug: 'reduce-agency-admin-smart-scheduling',
    title: 'How to Cut Agency Admin Time with Smart Scheduling Software',
    excerpt: 'Recruitment agencies lose dozens of hours every week to manual scheduling, chasing availability, and fixing rota errors. Here is how switching to smart scheduling software gives that time back.',
    category: 'Agency Tips',
    readTime: '5 min read',
    date: 'June 2025',
    coverImage: '/schedule.png',
    sections: [
      {
        body: "For most temp recruitment agencies, the admin never stops. Coordinating availability, building weekly rotas, chasing confirmations, fixing last-minute gaps — it all adds up. Many consultants spend more time on scheduling admin than they do on revenue-generating activity. The good news is that smart scheduling software can change that completely.",
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
      body: "Logezy brings scheduling, availability, compliance, timesheets, and communication into one connected platform — so your team spends less time on admin and more time growing the business. Book a free demo and see the difference.",
    },
  },
];
