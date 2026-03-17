import { useMemo } from 'react';
import { motion } from 'motion/react';

interface BackgroundOrbsProps {
  isDark: boolean;
}

interface OrbConfig {
  id: number;
  width: number;
  height: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
}

export default function BackgroundOrbs({ isDark }: BackgroundOrbsProps) {
  const orbs = useMemo<OrbConfig[]>(
    () =>
      Array.from({ length: 6 }, (_, index) => ({
        id: index,
        width: Math.random() * 300 + 200,
        height: Math.random() * 300 + 200,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${index * 2}s`,
        duration: `${10 + index * 2}s`,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl opacity-20 animate-float"
          style={{
            width: orb.width,
            height: orb.height,
            left: orb.left,
            top: orb.top,
            backgroundColor: isDark
              ? index % 2 === 0
                ? '#4f46e5'
                : '#e11d48'
              : index % 2 === 0
                ? '#818cf8'
                : '#fb7185',
            animationDelay: orb.delay,
            animationDuration: orb.duration,
          }}
        />
      ))}
    </div>
  );
}
