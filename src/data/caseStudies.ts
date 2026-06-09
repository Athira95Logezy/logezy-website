export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  coverImage: string;
  pdfFile: string;              // path in /public/resources/
  excerpt: string;
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
    coverImage: '/DASHBAORD_NEW.png',
    pdfFile: '/resources/logezy-guide-staffing-agency.pdf',
    excerpt: 'Everything you need to run a high-performing staffing agency — from building your candidate database and managing compliance, to automating schedules, timesheets and invoicing with Logezy.',
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
        body: 'The most successful staffing agencies share three core operational capabilities. First, a large, well-maintained candidate database with up-to-date skills, qualifications and availability data. Second, the ability to quickly meet client needs at short notice — if you cannot fill a shift fast, clients will go to a competitor. Third, efficient schedule management that avoids errors, double bookings and gaps.',
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
];
