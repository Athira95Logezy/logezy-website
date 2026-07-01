import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Envelope, Phone, MapPin, FileText } from '@phosphor-icons/react';
import SEO from '../components/SEO';

/* ─────────────────────────────────────────────
   CONTENT
───────────────────────────────────────────── */
type Block =
  | { type: 'p'; text: string }
  | { type: 'notice'; text: string }
  | { type: 'list'; items: string[] };

type Subsection = {
  heading: string;
  blocks: Block[];
};

type Section = {
  heading: string;
  intro?: Block[];
  subsections: Subsection[];
};

const intro: string[] = [
  'Welcome to www.logezy.com, this is the website for the SaaS online service of Logezy Ltd. Below is an explanation of the terms by which you may use our online Staff Management System, our mobile App services and software provided on or in connection with Logezy. By accessing or using the Service, or by clicking "I Agree," or otherwise affirming your intent to be bound by this Agreement, you signify that you have read, understood, and agree to be bound by the Terms included within this Terms of Use Agreement ("The Agreement") and to the collection and use of your information as set forth in the Logezy\'s Privacy Policy.',
  'Logezy reserves the right to make unilateral modifications/alterations to these terms and will provide notice of these changes as described below. Any new features that augment or enhance the current Logezy Version, shall be subject to this Agreement. This Agreement applies to all visitors, users, and others who access the Service, whether on behalf of a company or on their own as an individual ("Users").',
];

const introNotices: string[] = [
  'PLEASE READ THIS AGREEMENT CAREFULLY TO ENSURE THAT YOU UNDERSTAND EACH PROVISION.',
  "PLEASE ALSO NOTE THAT BY USING LOGEZY'S SERVICE YOU REPRESENT AND WARRANT UNDER PENALTY OF PERJURY THAT (I) YOU DO NOT WORK FOR A COMPETITOR OF THE COMPANY; AND (II) THAT YOU WILL NOT PROVIDE ANY INFORMATION GAINED FROM YOUR USE OF OR ACCESS TO THE SITE OR THE SERVICES TO A COMPETITOR OF THE COMPANY OR ITS SERVICE.",
];

const sections: Section[] = [
  {
    heading: 'Use of Logezy',
    subsections: [
      {
        heading: 'Eligibility',
        blocks: [
          { type: 'p', text: 'This is a contract between you and Logezy. You must read and agree to these terms before using the Service. If you do not agree, you may not use Logezy. You may use Logezy only if you can form a binding contract with Logezy and only in compliance with this Agreement and all applicable local, national, and international laws, rules and regulations.' },
          { type: 'p', text: "Any use or access to Logezy by anyone under 16 is strictly prohibited and in violation of this Agreement. Any use of or access to Logezy by anyone under 18 is only permitted with the express written permission of such an individual's legal guardian, and, if necessary, you represent and warrant that you have received such permission. The Service is not designed for use by or in connection with anyone under the age of 18, and you accept all responsibility that may arise from your use of the Service in connection with any minors. The Service is not available to any Users previously removed from the Service by Logezy." },
          { type: 'p', text: 'The Service is designed for use by employers and employees in the United Kingdom, except for those other countries expressly supported as reflected in the Service.' },
        ],
      },
      {
        heading: 'License',
        blocks: [
          { type: 'p', text: 'Subject to the terms and conditions of this Agreement, you are hereby granted a non-exclusive, limited, non-transferable, freely revocable license to use Logezy solely as permitted by the features of the Service, which may vary by User. Logezy reserves all rights not expressly granted herein in the Service and Logezy Content.' },
        ],
      },
      {
        heading: 'Your Logezy Account',
        blocks: [
          { type: 'p', text: 'Your Logezy account gives you access to the services and functionality that Logezy may establish and maintain at its sole discretion. We may maintain different types of accounts for different types of Users. If you open a Logezy account on behalf of yours or any other company, organization, charity or other entity, then (a) the "you", as defined above, includes you as well as that entity, and (b) you represent and warrant that you are an authorized representative of the entity, as you have held yourself out as such, with the authority to bind the entity to this Agreement, and that you agree to this Agreement on the entity\'s behalf. By connecting to Logezy with a third-party service, you give us permission to access and use your information from that service as permitted by that service, and to store your log-in credentials for that service.' },
          { type: 'p', text: 'You may never use another user\'s account within your account without permission. When creating and maintaining your account, you must provide accurate and complete information, and you must keep this information up to date. You are solely responsible for the activity that occurs on your account, and you must keep your account passwords secure. Logezy strongly encourages you and your organisation\'s users to use strong passwords (routinely defined as those that use a combination of upper and lower case letters, numbers and symbols) for your Logezy account. It is essential that you notify Logezy immediately of any breach of security or unauthorized use of your account. Logezy will not be liable for any losses caused by any unauthorized use of your account.' },
          { type: 'p', text: 'By providing Logezy with your email address and/or mobile number, you consent to Logezy using the email address and/or mobile number to send you Service-related notices, including any notices required by law, in lieu of communication by postal mail. Logezy may also use your email address and/or mobile number to send you other messages, such as changes to features of Logezy and special offers. If you do not want to receive such email messages, you may opt out. However, please be aware that opting out may prevent you from receiving email messages regarding updates, improvements, or offers.' },
        ],
      },
      {
        heading: 'Use of Service Rules and Restrictions',
        blocks: [
          { type: 'p', text: 'The following activities are prohibited and you agree not to engage in any of them:' },
          {
            type: 'list',
            items: [
              'Copying, distributing, or disclosing any part of Logezy in any medium, including without limitation by any automated or non-automated "scraping" unless explicitly agreed in writing by an authorised member of Logezy\'s Board.',
              'Using any automated system, including without limitation "robots," "spiders," "offline readers," etc., to access the Service in a manner that sends more request messages to Logezy\'s servers than a human can reasonably produce in the same period of time by using a conventional on-line web browser (except that Logezy grants the operators of public search engines revocable permission to use spiders to copy publicly available materials from www.logezy.com for the sole purpose of and solely to the extent necessary for creating publicly available searchable indices of the materials, but not caches or archives of such materials).',
              'Uploading, posting, hosting, or transmitting spam, chain letters, SMSs or other unsolicited email or messages.',
              'Attempting to interfere with, compromise the system integrity or security or decipher any transmissions to or from the servers running your Logezy account.',
              'Taking any action that imposes, or may impose at our sole discretion, an unreasonable or disproportionately large load on our infrastructure.',
              'Uploading invalid data, viruses, worms, or other software agents or any code of a destructive nature through your Logezy account.',
              'Collecting or harvesting any personally identifiable information, including account names, from the Logezy account.',
              'Using Logezy for any commercial solicitation purposes; impersonating another person or otherwise misrepresenting your affiliation with a person or entity, conducting fraud, hiding or attempting to hide your identity.',
              'Interfering with the proper working of your Logezy account.',
              'Accessing any content on the Logezy account through any technology or means other than those provided or authorized by Logezy.',
              'Bypassing the measures we may use to prevent or restrict access to your Logezy account, including without limitation features that prevent or restrict use or copying of any content or enforce limitations on use of Logezy or the content therein.',
              'Reproducing, duplicating, copying, selling, reselling or otherwise exploiting any portion of Logezy, use of Logezy, or access to Logezy without the express written permission by Logezy.',
              'Modifying, adapting or hacking the Logezy account or modifying another website so as to falsely imply that it is associated with Logezy, Logezy Limited, or any other Logezy service.',
            ],
          },
          { type: 'p', text: 'You are solely responsible for your interactions with other Logezy Users. We reserve the right, but have no obligation, to monitor disputes between you and other Users. We shall have no liability for your interactions with other Users, or for any User\'s action or inaction.' },
        ],
      },
      {
        heading: 'User Content',
        blocks: [
          { type: 'p', text: 'By providing Logezy with your email address and/or mobile number, you consent to Logezy using the email address and/or mobile number to send you Service-related notices, including any notices required by law, in lieu of communication by postal mail. Logezy may also use your email address and/or mobile number to send you other messages, such as changes to features of Logezy and special offers. If you do not want to receive such email messages, you may opt out. However, please be aware that opting out may prevent you from receiving email messages regarding updates, improvements, or offers.' },
        ],
      },
    ],
  },
  {
    heading: "Logezy's Mobile Apps",
    subsections: [
      {
        heading: 'Mobile Software',
        blocks: [
          { type: 'p', text: 'Logezy Limited may make available software to access Logezy via a mobile device ("Mobile App Software"). To use the Mobile App Software you must have a mobile device that is compatible with the Mobile App Software. Logezy does not warrant that the Mobile Apps will be compatible with your mobile device. You may use mobile data in connection with the Mobile App Software and may incur additional charges from your wireless provider for these services. You agree that you are solely responsible for any such charges. Logezy hereby grants you a non-exclusive, non-transferable, revocable license to use a compiled code copy of the Mobile App Software for one Logezy account on one mobile device owned or leased solely by you, and in accordance with the features made available to you.' },
          { type: 'p', text: 'You may not: (i) modify, disassemble, decompile or reverse engineer the Mobile App Software, except to the extent that such restriction is expressly prohibited by law; (ii) rent, lease, loan, resell, sublicense, distribute or otherwise transfer the Mobile App Software to any third party or use the Mobile App Software to provide time-sharing or similar services for any third party; (iii) make any copies of the Mobile App Software; (iv) remove, circumvent, disable, damage or otherwise interfere with security-related features of the Mobile App Software, features that prevent or restrict use or copying of any content accessible through the Mobile App Software, or features that enforce limitations on use of the Mobile App Software; or (v) delete the copyright and other proprietary rights notices on the Mobile App Software. You acknowledge that Logezy may from time to time issue upgraded versions of the Logezy Mobile App Software, and may automatically electronically upgrade the version of the Mobile App Software that you are using on your mobile device.' },
          { type: 'p', text: 'You consent to such automatic upgrading on your mobile device, and agree that the terms and conditions of this Agreement will apply to all such upgrades.' },
          { type: 'p', text: 'Any third-party code that may be incorporated in the Mobile App Software is covered by the applicable open source or third-party license EULA, if any, authorizing use of such code. The foregoing license grant is not a sale of the Mobile App Software or any copy thereof, and Logezy or its third-party partners or suppliers retain all right, title, and interest in the Mobile App Software (and any copy thereof). Any attempt by you to transfer any of the rights, duties or obligations hereunder, except as expressly provided for in this Agreement, is void.' },
          { type: 'p', text: 'Logezy reserves all rights not expressly granted under this Agreement.' },
        ],
      },
      {
        heading: 'Logezy Mobile Software provided from App Store by Apple',
        blocks: [
          { type: 'p', text: 'The following applies to any Mobile Software you acquire from the App Store ("App Store Sourced Logezy Software"): You acknowledge and agree that this Agreement is solely between you and Logezy, not Apple, and that Apple has no responsibility for the App Store Sourced Logezy Software or content thereof. Your use of the App Store Sourced Software must comply with the App Store Terms of Service. You acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App Store Sourced Logezy Software.' },
          { type: 'p', text: 'You acknowledge that Apple is not responsible for addressing any claims of you or any third party relating to the App Store Sourced Logezy Software or your possession and/or use of the App Store Sourced Logezy Software, including, but not limited to: (i) product liability claims; (ii) any claim that the App Store Sourced Logezy Software fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection or similar legislation; and all such claims are governed solely by this Agreement and any law applicable to Logezy as a provider of the software.' },
          { type: 'p', text: "You acknowledge that, in the event of any third-party claim that the App Store Sourced Logezy Software or your possession and use of that App Store Sourced Logezy Software infringe that third party's intellectual property rights, Logezy, not Apple, will be solely responsible for the investigation, defence, settlement and discharge of any such intellectual property infringement claim to the extent required by this Agreement. You and Logezy acknowledge and agree that Apple, and Apple's subsidiaries, are third-party beneficiaries of this Agreement as relates to your license of the App Store Sourced Logezy Software, and that, upon your acceptance of the terms and conditions of this Agreement, Apple will have the right (and will be deemed to have accepted the right) to enforce this Agreement as relates to your license of the App Store Sourced Logezy Software against you as a third party beneficiary thereof." },
        ],
      },
      {
        heading: 'Logezy Mobile App Software from Google Play Store',
        blocks: [
          { type: 'p', text: 'The following applies to any Mobile Software you acquire from the Google Play Store ("Google Sourced Logezy Software"): (i) you acknowledge that the Agreement is between you and Logezy only, and not with Google, Inc. ("Google"); (ii) your use of Google Sourced Logezy Software must comply with Google\'s then-current Google Play Store Terms of Service; (iii) Google is only a provider of the Google Play Store where you obtained the Google Sourced Logezy Software; (iv) Logezy, and not Google, is solely responsible for its Google-Sourced Logezy Software; (v) Google has no obligation or liability to you with respect to Google Sourced Logezy Software or the Agreement; and (vi) you acknowledge and agree that Google is a third party beneficiary to the Agreement as it relates to Logezy\'s Google Sourced Logezy Software.' },
        ],
      },
    ],
  },
  {
    heading: 'Proprietary Rights',
    subsections: [
      {
        heading: 'Proprietary Rights',
        blocks: [
          { type: 'p', text: 'Except for your User Content, the Service and all materials therein or transferred thereby, including, without limitation, software, images, text, graphics, illustrations, logos, patents, trademarks, service marks, copyrights, photographs, audio, videos, music, and User Content belonging to other Users ("Logezy\'s Content"), and all Intellectual Property Rights related thereto, are the exclusive property of Logezy and its licensors (including other Users who post User Content to the Service). Except as explicitly provided herein, nothing in this Agreement shall be deemed to create a license in or under any such Intellectual Property Rights, and you agree not to sell, license, rent, modify, distribute, copy, reproduce, transmit, publicly display, publicly perform, publish, adapt, edit or create derivative works from any Logezy\'s Content. Use of the Logezy\'s Content for any purpose not expressly permitted by this Agreement is strictly prohibited. You may choose to, or we may invite you to, submit comments or ideas about the Service, including without limitation about how to improve the Service or our products ("Ideas").' },
          { type: 'p', text: 'By submitting any Idea, you agree that your disclosure is gratuitous, unsolicited and without restriction and will not place Logezy under any fiduciary or other obligation, and that we are free to use the Idea without any additional compensation to you, and/or to disclose the Idea on a non-confidential basis or otherwise to anyone. You further acknowledge that, by acceptance of your submission, Logezy does not waive any rights to use similar or related ideas previously known to Logezy, or developed by its employees, or obtained from sources other than you. The Service contains data, information, and other content not owned by you, such as reputational or status indicators ("Logezy\'s Property").' },
          { type: 'p', text: "You understand and agree that regardless of terminology used, Logezy's Property represents a limited license right governed solely by the terms of this Agreement and available for distribution at Logezy's sole discretion. Logezy's Property is not redeemable for any sum of money or monetary value from Logezy at any time. You acknowledge that you do not own the account you use to access the Service, nor do you possess any rights of access or rights to data stored by or on behalf of Logezy on our servers, including without limitation any data representing or embodying any or all of your Logezy's Property." },
          { type: 'p', text: 'You agree that Logezy has the absolute right to manage, regulate, control, modify and/or eliminate Logezy\'s Property as it sees fit in its sole discretion, in any general or specific case, and that Logezy will have no liability to you based on its exercise of such right. All data on Logezy\'s servers are subject to deletion, alteration or transfer.' },
          { type: 'notice', text: 'Notwithstanding any value attributed to such data by you or any third party, you understand and agree that any data, account history and account content residing on our servers, may be deleted, altered, moved or transferred at any time for any reason in our sole discretion, with or without notice and with no liability of any kind. Logezy does not provide or guarantee, and expressly disclaims, any value, cash or otherwise, attributed to any data residing on our servers.' },
        ],
      },
    ],
  },
  {
    heading: 'Paid Services',
    subsections: [
      {
        heading: 'Billing Policies',
        blocks: [
          { type: 'p', text: 'Certain aspects of the Service may be provided for a fee or other charge. If you elect to use paid aspects of the Service, you agree to the pricing and payment terms which are agreed in the proposal.' },
        ],
      },
      {
        heading: "There Aren't Any Refunds",
        blocks: [
          { type: 'p', text: 'You may cancel your Logezy account at any time; however, there are no refunds for cancellation. The Service that is billed in advance on a monthly or annual basis is non-refundable. There will be no refunds or credits for partial months of service, upgrade/downgrade refunds, credit balances, or refunds for months unused with an open account. In order to treat everyone equally, no exceptions will be made. In the event that Logezy suspends or terminates your account or this Agreement, you understand and agree that you shall receive no refund or exchange for any Logezy\'s Property, any unused time on a subscription, any license or subscription fees for any portion of the Service, any content or data associated with your account, or for anything else.' },
        ],
      },
      {
        heading: 'Payments',
        blocks: [
          { type: 'p', text: 'Payment shall be in the form you select when you register for Logezy, or as subsequently updated as permitted by Logezy. We reserve the right to withhold payment or chargeback to your account any amounts otherwise due to us under this Agreement, or amounts due to any breach of this Agreement by you, pending Logezy\'s reasonable investigation of such breach. We also reserve the right to withhold payment or chargeback to your account any amounts subject to dispute, such as in the case of credit card chargebacks, pending successful resolution of the dispute. To ensure proper payment, you are solely responsible for providing and maintaining accurate contact and payment information associated with your account, which includes without limitation applicable tax information. If we believe that we are obligated to obtain tax information and you do not provide this information to us after we have requested it, we may withhold your payments until you provide this information or otherwise satisfy us that you are not a person or entity from whom we are required to obtain tax information. Any third-party fees related to returned or cancelled payments due to a contact or payment information error or omission may be deducted from the newly issued payment. You agree to pay all applicable taxes or charges imposed by any government entity in connection with your participation in the Service.' },
          { type: 'p', text: 'If you dispute any payment made hereunder, you must notify us in writing within thirty (30) days of such payment or from when you purport such payment would have been due, whichever is earlier. Failure to so notify Logezy shall result in the waiver by you of any claim relating to such disputed payment. Payment shall be calculated solely based on records maintained by Logezy. No other measurements or statistics of any kind shall be accepted by Logezy or have any effect under this Agreement and you shall have no audit rights hereunder. We may withhold any taxes or other amounts from payments due to you as required by law.' },
        ],
      },
    ],
  },
  {
    heading: 'Cancellation or Termination',
    subsections: [
      {
        heading: 'Cancellation or Termination',
        blocks: [
          { type: 'p', text: 'You are solely responsible for properly cancelling your account. Currently, only a read receipt email or phone request to cancel your account is considered cancellation. Once you cancel your Logezy account, you will no longer have any access to your User Content or other account information.' },
          { type: 'p', text: 'All of your User Content will be promptly deleted from Logezy upon cancellation. This information cannot be recovered once your account is cancelled.' },
          { type: 'p', text: 'If you cancel Logezy before the end of your current billing period (a calendar month), your cancellation will take effect at the end of the current billing period and you will be charged for the usage of that period.' },
          { type: 'p', text: 'Logezy, in its sole discretion, has the right to suspend or terminate your account and refuse any and all current or future use of Logezy, or any other Logezy service, for any reason at any time. Such termination of the Service will result in the deactivation or deletion of your account or your access to your account, and the forfeiture and relinquishment of all content in your account. We reserve the right to refuse service to anyone for any reason at any time.' },
        ],
      },
    ],
  },
  {
    heading: 'Trademarks and Site Name Squatting',
    subsections: [
      {
        heading: 'Trademarks and Site Name Squatting',
        blocks: [
          { type: 'p', text: 'We reserve the right to reclaim site names or sub-domains on behalf of businesses or individuals that hold legal claim or trademark on those names or otherwise have an interest in such names. Accounts using business names and/or logos that we determine, in our sole discretion, mislead or could mislead others will be subject to suspension at our discretion.' },
          { type: 'p', text: "You may not engage in site name squatting. Accounts that are inactive for more than thirty (30) days may also be removed at Logezy's discretion and without further notice." },
        ],
      },
    ],
  },
  {
    heading: 'Consent and SMS/Text Messaging',
    subsections: [
      {
        heading: 'Adding Employees & Consent',
        blocks: [
          { type: 'notice', text: 'Logezy makes it easy for you to add employees to your Logezy account so that you can manage your schedule and exchange messages with each other. You represent and warrant to us that each person you add to your Logezy account has consented to be added to the account and to receive administrative messages from Logezy and text messages from you and anyone else associated with the account.' },
        ],
      },
      {
        heading: 'Consent to Receive Periodic Messages from Logezy',
        blocks: [
          { type: 'p', text: 'As part of the Service, Logezy sometimes causes administrative messages to be sent to users, including both employers and employees. For example, upon adding a new employee to an employer\'s Logezy account, the new employee will receive a welcome message, instructions on how to register for the Service, and a link with more information about the service. Logezy may send other administrative messages as well. By signing up for a Logezy Account, you agree to receive email and text messages from us.' },
        ],
      },
      {
        heading: 'Text Messaging Fees',
        blocks: [
          { type: 'p', text: 'You may sign up to receive certain Logezy notifications or information via text messaging. You may incur additional charges from your wireless provider for these services. You agree that you are solely responsible for any such charges. Please be aware that texting charges can fluctuate internationally. Text messaging rates can normally be found by asking your service provider.' },
        ],
      },
    ],
  },
  {
    heading: 'Security',
    subsections: [
      {
        heading: 'Security',
        blocks: [
          { type: 'p', text: 'Logezy uses commercially reasonable physical, managerial, and technical safeguards to preserve the integrity and security of your personal information and implement your privacy settings. However, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures or use your personal information for improper purposes. You acknowledge that you provide your personal information at your own risk.' },
        ],
      },
    ],
  },
  {
    heading: 'Links to Third Parties and Information',
    subsections: [
      {
        heading: 'Links to Third Parties and Information',
        blocks: [
          { type: 'p', text: "Logezy may contain links to third-party materials that are not owned or controlled by Logezy. Logezy does not endorse or assume any responsibility for any such third-party sites, information, materials, products, or services. If you access a third-party website or service from the Service or share your User Content on or through any third-party website or service, you do so at your own risk, and you understand that this Agreement and Logezy's Privacy Policy do not apply to your use of such sites. You expressly relieve Logezy from any and all liability arising from your use of any third-party website, service, or content, including without limitation User Content submitted by other Users. Additionally, your dealings with or participation in promotions of advertisers found on the Service, including payment and delivery of goods, and any other terms (such as warranties) are solely between you and such advertisers. You agree that Logezy shall not be responsible for any loss or damage of any sort relating to your dealings with such advertisers." },
        ],
      },
    ],
  },
  {
    heading: 'Indemnity',
    subsections: [
      {
        heading: 'Indemnity',
        blocks: [
          { type: 'p', text: "You agree to defend, indemnify and hold harmless Logezy and its subsidiaries, agents, licensors, managers, and other affiliated companies, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Service, including any data or content transmitted or received by you; (ii) your violation of any term of this Agreement, including without limitation your breach of any of the representations and warranties above; (iii) your violation of any third-party right, including without limitation any right of privacy or Intellectual Property Rights; (iv) your violation of any applicable law, rule or regulation; (v) User Content or any content that is submitted via your account including without limitation misleading, false, or inaccurate information; (vi) your gross negligence or wilful misconduct; or (vii) any other party's access and use of the Service (or access and use of any third-party service via the Service) with your unique username, password or other appropriate security code." },
        ],
      },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function BlockRenderer({ block }: { block: Block }) {
  if (block.type === 'list') {
    return (
      <ul className="space-y-2.5 pl-1">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2396C6] flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'notice') {
    return (
      <p className="text-slate-700 font-semibold leading-relaxed bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
        {block.text}
      </p>
    );
  }
  return <p className="text-slate-600 leading-relaxed">{block.text}</p>;
}

export default function TermsOfService() {
  return (
    <main>
      <SEO
        title="Terms of Service"
        description="Read the Logezy Ltd Terms of Service to understand the terms and conditions that govern your use of the Logezy Staff Management System, mobile apps, and website."
        canonical="/terms-of-service"
        breadcrumbs={[{ name: 'Terms of Service', path: '/terms-of-service' }]}
      />

      {/* ── Header ── */}
      <section
        className="pt-28 pb-14 lg:pt-36 lg:pb-16"
        style={{ background: 'linear-gradient(135deg,#0C1640 0%,#183765 60%,#2396C6 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp()} className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
            <FileText weight="fill" className="h-4 w-4 text-white" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">Please read carefully</span>
          </motion.div>
          <motion.h1 {...fadeUp(0.05)} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Terms of Service
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
            {introNotices.map((text, i) => (
              <p key={i} className="text-slate-700 font-semibold leading-relaxed bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                {text}
              </p>
            ))}
          </motion.div>

          <div className="space-y-14">
            {sections.map((section, si) => {
              const showSectionHeading = section.subsections.length > 1
                || section.subsections[0]?.heading !== section.heading;
              return (
                <motion.div key={si} {...fadeUp(Math.min(si * 0.02, 0.2))}>
                  {showSectionHeading && (
                    <h2 className="text-2xl sm:text-[26px] font-bold text-[#0C1640] mb-6">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-8">
                    {section.subsections.map((sub, sj) => (
                      <div key={sj}>
                        <h3 className={showSectionHeading
                          ? 'text-lg font-bold text-[#183765] mb-3'
                          : 'text-2xl sm:text-[26px] font-bold text-[#0C1640] mb-4'}>
                          {sub.heading}
                        </h3>
                        <div className="space-y-4">
                          {sub.blocks.map((block, bi) => (
                            <BlockRenderer key={bi} block={block} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Contact ── */}
          <motion.div
            {...fadeUp()}
            className="mt-14 rounded-2xl border border-blue-100 p-6 sm:p-8"
            style={{ background: 'linear-gradient(135deg,#f4f8ff 0%,#eef6fb 100%)' }}
          >
            <h2 className="text-xl font-bold text-[#0C1640] mb-2">Questions About These Terms?</h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              If you have any questions about this Terms of Service agreement, get in touch with us. You can also
              read our <Link to="/privacy-policy" className="text-[#2396C6] font-medium hover:underline">Privacy Policy</Link>.
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
