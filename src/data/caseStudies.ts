export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  coverImage: string;
  excerpt: string;
  /** Client branding shown on the case study page */
  client?: { name: string; logo: string; website: string };
  stats: { value: string; label: string }[];
  challenge: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  quote?: { text: string; author: string };
  features: { icon: string; title: string; body: string }[];
  conclusion: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'guide-operating-successful-staffing-agency',
    title: 'The Logezy Guide for Operating a Successful Staffing Agency',
    subtitle: 'A complete operational playbook for UK temp recruitment agencies',
    category: 'Agency Guide',
    readTime: '8 min read',
    date: 'June 2025',
    coverImage: '/resources/logezy-eBook_img.webp',
    excerpt: 'Everything you need to run a high-performing staffing agency, from building your candidate database and managing compliance, to automating schedules, timesheets and invoicing with Logezy.',
    stats: [
      { value: '60%', label: 'Less admin time' },
      { value: '24/7', label: 'Real-time visibility' },
      { value: '100%', label: 'Compliance tracking' },
      { value: '3×', label: 'Faster shift filling' },
    ],
    challenge: 'Staffing agencies face a unique set of daily operational challenges: maintaining large candidate databases, ensuring compliance and right-to-work checks, managing shift schedules across multiple clients, processing timesheets accurately, and keeping workers informed in real time. Without the right tools, these tasks consume hours of admin time every day and leave agencies vulnerable to errors, compliance gaps, and unhappy clients.',
    sections: [
      {
        heading: 'What Is a Staffing Agency?',
        body: 'Staffing agencies recruit candidates and place them with organisations who need permanent or temporary staff. The candidates remain on the payroll of the staffing agency while being deployed to client organisations. The agency charges the client a margin over what they pay the candidate, making efficient workforce management critical to profitability.',
      },
      {
        heading: 'Key Challenges in Daily Operations',
        body: 'Running a staffing agency involves a complex web of daily tasks that are difficult to manage without purpose-built software.',
        bullets: [
          'Maintaining and updating a large employee database',
          'Quick retrieval of candidate information',
          'Deploying the right employee to the right client at short notice',
          'Managing schedules, shifts and timesheets accurately',
          'Ensuring compliance and document verification',
          'Effective workforce utilisation across multiple clients',
          'Accurate and timely payroll processing',
          'Instant communication with workers at scale',
        ],
      },
      {
        heading: 'Business Objectives Every Agency Must Hit',
        body: 'The most successful staffing agencies share three core operational capabilities. First, a large, well-maintained candidate database with up-to-date skills, qualifications and availability data. Second, the ability to quickly meet client needs at short notice. If you cannot fill a shift fast, clients will go to a competitor. Third, efficient schedule management that avoids errors, double bookings and gaps.',
      },
      {
        heading: 'Compliance and Documentation',
        body: 'It is the legal responsibility of every staffing agency to ensure candidates meet compliance and right-to-work regulations. Obtaining, checking and storing correct documents is mandatory under UK government regulations. Documents must be kept for a specified period even after a worker has left the organisation. Managing this manually across hundreds of workers is high-risk.',
      },
      {
        heading: 'How Logezy Solves These Challenges',
        body: 'Logezy Staff Management Software is an all-in-one platform built specifically for temporary staffing agencies. It replaces spreadsheets, paper files, and disconnected tools with a single connected system covering every part of your operation.',
      },
    ],
    quote: {
      text: 'The best part of Logezy Staff Management Software is that it automates manual tasks enabling you to focus on business development and growth.',
      author: 'A Happy Customer',
    },
    features: [
      { icon: 'database',    title: 'Employee Database',          body: 'Maintain a centralised, searchable database of all candidates including skills, qualifications, availability and compliance status.' },
      { icon: 'calendar',    title: 'Scheduling & Timesheets',    body: 'Drag-and-drop shift scheduling with automated timesheets. Track start, end, break and total hours per worker per week.' },
      { icon: 'shield',      title: 'Compliance & RTW Checks',    body: 'Record, track and manage all candidate compliance requirements including right-to-work. Automatic alerts for expiring documents.' },
      { icon: 'phone',       title: 'Candidate Mobile App',       body: 'iOS and Android app for workers to view shifts, accept bookings, submit availability, upload documents and digitally sign timesheets.' },
      { icon: 'receipt',     title: 'Automated Invoicing',        body: 'Generate and manage client invoices automatically on timesheet approval. Billing could not be simpler.' },
      { icon: 'chart',       title: 'Reports & Insights',         body: 'Payroll, staff, client, invoice and document reports for fast managerial decisions. Rate cards for both client and staff rates.' },
      { icon: 'lock',        title: 'Data Security',              body: 'All data is stored on trusted cloud servers. No on-premises servers required. Fully GDPR-compliant data management.' },
      { icon: 'money',       title: 'Affordable Pricing',         body: 'Flexible pricing based on the number of workers in your organisation. No large upfront costs.' },
    ],
    conclusion: 'Logezy Staff Management Software is a feature-rich, flexible platform that enables staffing agencies to operate with confidence and efficiency. Its modern interface, 24/7 support, and automation-first approach means your team spends less time on admin and more time growing the business.',
  },
  {
    slug: 'sarga-healthcare-staffing-compliance',
    title: 'How Logezy Streamlined Staffing, Shifts and Compliance for Sarga Healthcare',
    subtitle: 'A growing UK domiciliary care agency brings rostering and compliance together in one platform',
    category: 'Client Story',
    readTime: '3 min read',
    date: 'June 2026',
    coverImage: '/nurse.webp',
    client: {
      name: 'Sarga Healthcare Ltd',
      logo: '/clients/sarga-healthcare-logo.png',
      website: 'https://sargahealthcare.co.uk/',
    },
    excerpt: 'Sarga Healthcare Ltd was managing scheduling, shift allocation and compliance across multiple manual processes. With Logezy, the agency brought staff management, rostering and compliance tracking into a single system — saving admin time and improving efficiency across the business.',
    stats: [
      { value: '5/5', label: 'Client feedback rating' },
      { value: 'All-in-one', label: 'Staffing, shifts & compliance' },
      { value: 'DBS · RTW', label: 'Documents tracked automatically' },
      { value: 'UK', label: 'Domiciliary / home care' },
    ],
    challenge: 'Like many growing care agencies, Sarga Healthcare Ltd was managing staff scheduling, shift allocation and compliance tracking across multiple manual processes. As the agency scaled, keeping on top of day-to-day rostering while maintaining full compliance visibility — DBS checks, training records and right-to-work documentation — demanded increasing time and resource from the team.',
    sections: [
      {
        heading: 'The Solution',
        body: 'Sarga Healthcare Ltd adopted Logezy as their all-in-one workforce management platform, bringing staff management, shift scheduling and compliance tracking together in a single, easy-to-use system. Instead of juggling separate spreadsheets and manual records, the team now runs day-to-day rostering and compliance from one place.',
      },
      {
        heading: 'The Results',
        body: 'Since moving to Logezy, Sarga Healthcare has seen improvements across their daily operations:',
        bullets: [
          'Streamlined day-to-day operations across staffing, shifts and compliance',
          'Time saved on administrative and rostering tasks',
          'Improved overall efficiency across the agency',
          'Easier, more reliable compliance management',
        ],
      },
      {
        heading: 'Support That Stands Out',
        body: "Beyond the platform itself, Sarga Healthcare Ltd highlighted the exceptional support received from Logezy's customer and technical teams throughout their experience — from onboarding to day-to-day questions, help has been fast and reliable.",
      },
    ],
    quote: {
      text: "Logezy is an excellent staffing software! It's user friendly, reliable, and has streamlined our daily operations. Managing staff, shifts, and compliance has become much easier, saving us time and improving efficiency. Exceptional customer and technical team support. Highly recommended.",
      author: 'Sibi Thomas, Sarga Healthcare Ltd',
    },
    features: [
      { icon: 'calendar', title: 'Shift Scheduling',      body: 'Day-to-day rostering and shift allocation managed in one live view, with changes reaching carers instantly.' },
      { icon: 'shield',   title: 'Compliance Tracking',   body: 'DBS checks, training records and right-to-work documentation monitored automatically with expiry alerts.' },
      { icon: 'database', title: 'Staff Management',      body: 'Every carer\'s details, documents and availability in one centralised, searchable system.' },
      { icon: 'phone',    title: 'Candidate Mobile App',  body: 'Carers view shifts, update availability and submit timesheets from their phone, cutting calls to the office.' },
    ],
    conclusion: 'Sarga Healthcare Ltd is one of many UK care agencies using Logezy to simplify staffing, shifts and compliance. Want results like these for your agency? Book a 15-minute demo and see the platform in action. Client feedback submitted 29 June 2026 and published with consent.',
  },
  {
    slug: 'passion-in-care-workforce-management',
    title: 'How Passion in Care Ltd Runs Care Staffing with Logezy',
    subtitle: 'A UK care agency backed by a support team they can rely on',
    category: 'Client Story',
    readTime: '2 min read',
    date: 'August 2026',
    coverImage: '/nurse.webp',
    excerpt: 'Passion in Care Ltd, a UK care agency, uses Logezy to manage its workforce — and rates the experience five out of five, singling out the support team behind the platform.',
    stats: [
      { value: '5/5', label: 'Client feedback rating' },
      { value: '"Very supportive team"', label: 'In their words' },
      { value: 'Care', label: 'Sector' },
      { value: 'UK', label: 'Based in' },
    ],
    challenge: 'Care agencies operate in one of the most demanding staffing environments in the UK — coordinating carers across client homes, keeping compliance records current, and covering shifts reliably, all while delivering a high standard of care. Getting that right depends not only on the software an agency uses, but on the team standing behind it when questions come up.',
    sections: [
      {
        heading: 'The Solution',
        body: 'Passion in Care Ltd uses Logezy as their workforce management platform, bringing staff scheduling, compliance tracking, digital timesheets and communication together in one easy-to-use system built for care providers.',
      },
      {
        heading: 'Support That Stands Out',
        body: 'When asked about their experience, Passion in Care Ltd rated Logezy five out of five and highlighted one thing above all: the people behind the product. A responsive, hands-on support team means questions get answered quickly and the agency can stay focused on delivering care rather than wrestling with software.',
      },
    ],
    quote: {
      text: 'Very supportive team.',
      author: 'Derrick Kasadha, Passion in Care Ltd',
    },
    features: [
      { icon: 'calendar', title: 'Shift Scheduling',      body: 'Plan carer rotas and shift allocation in one live view, with changes reaching carers on their phones instantly.' },
      { icon: 'shield',   title: 'Compliance Tracking',   body: 'DBS checks, training records and right-to-work documentation monitored automatically with expiry alerts.' },
      { icon: 'phone',    title: 'Candidate Mobile App',  body: 'Carers view shifts, update availability and submit timesheets from their phone, cutting calls to the office.' },
      { icon: 'chart',    title: 'Dedicated Support',      body: 'A responsive UK customer and technical team on hand from onboarding through day-to-day use.' },
    ],
    conclusion: 'Passion in Care Ltd is one of many UK care agencies that rely on Logezy — and on the team behind it — to keep their workforce running smoothly. Want the same experience for your agency? Book a 15-minute demo and see the platform in action. Client feedback submitted 11 August 2026 and published with consent.',
  },
];
