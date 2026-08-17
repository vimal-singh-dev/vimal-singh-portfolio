/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlowCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. '#c26747', '#e9c46a', '#81b29a'
  glowRadius?: number; // radius in px, default 400
  baseOpacity?: number; // default 0.05
  hoverOpacity?: number; // default 0.18
  borderGlow?: boolean; // highlight border on hover
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = '#c26747',
  glowRadius = 450,
  baseOpacity = 0.04,
  hoverOpacity = 0.16,
  borderGlow = true,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-3xl overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Mouse-Following Radial Gradient Glow (Interior & Depth) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? hoverOpacity : baseOpacity,
          background: `radial-gradient(${glowRadius}px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Exterior Ambient Soft Halo Glow */}
      <div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? (borderGlow ? 0.35 : 0) : 0,
          background: `radial-gradient(${glowRadius * 0.7}px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor} 0%, transparent 60%)`,
          filter: 'blur(4px)',
        }}
      />

      {/* Relative Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowCard;
