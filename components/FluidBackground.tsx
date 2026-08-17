/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0e0d0c] pointer-events-none">
      {/* Soft Artistic Ambient Blur 1: Warm Terracotta */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.14] will-change-transform"
        style={{ background: 'radial-gradient(circle, #d97706 0%, #c26747 45%, transparent 70%)' }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Soft Artistic Ambient Blur 2: Warm Sand / Ochre */}
      <motion.div
        className="absolute top-[40%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[140px] opacity-[0.10] will-change-transform"
        style={{ background: 'radial-gradient(circle, #e9c46a 0%, #b08968 40%, transparent 70%)' }}
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -25, 35, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Soft Artistic Ambient Blur 3: Muted Olive / Sage */}
      <motion.div
        className="absolute bottom-[-15%] right-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[130px] opacity-[0.08] will-change-transform"
        style={{ background: 'radial-gradient(circle, #7f9c7b 0%, #3e5c46 50%, transparent 75%)' }}
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle Fine Grain Noise / Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0d0c]/40 via-transparent to-[#0e0d0c]/80" />
    </div>
  );
};

export default FluidBackground;
