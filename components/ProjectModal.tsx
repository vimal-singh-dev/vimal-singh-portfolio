/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, Github, ArrowUpRight, BookOpen, Layers, Terminal, ShieldCheck, Box, Workflow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../services/audioService';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Productivity':
      return <Workflow className="w-3.5 h-3.5 text-[#e9c46a]" />;
    case 'Forensics & Analysis':
      return <Terminal className="w-3.5 h-3.5 text-[#06b6d4]" />;
    case 'Security & Utilities':
      return <ShieldCheck className="w-3.5 h-3.5 text-[#81b29a]" />;
    default:
      return <Box className="w-3.5 h-3.5 text-[#c26747]" />;
  }
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        audioManager.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Soft Backdrop Fade & Ambient Vignette */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#080706]/85 cursor-pointer"
            aria-hidden="true"
          />

          {/* Premium Dialog Container with Smooth Scale-Up & Subtle Depth Lift */}
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.92, 
              y: 28, 
              filter: 'blur(10px)' 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              filter: 'blur(0px)' 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.94, 
              y: 18, 
              filter: 'blur(8px)' 
            }}
            transition={{ 
              duration: 0.42, 
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.3 }
            }}
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-2xl bg-[#171513]/95 border border-[#332e29] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(194,103,71,0.12)] flex flex-col z-10 backdrop-blur-2xl my-auto"
          >
            {/* Ambient Radial Accent Light */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c26747]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#e9c46a]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="p-6 bg-[#13110f]/90 border-b border-[#26221f] flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#221f1c] text-[#c26747] border border-[#38322c]">
                  {getCategoryIcon(project.category)}
                  <span className="text-[11px] font-mono uppercase tracking-wider font-medium">
                    {project.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#8c8273] hidden sm:inline">
                  Milestone Exhibition
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  audioManager.playClick();
                  onClose();
                }}
                className="p-2 rounded-full bg-[#221f1c] text-[#a89f91] hover:text-[#f5f2eb] hover:bg-[#2b2723] border border-[#332e29] transition-colors cursor-pointer"
                data-cursor="hover"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh] relative z-10 custom-scrollbar">
              
              {/* Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
              >
                <h2 className="text-2xl sm:text-3xl font-serif-display font-semibold text-[#f5f2eb] mb-3 leading-snug">
                  {project.title}
                </h2>
                <p className="text-[#c7bfb3] text-sm leading-relaxed font-light">
                  {project.description}
                </p>
              </motion.div>

              {/* Architectural / Technical Narrative */}
              {project.details && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.35 }}
                  className="p-5 rounded-2xl bg-[#1c1917]/90 border border-[#2b2723] space-y-2.5 relative overflow-hidden"
                >
                  <div className="text-xs font-mono text-[#c26747] uppercase tracking-wider font-semibold flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#c26747]" />
                    <span>Architecture & System Highlights</span>
                  </div>
                  <p className="text-xs text-[#a89f91] leading-relaxed font-light">
                    {project.details}
                  </p>
                </motion.div>
              )}

              {/* Technologies Involved */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.35 }}
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#8c8273] mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#8c8273]" />
                  <span>Technologies & Stack Components:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#221f1c] text-[#d6cec2] border border-[#332e29] hover:border-[#c26747]/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Footer Actions */}
              {project.githubUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.35 }}
                  className="pt-4 border-t border-[#26221f] flex items-center justify-between"
                >
                  <span className="text-xs font-mono text-[#8c8273]">
                    Source Code Repository
                  </span>
                  <motion.a
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#221f1c] hover:bg-[#2b2723] text-[#f5f2eb] text-xs font-mono font-semibold flex items-center gap-2 border border-[#38322c] hover:border-[#c26747]/60 shadow-lg shadow-black/40 transition-all cursor-pointer"
                    data-cursor="launch"
                  >
                    <Github className="w-4 h-4" />
                    <span>Explore on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#c26747]" />
                  </motion.a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
