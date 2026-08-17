/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { ProjectItem } from '../types';
import { ArrowUpRight, Github, FolderGit2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { audioManager } from '../services/audioService';

interface Project3DCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
  index?: number;
}

const Project3DCard: React.FC<Project3DCardProps> = ({ project, onOpenDetails, index = 0 }) => {
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

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioManager.playTone(320 + index * 40, 'sine', 0.06);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(12px)', scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
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
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? -6 : 0}px)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
        className="group relative h-full rounded-3xl bg-[#171513]/90 border border-[#2b2723] hover:border-[#c26747]/70 p-7 sm:p-8 flex flex-col justify-between backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#c26747]/10 transition-colors cursor-pointer overflow-hidden"
        data-cursor="inspect"
      >
        {/* Interactive Dynamic Glare Reflection */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(245, 242, 235, ${glarePos.opacity}) 0%, transparent 60%)`,
          }}
        />

        {/* Soft warm corner ambient glow on hover */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#c26747]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c26747]/25 group-hover:scale-110 transition-all duration-500" />

        <div className="relative z-10">
          {/* Category & Index Header */}
          <div className="flex items-center justify-between gap-2 mb-6 border-b border-[#26221f] pb-3.5">
            <span className="text-[11px] font-mono tracking-widest text-[#a89f91] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c26747]" />
              {project.category}
            </span>
            <span className="text-[11px] font-mono text-[#c26747] px-2 py-0.5 rounded-full bg-[#221f1c] border border-[#332e29]">
              #{project.id.toUpperCase()}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl font-serif-display font-semibold text-[#f5f2eb] group-hover:text-[#e8b298] transition-colors mb-3 leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[#a89f91] text-sm leading-relaxed mb-6 font-light">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.tags.map(t => (
              <span
                key={t}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#221f1c] text-[#d6cec2] border border-[#332e29] group-hover:border-[#423b34] transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-[#26221f] flex items-center justify-between text-xs font-mono relative z-10">
          <span className="text-[#c26747] font-medium flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
            <span>Read Architecture Narrative</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </span>

          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-xl bg-[#221f1c] text-[#a89f91] hover:text-[#f5f2eb] hover:bg-[#2b2723] border border-[#332e29] hover:border-[#c26747]/40 transition-colors"
              data-cursor="launch"
              title="Open GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Project3DCard;
