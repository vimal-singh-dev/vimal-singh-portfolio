/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { SkillItem } from '../types';
import { 
  Layers, 
  Code2, 
  Globe, 
  Cloud, 
  Wrench, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Server,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../services/audioService';

interface SkillsGridProps {
  skills: SkillItem[];
}

const CATEGORIES = ['All', 'Languages', 'Web', 'Cloud & DevOps', 'Tools'];

// Helper to get specialized category icon
const getCategoryIcon = (category: string, className: string = 'w-4 h-4') => {
  switch (category) {
    case 'Languages':
      return <Code2 className={className} />;
    case 'Web':
      return <Globe className={className} />;
    case 'Cloud & DevOps':
      return <Cloud className={className} />;
    case 'Tools':
      return <Wrench className={className} />;
    default:
      return <Layers className={className} />;
  }
};

// Helper for specific skill icons
const getSkillIcon = (id: string, category: string) => {
  switch (id) {
    case 'python':
    case 'java':
    case 'cpp':
    case 'javascript':
    case 'typescript':
      return <Code2 className="w-4 h-4" />;
    case 'html-css':
    case 'rest-apis':
      return <Globe className="w-4 h-4" />;
    case 'aws':
      return <Cloud className="w-4 h-4" />;
    case 'linux':
    case 'bash':
      return <Terminal className="w-4 h-4" />;
    case 'docker':
      return <Server className="w-4 h-4" />;
    case 'git':
      return <Workflow className="w-4 h-4" />;
    case 'vscode':
    case 'github':
    case 'postman':
      return <Cpu className="w-4 h-4" />;
    default:
      return getCategoryIcon(category);
  }
};

interface FloatingOrbProps {
  skill: SkillItem;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const FloatingSkillOrb: React.FC<FloatingOrbProps> = ({ skill, index, isHovered, onHover }) => {
  // Individualized asynchronous organic floating float duration & delays
  const floatDuration = 3.6 + (index % 4) * 0.7;
  const floatDelay = (index % 5) * 0.25;
  const floatYOffset = 6 + (index % 3) * 2;
  const floatXOffset = (index % 2 === 0 ? 3 : -3);

  // Derive glowing border and shadow colors
  const accentColor = skill.color || '#c26747';

  return (
    <motion.div
      // Organic Floating Motion Loop
      animate={
        isHovered
          ? { y: -4, x: 0, scale: 1.05 }
          : {
              y: [0, -floatYOffset, 2, -floatYOffset * 0.6, 0],
              x: [0, floatXOffset, -floatXOffset, floatXOffset * 0.5, 0],
              scale: 1,
            }
      }
      transition={
        isHovered
          ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
          : {
              duration: floatDuration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: floatDelay,
            }
      }
      onMouseEnter={() => {
        onHover(skill.id);
        audioManager.playTone(280 + (index % 7) * 45, 'sine', 0.05);
      }}
      onMouseLeave={() => onHover(null)}
      className={`group relative rounded-3xl transition-all duration-300 backdrop-blur-xl cursor-default select-none ${
        isHovered ? 'z-30 shadow-2xl' : 'z-10 shadow-lg'
      }`}
      style={{
        boxShadow: isHovered
          ? `0 16px 36px -8px ${accentColor}33, 0 0 24px -4px ${accentColor}25`
          : '0 8px 24px -10px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Outer Spherical Container */}
      <div
        className="relative rounded-3xl p-5 sm:p-6 border transition-all duration-300 overflow-hidden"
        style={{
          backgroundColor: isHovered ? '#1a1714' : '#141210ee',
          borderColor: isHovered ? `${accentColor}88` : '#292420',
        }}
      >
        {/* Ambient Specular Glass Light Reflections inside the Orb */}
        <div
          className="absolute -top-10 -left-10 w-28 h-28 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${accentColor}28 0%, transparent 70%)`,
            opacity: isHovered ? 0.9 : 0.4,
          }}
        />

        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none blur-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
            opacity: isHovered ? 0.8 : 0.2,
          }}
        />

        {/* Top Header of Orb: Sphere Icon Badge & Status Dot */}
        <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Luminous Spherical Icon Node */}
            <motion.div
              animate={
                isHovered
                  ? { rotate: [0, 8, -8, 0], scale: 1.12 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.4 }}
              className="w-9 h-9 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-inner"
              style={{
                backgroundColor: isHovered ? `${accentColor}22` : '#1f1b18',
                borderColor: isHovered ? `${accentColor}77` : '#332d28',
                color: isHovered ? '#ffffff' : accentColor,
                boxShadow: isHovered ? `0 0 14px ${accentColor}44` : 'none',
              }}
            >
              {getSkillIcon(skill.id, skill.category)}
            </motion.div>

            {/* Category Marker Tag */}
            <span 
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border transition-colors duration-200"
              style={{
                backgroundColor: isHovered ? '#221e1a' : '#1a1715',
                borderColor: isHovered ? `${accentColor}55` : '#2d2722',
                color: isHovered ? '#f5f2eb' : '#9c9284',
              }}
            >
              {skill.category}
            </span>
          </div>

          {/* Orb Core Glow Beacon */}
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: accentColor,
                boxShadow: isHovered
                  ? `0 0 10px ${accentColor}, 0 0 4px #ffffff`
                  : `0 0 4px ${accentColor}66`,
                transform: isHovered ? 'scale(1.25)' : 'scale(1)',
              }}
            />
          </div>
        </div>

        {/* Skill Title */}
        <div className="relative z-10 mb-2">
          <h4
            className="text-lg sm:text-xl font-serif-display font-medium transition-colors duration-200 leading-tight"
            style={{
              color: isHovered ? '#ffffff' : '#f5f2eb',
            }}
          >
            {skill.name}
          </h4>
        </div>

        {/* Dynamic Expandable Description on Hover */}
        <motion.div
          initial={false}
          animate={{
            height: isHovered ? 'auto' : '0px',
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? 8 : 0,
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden relative z-10"
        >
          <p className="text-xs sm:text-[13px] text-[#d6cec2] font-light leading-relaxed pt-1 pb-2 border-t border-[#292420]">
            {skill.description || `Practical application and implementation of ${skill.name} in scalable projects.`}
          </p>
        </motion.div>

        {/* Tags Row / Capability Pills */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1.5 relative z-10">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-lg border transition-all duration-200"
                style={{
                  backgroundColor: isHovered ? '#24201c' : '#191614',
                  borderColor: isHovered ? `${accentColor}44` : '#292420',
                  color: isHovered ? '#e8b298' : '#8c8273',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Subtle Bottom Light Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
          style={{
            background: isHovered
              ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
              : 'transparent',
            opacity: isHovered ? 0.9 : 0,
          }}
        />
      </div>
    </motion.div>
  );
};

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const groupedSkills = {
    'Languages': skills.filter(s => s.category === 'Languages'),
    'Web': skills.filter(s => s.category === 'Web'),
    'Cloud & DevOps': skills.filter(s => s.category === 'Cloud & DevOps'),
    'Tools': skills.filter(s => s.category === 'Tools'),
  };

  return (
    <div className="space-y-8">
      {/* Category Filter & Status Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#171513]/90 border border-[#2b2723] backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c26747] animate-pulse" />
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#a89f91] block">
              Discipline Navigation
            </span>
            <span className="text-[10px] font-mono text-[#8c8273]">
              Hover any orb to expand detailed capabilities
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const count = cat === 'All' ? skills.length : skills.filter(s => s.category === cat).length;

            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setActiveCategory(cat);
                  audioManager.playClick();
                }}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#c26747] text-[#0e0d0c] font-bold shadow-md shadow-[#c26747]/20'
                    : 'bg-[#221f1c] text-[#a89f91] hover:text-[#f5f2eb] hover:bg-[#2c2723] border border-[#2e2a25]'
                }`}
                data-cursor="hover"
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#0e0d0c]/30 text-[#0e0d0c]' : 'bg-[#171513] text-[#8c8273]'
                }`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Animated Floating Orbs Grid */}
      <AnimatePresence mode="wait">
        {activeCategory === 'All' ? (
          /* Grouped Categorical Floating Orbs Nebula */
          <motion.div
            key="all-orbs"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {Object.entries(groupedSkills).map(([category, items], groupIdx) => (
              <div key={category} className="space-y-4">
                {/* Category Cluster Header */}
                <div className="flex items-center justify-between border-b border-[#24201c] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#1c1917] border border-[#2d2722] text-[#c26747]">
                      {getCategoryIcon(category, 'w-4 h-4')}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif-display font-semibold text-[#f5f2eb]">
                        {category}
                      </h3>
                      <span className="text-[11px] font-mono text-[#8c8273]">
                        {items.length} interactive {items.length === 1 ? 'orb' : 'orbs'}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c8273] hidden sm:block">
                    FLOATING MATRIX
                  </span>
                </div>

                {/* Floating Orbs Cluster */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((skill, itemIdx) => (
                    <FloatingSkillOrb
                      key={skill.id}
                      skill={skill}
                      index={groupIdx * 4 + itemIdx}
                      isHovered={hoveredSkillId === skill.id}
                      onHover={setHoveredSkillId}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          /* Filtered Floating Orbs Grid */
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredSkills.map((skill, idx) => (
              <FloatingSkillOrb
                key={skill.id}
                skill={skill}
                index={idx}
                isHovered={hoveredSkillId === skill.id}
                onHover={setHoveredSkillId}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsGrid;
