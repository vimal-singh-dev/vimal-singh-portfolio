/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface ArtisticTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  italic?: boolean;
}

const ArtisticText: React.FC<ArtisticTextProps> = ({ 
  text, 
  as: Component = 'span', 
  className = '',
  italic = false 
}) => {
  return (
    <Component className={`font-serif-display font-medium tracking-tight text-[#fdfbf7] ${italic ? 'italic font-normal' : ''} ${className}`}>
      {text}
    </Component>
  );
};

export default ArtisticText;
