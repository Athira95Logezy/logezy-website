import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MobileAppShowcase from '../components/MobileAppShowcase';
import MobileAppFeatures from '../components/MobileAppFeatures';
import AnimatedScheduleSection from '../components/AnimatedScheduleSection';
import IndustrySolutions from '../components/IndustrySolutions';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
export default function Home() {
  return (
    <main>
      <SEO
        title="Logezy — Workforce Management Software for UK Staffing & Healthcare Agencies"
        description="Logezy is the all-in-one workforce management platform for UK staffing and healthcare agencies. Automate scheduling, payroll, compliance, and invoicing. Trusted by 600+ agencies."
        keywords="workforce management software, healthcare staffing software, temp agency software, care agency software, nurse scheduling, CQC compliance software, payroll software UK, rota management, Logezy"
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Logezy",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web, iOS, Android",
          "description": "All-in-one workforce management platform for UK staffing and healthcare agencies.",
          "url": "https://www.logezy.com",
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "600" }
        }}
      />
      <Hero />
      <Features />
      <MobileAppShowcase />
      <MobileAppFeatures />
<AnimatedScheduleSection />
      <IndustrySolutions />
      <Testimonials />
      <FAQ />
    </main>
  );
}
