"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Divisions", href: "#divisions" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Achievements", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

const FEATURES = [
  {
    title: "Innovation",
    desc: "We foster a culture of creative problem-solving and disruptive thinking to push boundaries in technology.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect width="48" height="48" rx="14" fill="url(#g1)" fillOpacity=".12" />
        <path d="M24 14v4m-7.07-.93 2.83 2.83M14 24h4m-.93 7.07 2.83-2.83M24 30v4m4.24-6.76 2.83 2.83M30 24h4m-6.76-7.07 2.83-2.83" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill="url(#g1)" />
        <defs><linearGradient id="g1" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#2563EB" /><stop offset="1" stopColor="#38BDF8" /></linearGradient></defs>
      </svg>
    ),
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Technology",
    desc: "Access cutting-edge tools, workshops, and resources across multiple technology domains and stacks.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect width="48" height="48" rx="14" fill="url(#g2)" fillOpacity=".12" />
        <path d="M17 20l4 4-4 4m6 0h4" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12" y="14" width="24" height="20" rx="3" stroke="url(#g2)" strokeWidth="2" />
        <defs><linearGradient id="g2" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#38BDF8" /><stop offset="1" stopColor="#2563EB" /></linearGradient></defs>
      </svg>
    ),
    gradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    title: "Leadership",
    desc: "Develop essential leadership, communication, and project management skills for the tech industry.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect width="48" height="48" rx="14" fill="url(#g3)" fillOpacity=".12" />
        <path d="M24 14l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" stroke="url(#g3)" strokeWidth="2" strokeLinejoin="round" />
        <defs><linearGradient id="g3" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#2563EB" /></linearGradient></defs>
      </svg>
    ),
    gradient: "from-purple-500/10 to-blue-500/10",
  },
  {
    title: "Collaboration",
    desc: "Join a vibrant community where diverse ideas converge to create impactful real-world solutions.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect width="48" height="48" rx="14" fill="url(#g4)" fillOpacity=".12" />
        <circle cx="20" cy="20" r="4" stroke="url(#g4)" strokeWidth="2" />
        <circle cx="28" cy="20" r="4" stroke="url(#g4)" strokeWidth="2" />
        <path d="M14 32c0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6" stroke="url(#g4)" strokeWidth="2" strokeLinecap="round" />
        <defs><linearGradient id="g4" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#2563EB" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient></defs>
      </svg>
    ),
    gradient: "from-blue-500/10 to-purple-500/10",
  },
];

const DIVISIONS = [
  { title: "Programming", desc: "Master algorithms, data structures, and competitive programming.", icon: "💻", size: "bento-large" },
  { title: "UI/UX Design", desc: "Craft beautiful, user-centered digital experiences.", icon: "🎨", size: "bento-wide" },
  { title: "Artificial Intelligence", desc: "Explore ML, deep learning, NLP, and computer vision.", icon: "🧠", size: "" },
  { title: "Cybersecurity", desc: "Learn ethical hacking, network security, and cryptography.", icon: "🛡️", size: "bento-tall" },
  { title: "Web Development", desc: "Build modern full-stack web applications with cutting-edge frameworks.", icon: "🌐", size: "bento-wide" },
  { title: "Mobile Development", desc: "Create native and cross-platform mobile apps.", icon: "📱", size: "" },
  { title: "Multimedia", desc: "Video production, motion graphics, 3D modeling, and visual storytelling.", icon: "🎬", size: "" },
  { title: "Public Relations", desc: "Strategic communication, branding, and community engagement.", icon: "📣", size: "" },
  { title: "Research & Development", desc: "Push the boundaries of technology through academic research and innovation.", icon: "🔬", size: "bento-wide" },
  { title: "Entrepreneurship", desc: "Build startups, develop business acumen, and launch tech ventures.", icon: "🚀", size: "" },
];

const PROGRAMS = [
  { title: "Workshops", desc: "Hands-on technical sessions covering everything from Git fundamentals to cloud architecture.", icon: "🛠️", period: "Monthly" },
  { title: "Bootcamps", desc: "Intensive multi-week programs in web dev, mobile, AI, and cybersecurity.", icon: "⚡", period: "Quarterly" },
  { title: "Hackathons", desc: "48-hour innovation sprints where teams build solutions to real-world challenges.", icon: "🏆", period: "Bi-Annual" },
  { title: "Tech Seminars", desc: "Industry experts share insights on emerging technologies and career development.", icon: "🎤", period: "Monthly" },
  { title: "Competitions", desc: "Represent HIMASANTIKA in national and international coding and design contests.", icon: "🥇", period: "Ongoing" },
  { title: "Study Clubs", desc: "Weekly peer-learning groups focused on specific domains and technologies.", icon: "📚", period: "Weekly" },
  { title: "Community Service", desc: "Tech literacy programs and digital empowerment initiatives for local communities.", icon: "❤️", period: "Semester" },
  { title: "Technology Festivals", desc: "Large-scale tech showcases featuring demos, speakers, competitions, and networking.", icon: "🎉", period: "Annual" },
];

const STATS = [
  { value: 500, suffix: "+", label: "Active Members" },
  { value: 120, suffix: "+", label: "Events Held" },
  { value: 85, suffix: "+", label: "Achievements" },
  { value: 40, suffix: "+", label: "Collaborations" },
  { value: 2000, suffix: "+", label: "Alumni Network" },
];

const GALLERY_ITEMS = [
  { src: "/gallery/hackathon.png", title: "National Hackathon 2025", category: "Competitions", tall: true },
  { src: "/gallery/workshop.png", title: "Full-Stack Workshop", category: "Workshops", tall: false },
  { src: "/gallery/collaboration.png", title: "Team Brainstorming", category: "Events", tall: false },
  { src: "/gallery/seminar.png", title: "AI & Future Tech Seminar", category: "Events", tall: true },
  { src: "/gallery/competition.png", title: "Regional Champions", category: "Competitions", tall: false },
  { src: "/gallery/community.png", title: "Digital Literacy Drive", category: "Community", tall: true },
];

const GALLERY_FILTERS = ["All", "Events", "Workshops", "Competitions", "Community"];

const TESTIMONIALS = [
  {
    quote: "HIMASANTIKA transformed my perspective on technology. The hackathons and workshops gave me the confidence and skills to land my dream internship at a top tech company.",
    name: "Sarah Putri",
    role: "Computer Science '23 — Software Engineer Intern",
    avatar: "SP",
  },
  {
    quote: "As an alumni, I can confidently say that the leadership skills and technical expertise I gained from HIMASANTIKA were instrumental in building my career. The community is truly exceptional.",
    name: "Ahmad Rizky",
    role: "Alumni '20 — Senior Developer at Tokopedia",
    avatar: "AR",
  },
  {
    quote: "HIMASANTIKA represents the gold standard for student organizations. Their events are professional, their members are passionate, and their impact on student development is remarkable.",
    name: "Dr. Maya Sari",
    role: "Faculty Advisor — Computer Science Department",
    avatar: "MS",
  },
  {
    quote: "The AI study club and bootcamps accelerated my learning beyond what classroom education could provide. I built my first ML model within weeks of joining.",
    name: "Budi Santoso",
    role: "Data Science '24 — ML Engineer Intern",
    avatar: "BS",
  },
];

const FAQS = [
  { q: "How do I join HIMASANTIKA?", a: "Registration opens every semester through our website and social media. Simply fill out the registration form, attend the orientation session, and choose your preferred division. All Informatics students are welcome regardless of experience level." },
  { q: "Do I need prior experience in programming?", a: "Not at all! HIMASANTIKA welcomes students of all skill levels. We offer beginner-friendly workshops, mentorship programs, and study clubs designed to help you build a strong foundation in technology." },
  { q: "What divisions can I join?", a: "We offer 10 specialized divisions: Programming, UI/UX Design, AI, Cybersecurity, Web Dev, Mobile Dev, Multimedia, Public Relations, R&D, and Entrepreneurship. You can join one primary division and participate in activities across others." },
  { q: "Are there membership fees?", a: "HIMASANTIKA charges a minimal annual membership fee that covers event materials, certificates, and organizational resources. Scholarships are available for students with financial constraints." },
  { q: "Can I participate in competitions?", a: "Absolutely! We actively encourage and support members in national and international competitions. We provide training, mentorship, and funding support for competition teams." },
  { q: "How does HIMASANTIKA help with career development?", a: "We organize career workshops, resume reviews, mock interviews, and networking events with industry professionals. Our alumni network spanning major tech companies provides valuable mentorship and job referral opportunities." },
];

/* ════════════════════════════════════════════════════════
   HOOKS
   ════════════════════════════════════════════════════════ */

function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function useCounter(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

/* ════════════════════════════════════════════════════════
   COMPONENTS
   ════════════════════════════════════════════════════════ */

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-black/[.04]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-12 h-[72px]">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group" aria-label="HIMASANTIKA Home">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg font-[family-name:var(--font-heading)] shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            H
          </div>
          <span className="text-lg font-bold font-[family-name:var(--font-heading)] tracking-tight hidden sm:block">
            HIMA<span className="gradient-text">SANTIKA</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link font-[family-name:var(--font-body)]">
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-4">
          <a href="#cta" className="btn-primary !py-2.5 !px-6 !text-sm !rounded-xl hidden sm:inline-flex">
            Join HIMASANTIKA
          </a>
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-text rounded-full transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-text rounded-full transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-text rounded-full transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/20 animate-fade-in">
          <div className="flex flex-col p-6 gap-4">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-base font-[family-name:var(--font-body)]" onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#cta" className="btn-primary !text-sm mt-2" onClick={() => setMobileOpen(false)}>
              Join HIMASANTIKA
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center hero-mesh overflow-hidden">
      {/* Floating shapes */}
      <div className="float-shape w-[500px] h-[500px] bg-primary/20 -top-40 -left-40 animate-pulse-glow" />
      <div className="float-shape w-[400px] h-[400px] bg-secondary/20 top-1/3 -right-40 animate-pulse-glow delay-200" />
      <div className="float-shape w-[300px] h-[300px] bg-accent/15 bottom-20 left-1/4 animate-pulse-glow delay-400" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-24 pb-16">
        {/* Text */}
        <div className="flex flex-col gap-8 relative z-10">
          <div className="section-badge w-fit animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Himpunan Mahasiswa Informatika
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight font-[family-name:var(--font-heading)] animate-fade-in-up"
            style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
          >
            Empowering{" "}
            <span className="gradient-text">Future Tech</span>{" "}
            Leaders
          </h1>

          <p
            className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-xl font-[family-name:var(--font-body)] animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
          >
            HIMASANTIKA is a premier hub for innovation, leadership, collaboration, and technology — where aspiring tech professionals transform ideas into impact.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.55s", opacity: 0, animationFillMode: "forwards" }}
          >
            <a href="#cta" className="btn-primary text-base">
              <span>Join Us</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#programs" className="btn-secondary text-base">
              Explore Activities
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="flex items-center gap-6 pt-4 animate-fade-in-up"
            style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}
          >
            <div className="flex -space-x-3">
              {["bg-primary","bg-secondary","bg-accent","bg-primary-dark"].map((c, i) => (
                <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                  {["A","B","C","D"][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-text font-[family-name:var(--font-heading)]">500+ Active Members</p>
              <p className="text-xs text-text-muted">Join our growing community</p>
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div
          className="relative flex items-center justify-center animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="relative w-full max-w-lg aspect-square">
            {/* Glowing circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-pulse-glow" />

            {/* Central SVG Illustration */}
            <svg viewBox="0 0 400 400" className="relative z-10 w-full h-full drop-shadow-2xl" fill="none">
              {/* Circuit board background */}
              <circle cx="200" cy="200" r="160" stroke="url(#hero-grad)" strokeWidth="1" strokeDasharray="8 4" opacity="0.3" />
              <circle cx="200" cy="200" r="120" stroke="url(#hero-grad)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />

              {/* Code Brackets */}
              <g className="animate-float" style={{ animationDelay: "0s" }}>
                <rect x="80" y="100" width="72" height="56" rx="12" fill="url(#hero-grad)" fillOpacity="0.1" stroke="url(#hero-grad)" strokeWidth="1.5" />
                <text x="92" y="126" fill="#2563EB" fontSize="14" fontFamily="monospace" fontWeight="600">&lt;/&gt;</text>
                <text x="92" y="144" fill="#38BDF8" fontSize="10" fontFamily="monospace">code</text>
              </g>

              {/* AI Brain */}
              <g className="animate-float" style={{ animationDelay: "1s" }}>
                <rect x="248" y="80" width="72" height="56" rx="12" fill="url(#hero-grad2)" fillOpacity="0.1" stroke="url(#hero-grad2)" strokeWidth="1.5" />
                <text x="264" y="108" fill="#8B5CF6" fontSize="20">🧠</text>
                <text x="260" y="126" fill="#8B5CF6" fontSize="10" fontFamily="monospace">AI/ML</text>
              </g>

              {/* Cloud */}
              <g className="animate-float" style={{ animationDelay: "2s" }}>
                <rect x="260" y="220" width="72" height="56" rx="12" fill="url(#hero-grad)" fillOpacity="0.1" stroke="url(#hero-grad)" strokeWidth="1.5" />
                <text x="276" y="248" fill="#2563EB" fontSize="20">☁️</text>
                <text x="270" y="266" fill="#38BDF8" fontSize="9" fontFamily="monospace">Cloud</text>
              </g>

              {/* Shield */}
              <g className="animate-float" style={{ animationDelay: "3s" }}>
                <rect x="68" y="240" width="72" height="56" rx="12" fill="url(#hero-grad2)" fillOpacity="0.1" stroke="url(#hero-grad2)" strokeWidth="1.5" />
                <text x="84" y="268" fill="#8B5CF6" fontSize="20">🛡️</text>
                <text x="80" y="286" fill="#8B5CF6" fontSize="9" fontFamily="monospace">Secure</text>
              </g>

              {/* Central Hub */}
              <circle cx="200" cy="200" r="44" fill="url(#hero-grad)" fillOpacity="0.12" stroke="url(#hero-grad)" strokeWidth="2" />
              <circle cx="200" cy="200" r="28" fill="url(#hero-grad)" />
              <text x="189" y="205" fill="white" fontSize="16" fontWeight="bold" fontFamily="monospace">H</text>

              {/* Connection Lines */}
              <line x1="152" y1="128" x2="172" y2="185" stroke="url(#hero-grad)" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />
              <line x1="248" y1="108" x2="228" y2="180" stroke="url(#hero-grad2)" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />
              <line x1="260" y1="248" x2="230" y2="218" stroke="url(#hero-grad)" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />
              <line x1="140" y1="268" x2="175" y2="218" stroke="url(#hero-grad2)" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />

              {/* Floating dots */}
              {[{cx:170,cy:140},{cx:240,cy:155},{cx:150,cy:250},{cx:250,cy:275},{cx:200,cy:320},{cx:130,cy:180},{cx:280,cy:180}].map((d,i) => (
                <circle key={i} cx={d.cx} cy={d.cy} r="3" fill={i%2===0?"#2563EB":"#8B5CF6"} opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2+i*0.5}s`} repeatCount="indefinite" />
                </circle>
              ))}

              <defs>
                <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <linearGradient id="hero-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.2s", opacity: 0, animationFillMode: "forwards" }}>
        <span className="text-xs text-text-muted font-medium tracking-wider uppercase">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-text-muted/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ── Section Wrapper ── */
function Section({ id, children, className = "", dark = false }) {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section
      id={id}
      ref={ref}
      className={`section-padding relative overflow-hidden ${dark ? "bg-bg-dark text-white" : ""} ${className} ${isVisible ? "visible" : ""}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {typeof children === "function" ? children(isVisible) : children}
      </div>
    </section>
  );
}

/* ── Section Header ── */
function SectionHeader({ badge, title, subtitle, center = true, light = false }) {
  return (
    <div className={`flex flex-col gap-5 mb-16 ${center ? "items-center text-center" : ""}`}>
      <div className="section-badge w-fit">{badge}</div>
      <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)] ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl leading-relaxed ${light ? "text-white/70" : "text-text-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── About ── */
function About() {
  return (
    <Section id="about">
      {(isVisible) => (
        <>
          <SectionHeader
            badge="✦ About Us"
            title={<>The Story Behind <span className="gradient-text">HIMASANTIKA</span></>}
            subtitle="Building a legacy of technological excellence, innovation, and community-driven impact since our founding."
          />

          {/* Vision & Mission */}
          <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Vision */}
            <div className="premium-card p-8 sm:p-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Our Vision</h3>
              <p className="text-text-muted leading-relaxed text-base">
                To become the most innovative and impactful student technology organization in the nation, producing world-class tech talent who drive digital transformation and create positive change in society.
              </p>
            </div>

            {/* Mission */}
            <div className="premium-card p-8 sm:p-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Our Mission</h3>
              <ul className="space-y-3 text-text-muted text-base">
                {[
                  "Foster a culture of continuous learning and technological excellence",
                  "Provide world-class workshops, hackathons, and competitive programming training",
                  "Bridge the gap between academia and industry through partnerships",
                  "Empower students to become leaders, innovators, and change-makers",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Values */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {[
              { icon: "🎯", title: "Excellence", desc: "Striving for the highest standards in everything we do" },
              { icon: "🤝", title: "Integrity", desc: "Operating with transparency, honesty, and ethical responsibility" },
              { icon: "🌍", title: "Inclusivity", desc: "Welcoming diverse perspectives and backgrounds" },
              { icon: "💡", title: "Curiosity", desc: "Nurturing an insatiable hunger for knowledge and discovery" },
            ].map((val, i) => (
              <div key={i} className="premium-card p-6 text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{val.icon}</div>
                <h4 className="font-bold text-lg font-[family-name:var(--font-heading)] mb-2">{val.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

/* ── Why HIMASANTIKA ── */
function WhySection() {
  return (
    <Section id="why" className="bg-gradient-to-b from-bg to-white">
      {(isVisible) => (
        <>
          <SectionHeader
            badge="✦ Why Us"
            title={<>Why Choose <span className="gradient-text">HIMASANTIKA</span>?</>}
            subtitle="Four pillars that define our commitment to developing the next generation of technology leaders."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`gradient-border p-8 flex flex-col gap-5 group hover:shadow-xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">{f.icon}</div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${f.gradient} group-hover:w-full transition-all duration-500`} />
              </div>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

/* ── Divisions ── */
function Divisions() {
  return (
    <Section id="divisions">
      {(isVisible) => (
        <>
          <SectionHeader
            badge="✦ Divisions"
            title={<>Explore Our <span className="gradient-text">Divisions</span></>}
            subtitle="Ten specialized divisions offering deep-dive learning paths across the entire technology spectrum."
          />
          <div className="bento-grid">
            {DIVISIONS.map((d, i) => (
              <div
                key={i}
                className={`${d.size} premium-card p-6 sm:p-8 flex flex-col justify-between group cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 80}ms`, transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)" }}
              >
                <div>
                  <span className="text-4xl mb-4 block group-hover:scale-125 transition-transform duration-500">{d.icon}</span>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2 group-hover:text-primary transition-colors">{d.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{d.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

/* ── Programs ── */
function Programs() {
  return (
    <Section id="programs" className="bg-gradient-to-b from-white to-bg">
      {(isVisible) => (
        <>
          <SectionHeader
            badge="✦ Programs"
            title={<>Programs & <span className="gradient-text">Activities</span></>}
            subtitle="A dynamic calendar of events designed to accelerate your growth as a technology professional."
          />
          <div className="relative">
            {/* Timeline line */}
            <div className="timeline-line hidden md:block" />

            <div className="flex flex-col gap-12">
              {PROGRAMS.map((p, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{ transitionDelay: `${i * 100}ms`, transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)" }}
                  >
                    {/* Card */}
                    <div className={`md:w-[calc(50%-40px)] premium-card p-6 sm:p-8 group hover:glow-primary ${isLeft ? "md:text-right" : ""}`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                        <span className="text-2xl">{p.icon}</span>
                        <span className="text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">{p.period}</span>
                      </div>
                      <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed">{p.desc}</p>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent items-center justify-center z-10 shadow-lg shadow-primary/25 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-[calc(50%-40px)]" />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Section>
  );
}

/* ── Stats ── */
function StatCounter({ stat, isVisible }) {
  const count = useCounter(stat.value, isVisible);
  return (
    <div className="glass-card rounded-3xl p-8 text-center group hover:bg-white/80 transition-all duration-300">
      <div className="text-5xl sm:text-6xl font-extrabold gradient-text font-[family-name:var(--font-heading)] mb-2">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <p className="text-text-muted font-medium text-base">{stat.label}</p>
    </div>
  );
}

function Statistics() {
  return (
    <Section id="stats" className="bg-gradient-to-br from-bg-dark via-[#131B2E] to-bg-dark" dark>
      {(isVisible) => (
        <>
          {/* Floating shapes */}
          <div className="float-shape w-[300px] h-[300px] bg-primary/10 -top-20 -right-20 animate-pulse-glow" />
          <div className="float-shape w-[200px] h-[200px] bg-accent/10 bottom-10 -left-20 animate-pulse-glow delay-300" />

          <SectionHeader
            badge="✦ Achievements"
            title={<>Our Impact in <span className="gradient-text">Numbers</span></>}
            subtitle="A testament to years of dedication, growth, and collective achievement."
            light
          />
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {STATS.map((stat, i) => (
              <StatCounter key={i} stat={stat} isVisible={isVisible} />
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

/* ── Gallery ── */
function Gallery() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter);

  return (
    <Section id="gallery">
      {(isVisible) => (
        <>
          <SectionHeader
            badge="✦ Gallery"
            title={<>Moments That <span className="gradient-text">Matter</span></>}
            subtitle="A visual journey through our events, workshops, competitions, and community initiatives."
          />

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 font-[family-name:var(--font-heading)] ${
                  filter === f
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25"
                    : "bg-white text-text-muted border border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry */}
          <div className="masonry">
            {filtered.map((item, i) => (
              <div
                key={item.src}
                className={`relative group rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`relative ${item.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold text-primary bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit mb-2">{item.category}</span>
                  <h3 className="text-white font-bold text-lg font-[family-name:var(--font-heading)]">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

/* ── Testimonials ── */
function Testimonials() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => setActive((p) => (p + 1) % TESTIMONIALS.length), []);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const goTo = (i) => {
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  return (
    <Section id="testimonials" className="bg-gradient-to-b from-bg to-white">
      {(isVisible) => (
        <>
          <SectionHeader
            badge="✦ Testimonials"
            title={<>What People <span className="gradient-text">Say</span></>}
            subtitle="Hear from students, alumni, and faculty about their HIMASANTIKA experience."
          />
          <div className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Card */}
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative">
              {/* Quote mark */}
              <div className="text-6xl gradient-text font-serif leading-none mb-4">&ldquo;</div>

              <p className="text-lg sm:text-xl text-text leading-relaxed mb-8 font-[family-name:var(--font-body)] min-h-[120px]">
                {TESTIMONIALS[active].quote}
              </p>

              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                  {TESTIMONIALS[active].avatar}
                </div>
                <div>
                  <p className="font-bold font-[family-name:var(--font-heading)] text-base">{TESTIMONIALS[active].name}</p>
                  <p className="text-sm text-text-muted">{TESTIMONIALS[active].role}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-8 bg-gradient-to-r from-primary to-accent" : "w-2.5 bg-border hover:bg-text-light"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </Section>
  );
}

/* ── Partners ── */
function Partners() {
  const partners = [
    "Google", "Microsoft", "AWS", "GitHub", "Figma", "JetBrains",
    "Meta", "IBM", "Intel", "NVIDIA", "Oracle", "Cisco",
  ];

  return (
    <Section id="partners">
      {(isVisible) => (
        <>
          <SectionHeader
            badge="✦ Partners"
            title={<>Trusted by <span className="gradient-text">Industry Leaders</span></>}
            subtitle="We collaborate with leading technology companies, universities, and communities worldwide."
          />
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {partners.map((name, i) => (
              <div
                key={i}
                className="premium-card p-6 flex items-center justify-center partner-logo group cursor-pointer"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/8 to-accent/8 flex items-center justify-center group-hover:from-primary/16 group-hover:to-accent/16 transition-all">
                    <span className="text-xl font-bold gradient-text font-[family-name:var(--font-heading)]">{name[0]}</span>
                  </div>
                  <span className="text-xs font-semibold text-text-muted group-hover:text-text transition-colors">{name}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <Section id="faq" className="bg-gradient-to-b from-white to-bg">
      {(isVisible) => (
        <>
          <SectionHeader
            badge="✦ FAQ"
            title={<>Frequently Asked <span className="gradient-text">Questions</span></>}
            subtitle="Everything you need to know about joining and participating in HIMASANTIKA."
          />
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`premium-card overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${openIdx === i ? "glow-primary" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
                  aria-expanded={openIdx === i}
                >
                  <span className="font-bold text-base sm:text-lg font-[family-name:var(--font-heading)] pr-8">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 transition-transform duration-500 ${openIdx === i ? "rotate-45" : ""}`}>
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
                <div className={`accordion-content ${openIdx === i ? "open" : ""}`}>
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-text-muted leading-relaxed text-base">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

/* ── Final CTA ── */
function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden">
      <div className="cta-gradient py-24 sm:py-32 relative">
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 rounded-full bg-white/10 -top-20 -left-20 animate-float-slow" />
          <div className="absolute w-48 h-48 rounded-full bg-white/5 top-1/2 right-10 animate-float" />
          <div className="absolute w-32 h-32 rounded-full bg-white/8 bottom-10 left-1/3 animate-float-slow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur text-white text-sm font-semibold mb-8 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Registration Open
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] mb-6 max-w-4xl mx-auto leading-tight tracking-tight">
            Become Part of the Next Generation of{" "}
            <span className="underline decoration-white/30 decoration-4 underline-offset-8">Digital Innovators</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards an extraordinary journey in technology. Your future starts here.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-bold text-lg rounded-2xl shadow-2xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 font-[family-name:var(--font-heading)]"
          >
            Join HIMASANTIKA Today
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer id="contact" className="bg-bg-dark text-white/80 pt-20 pb-8 relative overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25">H</div>
              <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-white">HIMASANTIKA</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Himpunan Mahasiswa Informatika — Empowering future tech leaders through innovation, collaboration, and excellence.
            </p>
            <div className="flex gap-3">
              {[
                { label: "GitHub", icon: <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /> },
                { label: "Instagram", icon: <><rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5" stroke="currentColor" fill="none" /><circle cx="12" cy="12" r="5" strokeWidth="1.5" stroke="currentColor" fill="none" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></> },
                { label: "LinkedIn", icon: <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /> },
                { label: "Twitter", icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /> },
              ].map((s, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all duration-300" aria-label={s.label}>
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white font-[family-name:var(--font-heading)] mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {["About Us", "Divisions", "Programs", "Gallery", "Achievements", "FAQ"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s/g, "")}`} className="text-sm text-white/50 hover:text-primary transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white font-[family-name:var(--font-heading)] mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-sm text-white/50">himasantika@university.ac.id</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-sm text-white/50">Faculty of Computer Science, University Building, 3rd Floor</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-sm text-white/50">+62 812-3456-7890</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white font-[family-name:var(--font-heading)] mb-6 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-white/50 mb-4">Subscribe to our newsletter for the latest updates, events, and opportunities.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                aria-label="Email address"
              />
              <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} HIMASANTIKA. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Code of Conduct"].map((link) => (
              <a key={link} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhySection />
      <Divisions />
      <Programs />
      <Statistics />
      <Gallery />
      <Testimonials />
      <Partners />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
