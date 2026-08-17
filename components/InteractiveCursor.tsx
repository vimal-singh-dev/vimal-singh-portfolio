/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { CursorMode } from '../types';

const InteractiveCursor: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailSpringConfig = { damping: 24, stiffness: 200, mass: 0.2 };
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode('default');
        setCursorText('');
        return;
      }

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorMode(cursorAttr as CursorMode);
        switch (cursorAttr) {
          case 'inspect':
            setCursorText('View');
            break;
          case 'launch':
            setCursorText('Open');
            break;
          case 'copy':
            setCursorText('Copy');
            break;
          case 'chat':
            setCursorText('Ask');
            break;
          default:
            setCursorText('');
        }
        return;
      }

      const isClickable = target.closest('button') || target.closest('a') || target.closest('[role="button"]');
      if (isClickable) {
        setCursorMode('hover');
        setCursorText('');
      } else {
        setCursorMode('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const isSpecial = cursorMode !== 'default' && cursorMode !== 'hover';
  const isHover = cursorMode === 'hover';

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Artistic Ring */}
      <motion.div
        className="absolute rounded-full border border-[#c26747]/40 pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          width: isSpecial ? 64 : isHover ? 44 : 28,
          height: isSpecial ? 64 : isHover ? 44 : 28,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isSpecial ? 1.1 : 1,
          opacity: isSpecial ? 0.7 : isHover ? 0.5 : 0.3,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* Main Cursor Core */}
      <motion.div
        className="absolute flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isSpecial ? 54 : isHover ? 12 : 7,
            height: isSpecial ? 54 : isHover ? 12 : 7,
            backgroundColor: isSpecial ? '#c26747' : '#f5f2eb',
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className="rounded-full flex items-center justify-center shadow-sm"
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-sans font-semibold text-[#0e0d0c] tracking-wider uppercase px-1 select-none text-center"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InteractiveCursor;
