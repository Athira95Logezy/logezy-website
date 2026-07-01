import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Envelope, Phone, MapPin, ShieldCheck } from '@phosphor-icons/react';
import SEO from '../components/SEO';

/* ─────────────────────────────────────────────
   CONTENT
───────────────────────────────────────────── */
type Block =
  | { type: 'p'; text: React.ReactNode }
  | { type: 'list'; items: string[] };

type Section = {
  heading: string;
  blocks: Block[];
};

const intro: string[] = [
  "At www.logezy.com, accessible from www.logezy.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by www.logezy.com and how we use it.",
  "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect on www.logezy.com. This policy is not applicable to any information collected offline or via channels other than this website.",
];

const sections: Section[] = [
  {
    heading: 'Consent',
    blocks: [
      { type: 'p', text: 'By using our website, you hereby consent to our Privacy Policy and agree to its terms.' },
    ],
  },
  {
    heading: 'Information We Collect',
    blocks: [
      { type: 'p', text: 'The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.' },
      { type: 'p', text: 'If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.' },
      { type: 'p', text: 'When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.' },
    ],
  },
  {
    heading: 'How We Use Your Information',
    blocks: [
      { type: 'p', text: 'We use the information we collect in various ways, including to:' },
      {
        type: 'list',
        items: [
          'Provide, operate, and maintain our website',
          'Improve, personalize, and expand our website',
          'Understand and analyze how you use our website',
          'Develop new products, services, features, and functionality',
          'Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes',
          'Send you emails',
          'Find and prevent fraud',
        ],
      },
    ],
  },
  {
    heading: 'Log Files',
    blocks: [
      { type: 'p', text: "www.logezy.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information." },
    ],
  },
  {
    heading: 'Cookies and Web Beacons',
    blocks: [
      { type: 'p', text: "Like any other website, www.logezy.com uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information." },
    ],
  },
  {
    heading: 'Advertising Partners Privacy Policies',
    blocks: [
      { type: 'p', text: 'You may consult this list to find the Privacy Policy for each of the advertising partners of www.logezy.com.' },
      { type: 'p', text: "Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on www.logezy.com, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit." },
      { type: 'p', text: 'Note that www.logezy.com has no access to or control over these cookies that are used by third-party advertisers.' },
    ],
  },
  {
    heading: 'Third-Party Privacy Policies',
    blocks: [
      { type: 'p', text: "www.logezy.com's Privacy Policy does not apply to other advertisers or websites. Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt out of certain options." },
      { type: 'p', text: 'You can choose to disable cookies through your individual browser options. To find more detailed information about cookie management with specific web browsers, it can be found on the browsers\' respective websites.' },
    ],
  },
  {
    heading: 'CCPA Privacy Rights (Do Not Sell My Personal Information)',
    blocks: [
      { type: 'p', text: 'Under the CCPA, among other rights, California consumers have the right to:' },
      {
        type: 'list',
        items: [
          "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
          "Request that a business delete any personal data about the consumer that a business has collected.",
          "Request that a business that sells a consumer's personal data, not sell the consumer's personal data.",
        ],
      },
      {
        type: 'p',
        text: (
          <>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these
            rights, please <Link to="/contact" className="text-[#2396C6] font-medium hover:underline">contact us</Link>.
          </>
        ),
      },
    ],
  },
  {
    heading: 'GDPR Data Protection Rights',
    blocks: [
      { type: 'p', text: 'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:' },
      {
        type: 'list',
        items: [
          'The right to access — You have the right to request copies of your personal data. We may charge you a small fee for this service.',
          'The right to rectification — You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete information you believe is incomplete.',
          'The right to erasure — You have the right to request that we erase your personal data, under certain conditions.',
          'The right to restrict processing — You have the right to request that we restrict the processing of your personal data, under certain conditions.',
          'The right to object to processing — You have the right to object to our processing of your personal data, under certain conditions.',
          'The right to data portability — You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
        ],
      },
      {
        type: 'p',
        text: (
          <>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these
            rights, please <Link to="/contact" className="text-[#2396C6] font-medium hover:underline">contact us</Link>.
          </>
        ),
      },
    ],
  },
  {
    heading: "Children's Information",
    blocks: [
      { type: 'p', text: 'Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.' },
      { type: 'p', text: 'www.logezy.com does not knowingly collect any personally identifiable information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best to promptly remove such information from our records.' },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function PrivacyPolicy() {
  return (
    <main>
      <SEO
        title="Privacy Policy"
        description="Read the Logezy Ltd Privacy Policy to understand what information we collect from visitors to www.logezy.com, how we use it, and your data protection rights."
        canonical="/privacy-policy"
        breadcrumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]}
      />

      {/* ── Header ── */}
      <section
        className="pt-28 pb-14 lg:pt-36 lg:pb-16"
        style={{ background: 'linear-gradient(135deg,#0C1640 0%,#183765 60%,#2396C6 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp()} className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
            <ShieldCheck weight="fill" className="h-4 w-4 text-white" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">Your privacy matters to us</span>
          </motion.div>
          <motion.h1 {...fadeUp(0.05)} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="text-white/70 text-sm">
            Last updated: 1 July 2026
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <motion.div {...fadeUp()} className="mb-10 space-y-4">
            {intro.map((text, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">{text}</p>
            ))}
            <p className="text-slate-600 leading-relaxed">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate
              to <Link to="/contact" className="text-[#2396C6] font-medium hover:underline">contact us</Link>.
            </p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div key={section.heading} {...fadeUp(Math.min(i * 0.03, 0.2))}>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0C1640] mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.blocks.map((block, bi) =>
                    block.type === 'p' ? (
                      <p key={bi} className="text-slate-600 leading-relaxed">{block.text}</p>
                    ) : (
                      <ul key={bi} className="space-y-2.5 pl-1">
                        {block.items.map((item, ii) => (
                          <li key={ii} className="flex gap-3 text-slate-600 leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2396C6] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Contact ── */}
          <motion.div
            {...fadeUp()}
            className="mt-14 rounded-2xl border border-blue-100 p-6 sm:p-8"
            style={{ background: 'linear-gradient(135deg,#f4f8ff 0%,#eef6fb 100%)' }}
          >
            <h2 className="text-xl font-bold text-[#0C1640] mb-2">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              If you have any questions about this Privacy Policy or would like to exercise any of your data
              protection rights, get in touch with us.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="mailto:info@logezy.co.uk" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2396C6, #183765)' }}>
                  <Envelope weight="regular" className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-[#2396C6] transition-colors">
                  info@logezy.co.uk
                </span>
              </a>
              <a href="tel:03301279604" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2396C6, #183765)' }}>
                  <Phone weight="regular" className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-[#2396C6] transition-colors">
                  0330 127 9604
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2396C6, #183765)' }}>
                  <MapPin weight="regular" className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Office 108, The Old Courthouse, 18-22 St Peter's Churchyard, Derby DE1 1NN
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
