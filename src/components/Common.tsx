import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
  color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => (
  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className={`h-full ${color}`}
    />
  </div>
);

interface TopicDotsProps {
  count: number;
  color?: 'orange' | 'green';
}

export const TopicDots: React.FC<TopicDotsProps> = ({ count, color = 'orange' }) => (
  <div className="flex gap-1">
    {[0, 1, 2, 3].map((i) => (
      <div 
        key={i} 
        className={`w-3 h-1.5 rounded-full ${
          i < count 
            ? (color === 'orange' ? 'bg-orange-400' : 'bg-emerald-500') 
            : 'bg-gray-200'
        }`}
      />
    ))}
  </div>
);
