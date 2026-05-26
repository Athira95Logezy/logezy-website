import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Lightning, Buildings, Rocket } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const plans = [
  {
    name: 'Starter',
    icon: Rocket,
    monthly: 149,
    annual: 119,
    desc: 'Perfect for agencies just getting started with digital workforce management.',
    iconColor: 'from-blue-500 to-blue-600',
    features: [
      'Up to 50 workers',
      'Scheduling & rota builder',
      'GPS timesheets',
      'Basic compliance tracking',
      'Mobile app (iOS & Android)',
      'Email support',
    ],
    cta: 'Start free trial',
    popular: false,
  },
  {
    name: 'Growth',
    icon: Lightning,
    monthly: 299,
    annual: 239,
    desc: 'For growing agencies that need full payroll, recruitment, and advanced compliance tools.',
    iconColor: 'from-white/30 to-white/15',
    features: [
      'Up to 250 workers',
      'Everything in Starter',
      'Full payroll processing',
      'Recruitment & onboarding portal',
      'CQC & audit compliance suite',
      'Client portal',
      'Priority support + onboarding',
      'API integrations',
    ],
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Buildings,
    monthly: null,
    annual: null,
    desc: 'For large agencies and groups with complex multi-site, multi-client operations.',
    iconColor: 'from-slate-600 to-slate-800',
    features: [
      'Unlimited workers',
      'Everything in Growth',
      'Multi-branch management',
      'Custom integrations & API',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom compliance workflows',
      'White-label options',
    ],
    cta: 'Talk to sales',
    popular: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const ref = useScrollReveal();

  return (
    <section id="pricing" className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A1628 0%, #0F1E4A 50%, #0A1628 100%)' }}
      ref={ref}>

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(23,149,199,0.5) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 right-0 translate-x-1/4 translate-y-1/3 opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(24,55,101,0.6) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 sr">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5"
            style={{ background: 'rgba(23,149,199,0.15)', border: '1px solid rgba(23,149,199,0.28)', color: '#A8D8EE' }}>
            <Lightning weight="fill" className="h-3 w-3" />
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.06]"
            style={{ letterSpacing: '-0.025em' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(165,210,255,0.6)' }}>
            No hidden fees, no per-worker charges. One flat price that scales with your agency.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center rounded-2xl p-1.5 gap-1"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <button
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                !annual ? 'bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'text-blue-200/60 hover:text-white'
              }`}
              onClick={() => setAnnual(false)}>
              Monthly
            </button>
            <button
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                annual ? 'bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'text-blue-200/60 hover:text-white'
              }`}
              onClick={() => setAnnual(true)}>
              Annual
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map(({ name, icon: Icon, monthly, annual: annualPrice, desc, iconColor, features, cta, popular }, i) => (
            <div key={name}
              className={`relative rounded-2xl flex flex-col transition-all duration-300 sr stagger-${i+1} ${
                popular
                  ? 'pricing-card-popular text-white'
                  : 'hover:border-white/20 hover:-translate-y-1'
              }`}
              style={!popular ? {
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(8px)',
              } : {}}>

              {/* Popular badge */}
              {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap shadow-orange-500/30">
                    ✦ Most Popular
                  </div>
                </div>
              )}

              {/* Popular top glow ring */}
              {popular && (
                <div className="absolute -inset-px rounded-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)' }} />
              )}

              <div className="relative p-8 flex flex-col flex-1">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconColor} flex items-center justify-center mb-5 shadow-lg flex-shrink-0`}>
                  <Icon weight="fill" className="h-6 w-6 text-white" />
                </div>

                <h3 className={`text-xl font-black mb-2 ${popular ? 'text-white' : 'text-white'}`}>{name}</h3>
                <p className={`text-sm leading-relaxed mb-7 ${popular ? 'text-blue-100/80' : 'text-blue-200/55'}`}>{desc}</p>

                {/* Price */}
                {monthly ? (
                  <div className="mb-8">
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-5xl font-black text-white leading-none">
                        £{annual ? annualPrice : monthly}
                      </span>
                      <span className={`text-sm mb-1.5 ${popular ? 'text-blue-100/70' : 'text-blue-200/50'}`}>/mo</span>
                    </div>
                    {annual && (
                      <p className={`text-xs ${popular ? 'text-blue-100/60' : 'text-blue-300/40'}`}>
                        Billed annually · £{(annualPrice! * 12).toLocaleString()}/year
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mb-8">
                    <p className="text-3xl font-black text-white mb-1">Custom</p>
                    <p className={`text-xs ${popular ? 'text-blue-100/60' : 'text-blue-300/40'}`}>Contact us for a tailored quote</p>
                  </div>
                )}

                {/* Divider */}
                <div className={`h-px mb-7 ${popular ? 'bg-white/15' : 'bg-white/08'}`} />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle weight="fill" className={`h-4 w-4 flex-shrink-0 ${popular ? 'text-blue-200' : 'text-blue-500/70'}`} />
                      <span className={popular ? 'text-blue-50' : 'text-blue-100/75'}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to="/contact"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    popular
                      ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                      : 'text-white hover:bg-white/10 border border-white/15'
                  }`}>
                  {cta}
                  <ArrowRight weight="fill" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm mt-10 sr" style={{ color: 'rgba(147,197,253,0.80)' }}>
          All plans include a 10-day free trial. No credit card required.
          <span className="mx-2">·</span>
          Cancel any time.
          <span className="mx-2">·</span>
          <Link to="/contact" className="hover:underline font-medium" style={{ color: 'rgba(147,197,253,0.7)' }}>Talk to us</Link> if you're unsure which plan fits.
        </p>
      </div>
    </section>
  );
}
