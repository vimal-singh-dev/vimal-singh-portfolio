/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { ProjectItem } from '../types';
import { 
  ArrowUpRight, 
  Github, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Calendar,
  Box,
  Cpu,
  Workflow
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { audioManager } from '../services/audioService';

interface ProjectTimelineProps {
  projects: ProjectItem[];
  onOpenDetails: (project: ProjectItem) => void;
}

// Category Icons
const getProjectCategoryIcon = (category: string) => {
  switch (category) {
    case 'Productivity':
      return <Workflow className="w-4 h-4 text-[#e9c46a]" />;
    case 'Forensics & Analysis':
      return <Terminal className="w-4 h-4 text-[#06b6d4]" />;
    case 'Security & Utilities':
      return <ShieldCheck className="w-4 h-4 text-[#81b29a]" />;
    default:
      return <Box className="w-4 h-4 text-[#c26747]" />;
  }
};

interface TimelineItemProps {
  project: ProjectItem;
  index: number;
  isEven: boolean;
  total: number;
  onOpenDetails: (project: ProjectItem) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  project,
  index,
  isEven,
  total,
  onOpenDetails,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;

    setRotateX(rX);
    setRotateY(rY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.12 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioManager.playTone(300 + index * 45, 'sine', 0.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div className="relative mb-16 sm:mb-24 last:mb-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Project Card (Alternating on Desktop) */}
        <motion.div
          initial={{ 
            opacity: 0, 
            x: isEven ? 40 : -40, 
            filter: 'blur(10px)',
            scale: 0.98 
          }}
          whileInView={{ 
            opacity: 1, 
            x: 0, 
            filter: 'blur(0px)',
            scale: 1 
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-20 ${
            isEven ? 'lg:col-start-2 lg:pl-10' : 'lg:col-start-1 lg:pr-10'
          } pl-12 lg:pl-0`}
        >
          {/* Card Container with 3D Tilt */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              audioManager.playClick();
              onOpenDetails(project);
            }}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? -4 : 0}px)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            className="group relative rounded-3xl bg-[#171513]/90 border border-[#2b2723] hover:border-[#c26747]/60 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#c26747]/10 transition-colors cursor-pointer overflow-hidden"
            data-cursor="inspect"
          >
            {/* Dynamic Interactive Glare Reflection */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(245, 242, 235, ${glarePos.opacity}) 0%, transparent 65%)`,
              }}
            />

            {/* Subtle Corner Glow on Hover */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#c26747]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c26747]/20 group-hover:scale-125 transition-all duration-500" />

            <div className="relative z-10">
              {/* Card Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#24201c] pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#221f1c] border border-[#332e29]">
                    {getProjectCategoryIcon(project.category)}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#a89f91]">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#221f1c] text-[#c26747] border border-[#332e29]">
                    MILESTONE {formattedIndex}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-serif-display font-semibold text-[#f5f2eb] group-hover:text-[#e8b298] transition-colors mb-3 leading-snug">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[#a89f91] text-sm leading-relaxed mb-4 font-light">
                {project.description}
              </p>

              {/* Extended Details / Architectural Focus if available */}
              {project.details && (
                <div className="p-3.5 rounded-xl bg-[#1f1b18] border border-[#2b2723] text-xs text-[#c7bfb3] font-light leading-relaxed mb-5">
                  <span className="text-[#c26747] font-mono font-medium block text-[10px] uppercase tracking-wider mb-1">
                    System Architecture Note:
                  </span>
                  {project.details}
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#221f1c] text-[#d6cec2] group-hover:text-[#f5f2eb] border border-[#332e29] group-hover:border-[#423b34] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-4 border-t border-[#24201c] flex items-center justify-between text-xs font-mono relative z-10">
              <span className="text-[#c26747] font-medium flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>View Architecture & 3D Model</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </span>

              {project.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  whileTap={{ scale: 0.94 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-xl bg-[#221f1c] text-[#a89f91] hover:text-[#f5f2eb] hover:bg-[#2b2723] border border-[#332e29] hover:border-[#c26747]/50 transition-colors"
                  data-cursor="launch"
                  title="Explore Code on GitHub"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Opposite Info / Narrative Column (Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`hidden lg:flex flex-col justify-center ${
            isEven ? 'lg:col-start-1 lg:text-right lg:pr-10' : 'lg:col-start-2 lg:text-left lg:pl-10'
          }`}
        >
          <div className="space-y-3">
            <span className="text-4xl font-serif-display font-medium text-[#38322c] select-none block">
              {formattedIndex} / {String(total).padStart(2, '0')}
            </span>
            <div className="text-xs font-mono text-[#c26747] uppercase tracking-widest">
              {project.category}
            </div>
            <h4 className="text-xl font-serif-display text-[#e8b298] italic">
              {project.title}
            </h4>
            <p className="text-xs text-[#8c8273] font-mono max-w-sm font-light inline-block leading-relaxed">
              Interactive artifact engineered with high-integrity code structure and dedicated technical discipline.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Central Timeline Node (Desktop Centered, Mobile Left) */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 left-3.5 lg:left-1/2 lg:-translate-x-1/2 z-30 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Pulsing Aura Ring */}
          <div className="absolute w-12 h-12 rounded-full bg-[#c26747]/20 animate-ping opacity-60 pointer-events-none" />
          
          {/* Main Node Shell */}
          <div className="w-9 h-9 rounded-full bg-[#171513] border-2 border-[#c26747] shadow-lg shadow-[#c26747]/40 flex items-center justify-center text-[11px] font-mono font-bold text-[#f5f2eb] relative z-10">
            <span>{formattedIndex}</span>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Branch Connector Line to Card (Desktop) */}
      <div
        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r ${
          isEven
            ? 'left-1/2 w-10 from-[#c26747] to-transparent origin-left'
            : 'right-1/2 w-10 from-transparent to-[#c26747] origin-right'
        } pointer-events-none z-10 opacity-70`}
      />

      {/* Horizontal Branch Connector Line (Mobile) */}
      <div
        className="lg:hidden absolute top-1/2 -translate-y-1/2 left-4 w-8 h-[1.5px] bg-gradient-to-r from-[#c26747] to-transparent pointer-events-none z-10 opacity-80"
      />
    </div>
  );
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects, onOpenDetails }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic Scroll Progress along the Timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  });

  // Smooth Spring for the glowing beam
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative py-6">
      
      {/* Background Vertical Base Rail Track */}
      <div className="absolute top-0 bottom-0 left-3.5 lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-[#24201c] z-0" />

      {/* Active Glowing Electric Laser / Amber Beam that fills down on scroll */}
      <motion.div
        style={{ scaleY }}
        className="absolute top-0 bottom-0 left-3.5 lg:left-1/2 lg:-translate-x-1/2 w-[2.5px] bg-gradient-to-b from-[#e9c46a] via-[#c26747] to-[#e9c46a] origin-top z-10 shadow-[0_0_12px_#c26747]"
      />

      {/* Top Spine Terminal Node */}
      <div className="absolute -top-3 left-3.5 lg:left-1/2 lg:-translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#c26747] border border-[#e9c46a] z-20 shadow-md shadow-[#c26747]/50" />

      {/* Bottom Spine Terminal Node */}
      <div className="absolute -bottom-3 left-3.5 lg:left-1/2 lg:-translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#c26747] border border-[#e9c46a] z-20 shadow-md shadow-[#c26747]/50" />

      {/* Timeline Project Items */}
      <div className="relative z-10">
        {projects.map((project, index) => (
          <TimelineItem
            key={project.id}
            project={project}
            index={index}
            isEven={index % 2 === 1}
            total={projects.length}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;
