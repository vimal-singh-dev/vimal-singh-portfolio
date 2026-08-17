/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterRoleProps {
  roles?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const DEFAULT_ROLES = [
  'B.Tech Information Technology',
  'Aspiring Software Developer',
  'Cloud Computing & DevOps Explorer',
  'Python & Backend Engineer',
  'Systems & Forensics Enthusiast'
];

export const TypewriterRole: React.FC<TypewriterRoleProps> = ({
  roles = DEFAULT_ROLES,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2200,
  className = '',
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const targetRole = roles[currentRoleIndex] || '';

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < targetRole.length) {
        // Natural slight random variance in typing speed
        const jitter = Math.floor(Math.random() * 25) - 10;
        timeout = setTimeout(() => {
          setCurrentText(targetRole.slice(0, currentText.length + 1));
        }, Math.max(30, typingSpeed + jitter));
      } else {
        // Pause at complete string before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(targetRole.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Switch to next role and start typing
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className={`inline-flex items-center min-h-[2.25rem] sm:min-h-[2.75rem] ${className}`}>
      <span className="text-2xl sm:text-3xl lg:text-4xl font-serif-display italic text-[#e8b298] tracking-normal">
        {currentText}
      </span>

      {/* Dynamic Blinking Terminal Cursor */}
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'steps(2, start)',
        }}
        className="inline-block w-[3px] sm:w-[4px] h-[1.3em] ml-1.5 bg-[#c26747] rounded-sm shadow-[0_0_8px_#c26747] align-middle"
        aria-hidden="true"
      />
    </div>
  );
};

export default TypewriterRole;
