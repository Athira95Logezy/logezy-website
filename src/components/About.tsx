import React from 'react';
import { Medal, Users, Clock, Shield } from '@phosphor-icons/react';

const stats = [
  { icon: Users, value: '500+', label: 'Care Agencies', color: 'text-[#2299c9]' },
  { icon: Medal, value: '10K+', label: 'Clients Managed', color: 'text-[#193765]' },
  { icon: Clock, value: '24/7', label: 'Support', color: 'text-[#2299c9]' },
  { icon: Shield, value: '100%', label: 'Compliant', color: 'text-[#193765]' }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                How It <span className="bg-gradient-to-r from-[#193765] to-[#2299c9] bg-clip-text text-transparent whitespace-nowrap">Works</span>
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#193765] to-[#2299c9] rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started Fast</h3>
                  <p className="text-gray-600">Sign up with basic agency details, set up service areas, schedules, and define user roles and permissions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#193765] to-[#2299c9] rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tailor to Your Needs</h3>
                  <p className="text-gray-600">Define locations, create schedule templates, set up staff roles and skills, and add custom fields unique to your agency.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#193765] to-[#2299c9] rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Run Smooth Operations</h3>
                  <p className="text-gray-600">Onboard clients, assign carers based on skills and availability, publish rotas, and monitor visits in real time.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/70 rounded-xl backdrop-blur-sm">
                  <stat.icon weight="fill" className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    Empowering every professional to unlock their full potential
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    'AI-powered career matching',
                    'Personalized skill development',
                    'Global job opportunities',
                    'Professional networking'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#193765] to-[#2299c9] rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-[#193765] to-[#2299c9] text-white p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold mb-2">Join the Revolution</div>
                  <div className="text-[#2299c9]/70">Start your career transformation today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}