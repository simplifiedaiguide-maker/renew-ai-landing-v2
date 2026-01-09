import React, { useState, useRef, useEffect } from 'react';

// Reusable Components
const SectionWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <section className={`max-w-[540px] md:max-w-[1000px] mx-auto px-4 mb-8 ${className}`}>
    {children}
  </section>
);

const Pill: React.FC<{ text: string; selected?: boolean; onClick?: () => void }> = ({ text, selected, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all border ${
      selected 
        ? 'bg-[#FF7E33] text-white border-[#FF7E33] shadow-sm' 
        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
    }`}
  >
    {text}
  </button>
);

/**
 * Logo component based on screenshot.
 * Square navy background icon with orange spark + Renew AI text.
 */
const RenewLogo: React.FC<{ size?: 'normal' | 'small'; className?: string }> = ({ size = 'normal', className = "" }) => {
  const isSmall = size === 'small';
  
  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Navy Icon Square */}
      <div 
        className={`flex items-center justify-center rounded-xl bg-[#1E3A8A] transition-colors group-hover:bg-[#2547a8] shadow-sm flex-shrink-0 ${
          isSmall ? 'w-8 h-8 rounded-lg' : 'w-12 h-12'
        }`}
      >
        {/* Simple SVG Spark following screenshot design */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={isSmall ? 'w-5 h-5' : 'w-7 h-7'}
        >
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 7.92V11a7.5 7.5 0 0 0-7.92 7.92V19a7.5 7.5 0 0 0-7.92-7.92v-.08a7.5 7.5 0 0 0 7.92-7.92V3z" />
          <circle cx="18" cy="6" r="1.5" fill="#F59E0B" stroke="none" />
        </svg>
      </div>
      
      {/* Brand Text */}
      <span 
        className={`font-bold tracking-tight text-[#F59E0B] transition-colors group-hover:text-[#fbbf24] ${
          isSmall ? 'text-xl' : 'text-3xl md:text-4xl'
        }`}
      >
        Renew AI
      </span>
    </div>
  );
};

const App: React.FC = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: React.ReactNode}[]>([
    { role: 'ai', text: "Hello! I'm your Renew AI Coach. Tell me about your background. For example: 'I have 25 years in regional management and want to pivot to a remote tech role.'" }
  ]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const aiCoachRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToCoach = () => {
    aiCoachRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    setEmailSubmitted(true);
  };

  const handleSendMessage = (text: string = chatInput) => {
    if (!text.trim() || isTyping) return;
    const userMsg = { role: 'user' as const, text };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI age-specific pivot response
    setTimeout(() => {
      let aiText: React.ReactNode;

      if (text.toLowerCase().includes("regional manager") || text.toLowerCase().includes("agile")) {
        aiText = (
          <div className="space-y-4">
            <p><strong>Perfect pivot!</strong> Your 25 years leading regional teams is actually "Scale Management" in tech-speak.</p>
            <div className="bg-slate-50/50 p-3 rounded-lg border-l-4 border-[#FF7E33]">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">ATS Resume Rewrite:</p>
              <p className="italic">"Led 50-person cross-functional regional teams → Scaled Agile delivery efficiency by 40% using servant-leadership."</p>
            </div>
            <div className="bg-slate-50/50 p-3 rounded-lg border-l-4 border-[#5850EC]">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">LinkedIn Headline:</p>
              <p className="font-bold">Seasoned Leader | Agile Transformation | 25+ Yrs Operational Results</p>
            </div>
            <p className="font-semibold text-[#FF7E33]">Want your full 10-page rebrand?</p>
          </div>
        );
      } else if (text.toLowerCase().includes("gap")) {
        aiText = (
          <div className="space-y-3">
            <p>A "gap" is only a gap if you call it one. For someone with 20+ years of experience, we reposition this as <strong>"Strategic Sabbatical & Modernization Period."</strong></p>
            <p>We'll show you how to list your upskilling as an active role. <em>"Interim Strategic Consultant & AI Adoption Specialist."</em></p>
            <p className="font-bold">Shall we start your resume refresh?</p>
          </div>
        );
      } else {
        aiText = "That's a powerful foundation. Professionals over 50 are the 'hidden giants' of the remote workforce. Your stakeholder management experience maps directly to high-value leadership roles. Ready to see the Skill Map?";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-12 relative">
      {/* Scroll to Top Button */}
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-white text-[#FF7E33] border border-slate-200 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-90 flex items-center justify-center ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path>
        </svg>
      </button>

      {/* Top Navigation */}
      <nav className="max-w-[540px] md:max-w-[1000px] mx-auto flex justify-between items-center py-6 px-6">
        <div className="flex-1">
          <RenewLogo />
        </div>
      </nav>

      {/* Hero Card */}
      <section className="max-w-[540px] mx-auto px-4 mb-8">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <RenewLogo size="small" />
              <span className="bg-orange-50 text-[#FF7E33] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-orange-100">
                Career Evolution
              </span>
            </div>

            <div className="relative mb-8 overflow-hidden rounded-2xl aspect-[16/10] bg-slate-100 shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200" 
                alt="Diverse group of senior professionals working together" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">Active Collaboration</span>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-[2.5rem] font-black text-slate-900 leading-[1.05] mb-4 tracking-tight">
                Your Next Chapter <br />
                <span className="text-[#FF7E33]">Starts Here</span>
              </h1>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                You’ve spent decades building expertise. Renew AI helps you translate those skills into a flexible, remote role in today’s AI‑powered market.
              </p>
              <p className="text-slate-400 mt-3 text-sm italic font-medium">
                No reinvention, just repositioning.
              </p>
            </div>

            <button 
              onClick={handleScrollToCoach}
              className="w-full bg-[#FF7E33] hover:bg-[#FF6A1A] text-white py-4.5 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 transition-all transform active:scale-[0.97] hover:-translate-y-0.5 flex justify-center items-center gap-2"
            >
              Start Your 60‑Second Skill Map
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>

            <div className="mt-10 border-t border-slate-100 pt-8">
              {!emailSubmitted ? (
                <form 
                  action="https://formspree.io/f/xgvgggzq" 
                  method="POST" 
                  className="space-y-4"
                  onSubmit={handleEmailSubmit}
                >
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-3">
                      Get the LinkedIn Success Prompts PDF + Audio (Free)
                    </label>
                    <div className="flex flex-col gap-3">
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="your@email.com" 
                        className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7E33] transition-all placeholder:text-slate-400 font-medium text-base text-slate-900 bg-white"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-black transition-all hover:shadow-lg active:scale-95"
                      >
                        Send It to Me
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-emerald-800 font-bold">Awesome!</p>
                  <p className="text-emerald-700 text-sm font-medium leading-snug">
                    Check your inbox for the LinkedIn Success Prompts PDF + audio overview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="max-w-[540px] mx-auto text-center py-4 px-4 mb-8">
        <div className="flex flex-col items-center gap-5">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i}
                src={`https://i.pravatar.cc/150?u=${i + 100}`} 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
              />
            ))}
          </div>
          <p className="text-slate-500 text-sm font-bold tracking-tight">
            Trusted by <span className="text-slate-900">5,000+</span> experienced professionals.
          </p>
          <div className="flex justify-between items-center w-full opacity-25 grayscale pt-4 px-2 gap-4">
            <span className="font-black text-xl italic tracking-tighter">FORBES</span>
            <span className="font-black text-xl italic tracking-tighter">WSJ</span>
            <span className="font-black text-xl italic tracking-tighter">TIME</span>
            <span className="font-black text-xl italic tracking-tighter">WIRED</span>
          </div>
        </div>
      </section>

      {/* AI Coach Demo Section */}
      <div ref={aiCoachRef} className="max-w-[1000px] mx-auto px-4 mb-16">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          {/* Left Panel: Feature Highlight */}
          <div className="md:w-[40%] bg-[#5850EC] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 7.92V11a7.5 7.5 0 0 0-7.92 7.92V19a7.5 7.5 0 0 0-7.92-7.92v-.08a7.5 7.5 0 0 0 7.92-7.92V3z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Try the AI Coach</h2>
              <p className="text-white/80 text-lg mb-10 font-medium">
                Describe your current role and your goals. See how our AI translates your legacy experience into modern potential.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => handleSendMessage("How do I explain a 2-year gap?")}
                  className="w-full text-left bg-white/10 border border-white/20 hover:bg-white/20 p-4 rounded-xl text-sm font-semibold transition-all group"
                >
                  <span className="group-hover:translate-x-1 inline-block transition-transform">"How do I explain a 2-year gap?"</span>
                </button>
                <button 
                  onClick={() => handleSendMessage("Regional Manager to Agile Product Owner?")}
                  className="w-full text-left bg-white/10 border border-white/20 hover:bg-white/20 p-4 rounded-xl text-sm font-semibold transition-all group"
                >
                  <span className="group-hover:translate-x-1 inline-block transition-transform">"Regional Manager to Agile?"</span>
                </button>
              </div>
            </div>
            <p className="mt-12 text-[11px] text-white/50 font-medium z-10">
              Powered by Renew AI proprietary Career Analysis Engine.
            </p>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          {/* Right Panel: Chat Interface */}
          <div className="md:w-[60%] flex flex-col h-[650px] bg-white">
            {/* Chat Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5850EC]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#5850EC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-10.421A9.956 9.956 0 008 12c0 .896-.12 1.764-.345 2.585m6.75-5.171A9.956 9.956 0 0116 12c0 .896.12 1.764.345 2.585m-1.345-13.414C13.651 3.75 12.954 9.071 12 9.571m-2.096-2.048c.733.044 1.41.366 2.096.366.686 0 1.363-.322 2.096-.366m-2.096-2.048c-.733-.044-1.41-.366-2.096-.366-.686 0-1.363.322-2.096.366"></path>
                  </svg>
                </div>
                <span className="font-bold text-slate-800">Renew AI Coach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Live</span>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-sm leading-relaxed font-medium shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#5850EC] text-white shadow-[#5850EC]/10' 
                      : 'bg-white border border-slate-100 text-slate-800'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start animate-pulse">
                   <div className="bg-white border border-slate-100 px-6 py-4 rounded-2xl text-slate-400 text-sm italic">
                     Coach is thinking...
                   </div>
                </div>
              )}
            </div>

            {/* High-Contrast Input Area */}
            <div className="p-8 bg-[#6B46C1] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-white/10">
              <label className="block text-white text-[10px] font-black uppercase tracking-[0.2em] mb-3 ml-1 drop-shadow-sm">
                Renew AI Coach Input
              </label>
              <div className="relative flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your career question..."
                  className="flex-1 px-6 py-5 bg-white text-[#1A202C] border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-white transition-all font-semibold text-base placeholder:text-slate-400 shadow-inner"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={isTyping}
                  className="bg-[#5850EC] hover:bg-[#4338ca] disabled:bg-slate-500 text-white px-8 py-5 rounded-2xl font-bold transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Ask Renew AI
                </button>
              </div>
              
              <p className="mt-4 text-[10px] text-white/60 font-bold uppercase text-center tracking-widest drop-shadow-sm">
                Encrypted & Secure · Career Analysis Engine
              </p>
              
              <div className="mt-6 flex justify-center border-t border-white/20 pt-6">
                <button 
                  onClick={handleScrollToPricing}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 group transition-all border border-white/30 backdrop-blur-sm"
                >
                  Try the Full Experience
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div ref={pricingRef}>
        <section className="max-w-[1000px] mx-auto px-4 mb-8">
          <div className="bg-[#0F172A] bg-gradient-to-b from-[#0F172A] to-[#1E293B] rounded-[3rem] p-8 sm:p-16 text-center text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7E33]/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">Invest in Your Next Chapter</h2>
            <p className="text-slate-400 text-sm md:text-lg mb-12 max-w-[600px] mx-auto leading-relaxed">
              Tailored career pivot tools designed specifically for the nuanced needs of experienced professionals 50+.
            </p>

            <div className="flex flex-col gap-6 max-w-[640px] mx-auto text-left">
              {/* 1. Rebrand Bundle */}
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out cursor-pointer group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-white">Rebrand Bundle</h3>
                    <span className="bg-slate-700/50 text-slate-300 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-slate-600">Starter</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">Complete eBooks + custom LinkedIn Prompts library.</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-[13px] text-slate-300 font-semibold">
                        <svg className="w-4 h-4 text-[#FF7E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        eBooks & Guides
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-slate-300 font-semibold">
                        <svg className="w-4 h-4 text-[#FF7E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        LinkedIn Library
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto gap-4">
                  <div className="text-center sm:text-right">
                    <span className="text-4xl font-black text-white">$37</span>
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">One-Time</div>
                  </div>
                  <button className="w-full sm:w-40 bg-[#FF7E33] hover:bg-[#FF6A1A] text-white py-3 rounded-xl font-black text-sm transition-all shadow-lg hover:-translate-y-1">
                    Get Started
                  </button>
                </div>
              </div>

              {/* 2. Founding Member (HIGHLIGHTED) */}
              <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-1 shadow-[0_10px_30px_rgba(255,126,51,0.2),0_20px_60px_rgba(0,0,0,0.5)] relative transform hover:scale-[1.05] hover:shadow-[0_30px_80px_rgba(255,126,51,0.45),0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out z-10 border-2 border-[#FF7E33] cursor-pointer group">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF7E33] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">POPULAR</div>
                <div className="bg-[#0F172A] rounded-[2.3rem] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black text-white">Founding Member</h3>
                      <span className="bg-[#FF7E33]/10 text-[#FF7E33] text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-[#FF7E33]/30">Best Value</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-4 italic">Everything in Rebrand bundle plus full Early Access & AI Toolkit.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-[13px] text-slate-200 font-bold">
                          <svg className="w-4 h-4 text-[#FF7E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                          Early App Access
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-slate-200 font-bold">
                          <svg className="w-4 h-4 text-[#FF7E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                          Renew AI Engine
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center sm:items-end w-full sm:w-auto gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#FF7E33] flex flex-col items-center justify-center bg-white shadow-2xl shadow-orange-500/20 group-hover:shadow-orange-500/50 transition-shadow duration-500">
                        <span className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tighter">$29</span>
                        <span className="text-[10px] text-slate-400 font-bold -mt-1">/mo</span>
                      </div>
                    </div>
                    <button className="w-full sm:w-40 bg-[#FF7E33] hover:bg-[#FF6A1A] text-white py-4 rounded-xl font-black text-sm transition-all shadow-xl shadow-orange-500/30 hover:-translate-y-1">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. VIP Pivot */}
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out cursor-pointer group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-white">VIP Pivot</h3>
                    <span className="bg-amber-400/10 text-amber-400 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-amber-400/30">VIP</span>
                  </div>
                  <p className="text-slate-200 text-sm mb-4 font-black">First 25 Founders: 1 Year Full Access</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                    <div className="flex items-center gap-2 text-[12px] text-slate-300 font-semibold">
                        <svg className="w-3.5 h-3.5 text-[#FF7E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        Complete eBooks + LinkedIn Prompts
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-slate-300 font-semibold">
                        <svg className="w-3.5 h-3.5 text-[#FF7E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        Full Renew AI App Access (1 year)
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#FF7E33] font-black">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        1-on-1 Personalized Coaching
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-slate-300 font-semibold">
                        <svg className="w-3.5 h-3.5 text-[#FF7E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        Priority Support + Lifetime Updates
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto gap-4">
                  <div className="text-center sm:text-right">
                    <span className="text-4xl font-black text-white">$297</span>
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">One-Time</div>
                  </div>
                  <button className="w-full sm:w-40 bg-[#FF7E33] hover:bg-[#FF6A1A] text-white py-3 rounded-xl font-black text-sm transition-all shadow-lg hover:-translate-y-1">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-12 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
              Cancel anytime · No hidden fees · Safe & Secure
            </p>
          </div>
        </section>
      </div>

      <footer className="max-w-[540px] md:max-w-[1000px] mx-auto text-center px-6 mt-16 mb-8 border-t border-slate-200 pt-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <RenewLogo size="small" />
        </div>
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
          Empowering Decades of Experience
        </p>
        <div className="flex justify-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-[#FF7E33] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#FF7E33] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#FF7E33] transition-colors">Contact</a>
        </div>
        <p className="mt-8 text-slate-300 text-[10px]">© 2026 Renew AI. Built for the next chapter.</p>
      </footer>
    </div>
  );
};

export default App;