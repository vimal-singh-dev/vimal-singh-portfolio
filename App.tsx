/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  GraduationCap, 
  Award, 
  Mail, 
  FileText, 
  Volume2, 
  VolumeX, 
  Github, 
  Linkedin, 
  Download, 
  ArrowUpRight, 
  Menu, 
  X, 
  Check, 
  Code2, 
  Globe,
  BookOpen,
  Target,
  ShieldCheck,
  MapPin,
  Phone
} from 'lucide-react';

// Types & Data
import { ResumeData, ProjectItem, ViewMode } from './types';
import { INITIAL_RESUME_DATA } from './data/resumeData';

// Services
import { audioManager } from './services/audioService';

// Components
import FluidBackground from './components/FluidBackground';
import InteractiveCursor from './components/InteractiveCursor';
import SkillsGrid from './components/SkillsGrid';
import ProjectTimeline from './components/ProjectTimeline';
import ProjectModal from './components/ProjectModal';
import ClassicResumeView from './components/ClassicResumeView';
import ContactPortal from './components/ContactPortal';
import GlowCard from './components/GlowCard';
import TypewriterRole from './components/TypewriterRole';
import AIChat from './components/AIChat';

// Artistic Staggered Blur-In Variants
const sectionRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 36, 
    filter: 'blur(12px)',
    scale: 0.985
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    scale: 1,
    transition: { 
      duration: 0.85, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const sectionHeaderVariants = {
  hidden: { 
    opacity: 0, 
    y: 28,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.75, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const cardStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    }
  }
};

const cardStaggerItem = {
  hidden: { 
    opacity: 0, 
    y: 28, 
    filter: 'blur(10px)',
    scale: 0.97
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { 
      duration: 0.65, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [viewMode, setViewMode] = useState<ViewMode>('immersive');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleSound = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    audioManager.playClick();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadCV = () => {
    audioManager.playSuccess();
    setViewMode('resume');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="relative min-h-screen text-[#f5f2eb] selection:bg-[#c26747] selection:text-[#0e0d0c] overflow-x-hidden font-sans">
      {/* Scroll Progress Bar at the very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#c26747] via-[#e9c46a] to-[#c26747] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Simple Artistic Cursor */}
      <InteractiveCursor />

      {/* Warm Ambient Background */}
      <FluidBackground />

      {/* AI Resume Assistant */}
      <AIChat />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0e0d0c]/85 backdrop-blur-md border-b border-[#24201c] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3.5 cursor-pointer group"
            data-cursor="hover"
          >
            <div className="relative w-10 h-10 rounded-xl bg-[#1c1917] border border-[#332e29] group-hover:border-[#c26747] group-hover:shadow-md group-hover:shadow-[#c26747]/20 flex items-center justify-center font-serif-display font-bold text-[#f5f2eb] text-base transition-all duration-300 overflow-hidden">
              <span>VS</span>
            </div>
            <div>
              <div className="font-serif-display font-semibold tracking-wide text-[#f5f2eb] group-hover:text-[#e8b298] transition-colors text-base flex items-center gap-2">
                <span>{resumeData.personalInfo.name}</span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#221f1c] text-[#c26747] border border-[#332e29]">
                  IT '27
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8c8273] block font-light">
                {resumeData.personalInfo.college}
              </span>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            {[
              { id: 'hero', label: 'Overview', marker: '01' },
              { id: 'skills', label: 'Skills', marker: '02' },
              { id: 'projects', label: 'Projects', marker: '03' },
              { id: 'education', label: 'Education', marker: '04' },
              { id: 'certifications', label: 'Certifications', marker: '05' },
              { id: 'contact', label: 'Contact', marker: '06' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[#a89f91] hover:text-[#f5f2eb] transition-colors relative py-1 group font-light flex items-center gap-1.5"
                data-cursor="hover"
              >
                <span className="text-[9px] text-[#c26747]/70 group-hover:text-[#c26747] font-mono">{link.marker}</span>
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c26747] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Header Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border transition-all ${
                !isMuted 
                  ? 'bg-[#26221f] border-[#c26747]/60 text-[#c26747] shadow-sm shadow-[#c26747]/20' 
                  : 'bg-[#171513] border-[#2b2723] text-[#8c8273] hover:text-[#f5f2eb]'
              }`}
              title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
              data-cursor="hover"
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>

            {/* View Switcher Button (Gallery vs ATS Resume) */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                audioManager.playClick();
                setViewMode(viewMode === 'immersive' ? 'resume' : 'immersive');
              }}
              className="px-4 py-2 rounded-xl bg-[#1c1917] hover:bg-[#24201c] border border-[#2e2a25] hover:border-[#3d3730] text-[#d6cec2] text-xs font-mono flex items-center gap-2 transition-colors shadow-sm"
              data-cursor="hover"
            >
              <FileText className="w-3.5 h-3.5 text-[#c26747]" />
              <span>{viewMode === 'immersive' ? 'Printable Resume' : 'Portfolio View'}</span>
            </motion.button>

            {/* Contact CTA */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-xl bg-[#c26747] hover:bg-[#d47858] text-[#0e0d0c] font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-[#c26747]/20"
              data-cursor="launch"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#171513] border border-[#2b2723] text-[#f5f2eb]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-20 z-30 bg-[#0e0d0c]/95 backdrop-blur-xl p-6 flex flex-col justify-between lg:hidden border-b border-[#24201c]"
          >
            <div className="space-y-3">
              {[
                { id: 'hero', label: 'Overview', marker: '01' },
                { id: 'skills', label: 'Skills', marker: '02' },
                { id: 'projects', label: 'Projects', marker: '03' },
                { id: 'education', label: 'Education', marker: '04' },
                { id: 'certifications', label: 'Certifications', marker: '05' },
                { id: 'contact', label: 'Contact', marker: '06' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="w-full text-left py-3 text-xl font-serif-display text-[#f5f2eb] hover:text-[#c26747] border-b border-[#24201c] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[#c26747]">0{link.marker}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-[#24201c]">
              <button
                onClick={() => {
                  setViewMode(viewMode === 'immersive' ? 'resume' : 'immersive');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-[#1c1917] border border-[#2e2a25] text-[#f5f2eb] text-xs font-mono font-medium flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#c26747]" />
                <span>{viewMode === 'immersive' ? 'Printable Resume Sheet' : 'Portfolio Exhibition'}</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full py-3.5 rounded-xl bg-[#c26747] text-[#0e0d0c] font-semibold text-sm text-center"
              >
                Contact & Collaboration
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW SWITCHER */}
      {viewMode === 'resume' ? (
        <div className="pt-24 min-h-screen">
          <ClassicResumeView
            data={resumeData}
            onBackTo3D={() => setViewMode('immersive')}
          />
        </div>
      ) : (
        /* SIMPLE ARTISTIC PORTFOLIO WITH STAGGERED BLUR-IN REVEAL TRANSITIONS */
        <main className="relative pt-24 pb-20 space-y-28 md:space-y-36 z-20">
          
          {/* 1. HERO SECTION */}
          <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(100vh-8rem)] flex flex-col justify-center relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Profile Info with staggered blur-in entry */}
              <motion.div 
                initial={{ opacity: 0, x: -30, filter: 'blur(12px)', scale: 0.98 }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-7"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1c1917] border border-[#2e2a25]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#81b29a] animate-pulse" />
                    <span className="text-xs font-mono text-[#c26747] tracking-wider uppercase">
                      {resumeData.personalInfo.status}
                    </span>
                  </motion.div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171513]/90 border border-[#332e29] text-[11px] font-mono text-[#e9c46a]">
                    <span>CANDIDATE PROFILE</span>
                  </div>
                </div>

                <div>
                  <h1 className="text-5xl sm:text-7xl font-serif-display font-medium text-[#f5f2eb] tracking-tight leading-[1.08] mb-3">
                    {resumeData.personalInfo.name}
                  </h1>
                  <div className="mb-4">
                    <TypewriterRole 
                      roles={[
                        resumeData.personalInfo.role,
                        'Aspiring Software Engineer',
                        'Cloud & DevOps Enthusiast',
                        'Python & Backend Developer',
                        'Forensics & Systems Explorer'
                      ]} 
                    />
                  </div>

                  <p className="text-xs sm:text-sm font-mono text-[#8c8273] mb-5 tracking-wide">
                    {resumeData.personalInfo.college} • {resumeData.personalInfo.location}
                  </p>

                  <p className="text-[#c7bfb3] text-sm sm:text-base max-w-2xl leading-relaxed font-light">
                    {resumeData.personalInfo.profile || resumeData.personalInfo.summary}
                  </p>
                </div>

                {/* Career Objective Quote Box */}
                <GlowCard 
                  glowColor="#c26747"
                  glowRadius={350}
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-2xl bg-[#171513]/90 border border-[#2b2723] hover:border-[#c26747]/50 text-xs text-[#a89f91] space-y-1.5 transition-colors shadow-lg"
                >
                  <div className="text-[11px] font-mono text-[#c26747] font-semibold uppercase tracking-wider flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-[#c26747]" />
                    <span>Career Objective</span>
                  </div>
                  <p className="leading-relaxed font-light">{resumeData.personalInfo.objective}</p>
                </GlowCard>

                {/* CTAs with spring micro-interactions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => scrollTo('projects')}
                    className="px-5 py-3 rounded-xl bg-[#c26747] hover:bg-[#d47858] text-[#0e0d0c] font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-[#c26747]/20 cursor-pointer"
                    data-cursor="launch"
                  >
                    <span>Explore Selected Works</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => scrollTo('skills')}
                    className="px-5 py-3 rounded-xl bg-[#1c1917] hover:bg-[#26221f] border border-[#2e2a25] hover:border-[#3d3730] text-[#f5f2eb] font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                    data-cursor="inspect"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#c26747]" />
                    <span>Technical Proficiencies</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDownloadCV}
                    className="px-4 py-3 rounded-xl bg-[#171513] hover:bg-[#221f1c] border border-[#2b2723] hover:border-[#3d3730] text-[#a89f91] hover:text-[#f5f2eb] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    data-cursor="hover"
                  >
                    <Download className="w-3.5 h-3.5 text-[#c26747]" />
                    <span>Printable Sheet</span>
                  </motion.button>
                </div>

                {/* Strengths Badges with hover pop */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono text-[#8c8273] uppercase tracking-widest block">Core Strengths & Discipline:</span>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.strengths.map((s, i) => (
                      <motion.span 
                        key={i} 
                        whileHover={{ scale: 1.05, y: -1 }}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#1c1917] text-[#d6cec2] hover:text-[#f5f2eb] border border-[#2b2723] hover:border-[#c26747]/50 font-mono flex items-center gap-2 transition-colors cursor-default shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c26747]" />
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Profile Plate with blur-in entrance & 3D hover */}
              <motion.div 
                initial={{ opacity: 0, x: 30, filter: 'blur(12px)', scale: 0.98 }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative"
              >
                <GlowCard 
                  glowColor="#c26747"
                  glowRadius={550}
                  hoverOpacity={0.22}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-[#171513]/90 border border-[#2b2723] hover:border-[#c26747]/60 backdrop-blur-md shadow-2xl p-7 md:p-9 space-y-6 relative overflow-hidden transition-colors"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#24201c] pb-4 text-xs font-mono text-[#8c8273] relative z-10">
                    <span className="text-[#c26747] font-medium tracking-wider uppercase flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>Academic Profile</span>
                    </span>
                    <span>Class of 2027</span>
                  </div>

                  {/* Institution Details */}
                  <div className="space-y-4 relative z-10">
                    <div>
                      <span className="text-[11px] font-mono text-[#8c8273] block uppercase tracking-wider mb-1">Academic Degree:</span>
                      <h3 className="text-2xl font-serif-display font-semibold text-[#f5f2eb]">
                        Bachelor of Technology
                      </h3>
                      <p className="text-sm font-serif-display italic text-[#e8b298]">
                        Information Technology (IT)
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#1f1b18] border border-[#2b2723] hover:border-[#38322c] space-y-1.5 transition-colors">
                      <div className="text-[#8c8273] text-xs font-mono">University Institution:</div>
                      <div className="text-sm font-medium text-[#f5f2eb]">{resumeData.personalInfo.college}</div>
                      <div className="text-[#81b29a] text-xs font-mono">2023 - 2027 • CGPA 6.52</div>
                    </div>

                    {/* Core Stack with interactive chips */}
                    <div className="space-y-2 text-xs font-mono">
                      <div className="text-[#8c8273] uppercase tracking-wider text-[11px]">Primary Core Stack:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Python', 'Java', 'C++', 'AWS', 'Linux', 'Docker (basics)', 'Git', 'REST APIs'].map((tech) => (
                          <motion.span 
                            key={tech} 
                            whileHover={{ scale: 1.06, y: -1 }}
                            className="px-2.5 py-1 rounded-md bg-[#221f1c] text-[#d6cec2] hover:text-[#f5f2eb] border border-[#332e29] hover:border-[#c26747]/40 text-[11px] transition-colors cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#24201c] flex items-center justify-between text-xs font-mono text-[#8c8273]">
                      <span>Availability: <span className="text-[#81b29a] font-medium">Open for Internship</span></span>
                      <span>Location: <span className="text-[#f5f2eb]">Kanpur, India</span></span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            </div>
          </section>

          {/* 2. SKILLS SECTION */}
          <motion.section 
            id="skills" 
            variants={sectionRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 relative"
          >
            <motion.div 
              variants={sectionHeaderVariants}
              className="mb-10 border-b border-[#24201c] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c26747]">
                    Disciplines & Proficiencies
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#221f1c] text-[#e9c46a] border border-[#332e29]">
                    CORE PROFICIENCIES
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif-display font-medium text-[#f5f2eb]">
                  Technical Stack & <span className="italic text-[#e8b298]">Tooling</span>
                </h2>
                <p className="text-[#a89f91] text-sm mt-2 max-w-xl font-light">
                  Proficiencies in Programming Languages, Web APIs, AWS Cloud infrastructure, Linux systems, and modern Developer Tooling.
                </p>
              </div>
            </motion.div>

            <SkillsGrid skills={resumeData.skills} />
          </motion.section>

          {/* 3. PROJECTS */}
          <motion.section 
            id="projects" 
            variants={sectionRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 relative"
          >
            <motion.div 
              variants={sectionHeaderVariants}
              className="mb-10 border-b border-[#24201c] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c26747]">
                    Selected Works
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#221f1c] text-[#e9c46a] border border-[#332e29]">
                    SELECTED PORTFOLIO
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif-display font-medium text-[#f5f2eb]">
                  Software Artifacts & <span className="italic text-[#e8b298]">Projects</span>
                </h2>
                <p className="text-[#a89f91] text-sm mt-2 max-w-xl font-light">
                  Engineering solutions spanning automated digital forensics analysis, secure data sanitization utilities, and task systems.
                </p>
              </div>
            </motion.div>

            <ProjectTimeline
              projects={resumeData.projects}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          </motion.section>

          {/* 4. EDUCATION & ACHIEVEMENTS */}
          <motion.section 
            id="education" 
            variants={sectionRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Education Column */}
              <div className="space-y-6">
                <motion.div 
                  variants={sectionHeaderVariants}
                  className="border-b border-[#24201c] pb-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#c26747]">
                      Academic Background
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#221f1c] text-[#c26747] border border-[#332e29]">
                      ACADEMIC RECORD
                    </span>
                  </div>
                  <h2 className="text-3xl font-serif-display font-medium text-[#f5f2eb]">
                    Education
                  </h2>
                </motion.div>

                <motion.div 
                  variants={cardStaggerContainer}
                  className="space-y-4"
                >
                  {resumeData.education.map((edu) => (
                    <GlowCard 
                      key={edu.id}
                      variants={cardStaggerItem}
                      glowColor="#c26747"
                      glowRadius={420}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="p-7 rounded-3xl bg-[#171513]/90 border border-[#2b2723] hover:border-[#c26747]/60 space-y-2 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#c26747]/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif-display font-semibold text-[#f5f2eb]">{edu.degree}</h3>
                        {edu.period && <span className="text-xs font-mono text-[#8c8273]">{edu.period}</span>}
                      </div>
                      <p className="text-sm font-serif-display italic text-[#e8b298]">{edu.institution}</p>
                      <div className="text-xs font-mono text-[#81b29a] font-medium pt-1">{edu.score}</div>
                    </GlowCard>
                  ))}
                </motion.div>
              </div>

              {/* Achievements Column */}
              <div className="space-y-6">
                <motion.div 
                  variants={sectionHeaderVariants}
                  className="border-b border-[#24201c] pb-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#c26747]">
                      Honors & Competitions
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#221f1c] text-[#e9c46a] border border-[#332e29]">
                      HONORS & RECOGNITION
                    </span>
                  </div>
                  <h2 className="text-3xl font-serif-display font-medium text-[#f5f2eb]">
                    Achievements
                  </h2>
                </motion.div>

                <motion.div 
                  variants={cardStaggerContainer}
                  className="space-y-4"
                >
                  {resumeData.achievements.map((ach) => (
                    <GlowCard 
                      key={ach.id}
                      variants={cardStaggerItem}
                      glowColor="#e9c46a"
                      glowRadius={420}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="p-7 rounded-3xl bg-[#171513]/90 border border-[#2b2723] hover:border-[#e9c46a]/60 space-y-3 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#e9c46a]/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-[#e9c46a]">
                        <Award className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase tracking-wider font-semibold">Competition Recognition</span>
                      </div>
                      <h3 className="text-xl font-serif-display font-semibold text-[#f5f2eb]">{ach.title}</h3>
                      <p className="text-xs font-mono text-[#a89f91]">{ach.organization}</p>
                    </GlowCard>
                  ))}
                </motion.div>
              </div>

            </div>
          </motion.section>

          {/* 5. CERTIFICATIONS */}
          <motion.section 
            id="certifications" 
            variants={sectionRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 relative"
          >
            <motion.div 
              variants={sectionHeaderVariants}
              className="mb-8 border-b border-[#24201c] pb-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c26747]">
                    Verified Credentials
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#221f1c] text-[#81b29a] border border-[#332e29]">
                    CERTIFICATIONS
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif-display font-medium text-[#f5f2eb]">
                  Certifications
                </h2>
              </div>
            </motion.div>

            <motion.div 
              variants={cardStaggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {resumeData.certifications.map((c) => (
                <GlowCard 
                  key={c.id}
                  variants={cardStaggerItem}
                  glowColor="#c26747"
                  glowRadius={360}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group p-6 rounded-2xl bg-[#171513]/90 border border-[#2b2723] hover:border-[#c26747]/60 transition-all flex items-start gap-4 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-[#c26747]/10 cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#221f1c] border border-[#332e29] group-hover:border-[#c26747]/50 group-hover:bg-[#2a2420] flex items-center justify-center text-[#c26747] shrink-0 mt-0.5 transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-serif-display font-semibold text-[#f5f2eb] group-hover:text-[#e8b298] transition-colors">{c.title}</h4>
                      <span className="text-xs font-mono text-[#8c8273] block mt-1">{c.issuer}</span>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </motion.div>
          </motion.section>

          {/* 6. CONTACT PORTAL */}
          <motion.section 
            id="contact" 
            variants={sectionRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 relative"
          >
            <ContactPortal personalInfo={resumeData.personalInfo} />
          </motion.section>

        </main>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <footer className="border-t border-[#24201c] bg-[#0c0b0a] py-10 px-4 sm:px-6 text-center text-xs font-mono text-[#8c8273] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[#f5f2eb] font-medium">{resumeData.personalInfo.name}</span>
            <span> • {resumeData.personalInfo.role} ({resumeData.personalInfo.college})</span>
          </div>

          <div className="flex items-center gap-6">
            <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-[#c26747] transition-colors">
              {resumeData.personalInfo.email}
            </a>
            <button onClick={() => scrollTo('hero')} className="hover:text-[#f5f2eb] transition-colors cursor-pointer">
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
