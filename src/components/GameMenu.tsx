import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Users, Smile, Activity, Flame } from 'lucide-react';
import type {  Difficulty, GameMode } from '../types/game';
import menuIcon from '../assets/icon/tic-tac-toe-128x128.png';

interface GameMenuProps {
  isDark: boolean;
  onSelectMode: (mode: Exclude<GameMode, null>, difficulty?: Difficulty) => void;
}

export default function GameMenu({ isDark, onSelectMode }: GameMenuProps) {
    const handleVsComputerSimplePlay = () => {
    const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    onSelectMode('vs-computer', randomDifficulty);
  };

  const handleDifficultyClick = (e: React.MouseEvent, difficulty: Difficulty) => {
    e.stopPropagation();
    onSelectMode('vs-computer', difficulty);
  };


  return (
    <motion.div
      key="menu"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-md mx-auto space-y-12 text-center"
    >
      <header className="space-y-4 md:space-y-2">
        <img
          src={menuIcon}
          alt="Tic Tac Toe"
          className={`mx-auto md:h-14 md:w-14 h-20 w-20 rounded-2xl border p-1 ${isDark ? 'border-white/10 bg-neutral-900/80 filter hue-rotate-[220deg] saturate-150 contrast-[0.9]' : 'border-black/20 bg-neutral-900/90'} shadow-lg`}
        />
        <h1
          className={`text-6xl font-bold tracking-tighter ${isDark ? 'bg-gradient-to-br from-white to-neutral-500' : 'bg-gradient-to-br from-neutral-900 to-neutral-400'} bg-clip-text text-transparent italic`}
        >
          Tic Tac Toe
        </h1>
        <p className={`${isDark ? 'text-neutral-500' : 'text-neutral-400'} text-sm uppercase tracking-widest font-medium`}>
          Choose your challenge
        </p>
      </header>

      <div className="grid gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleVsComputerSimplePlay}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleVsComputerSimplePlay();
            }
          }}
          className={`group relative overflow-hidden flex items-center justify-between p-6 rounded-2xl ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-black/5'} border text-left transition-all shadow-xl`}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent ${isDark ? 'via-white/20' : 'via-black/10'} to-transparent w-1/2 animate-shimmer`}
            />
          </div>

          <div className="space-y-1 relative z-10 text-left">
            <h3 className="text-xl font-bold">Play</h3>
            <p className={`${isDark ? 'text-neutral-500' : 'text-neutral-400'} text-sm`}>
              Challenge the computer AI
            </p>

<div className="mt-3 flex items-center gap-2 justify-start">
  {/* EASY */}
  <button
    onClick={(e) => handleDifficultyClick(e, 'Easy')}
    className={`group flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full relative overflow-hidden transition-all duration-300
    ${
      isDark
        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
        : 'bg-green-500/5 text-green-600 hover:bg-green-500/10'
    }
    hover:scale-105`}
  >
    {/* Glow */}
    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-green-400/20 blur-md transition duration-300"></span>

    {/* Icon (hidden on mobile) */}
    <Smile className="hidden md:inline w-3.5 h-3.5 relative z-10" />

    <span className="relative z-10">Easy</span>
  </button>

  {/* MEDIUM */}
  <button
    onClick={(e) => handleDifficultyClick(e, 'Medium')}
    className={`group flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full relative overflow-hidden transition-all duration-300
    ${
      isDark
        ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
        : 'bg-yellow-500/5 text-yellow-600 hover:bg-yellow-500/10'
    }
    hover:scale-105`}
  >
    {/* Glow */}
    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-yellow-400/20 blur-md transition duration-300"></span>

    {/* Icon (hidden on mobile) */}
    <Activity className="hidden md:inline w-3.5 h-3.5 relative z-10" />

    <span className="relative z-10">Medium</span>
  </button>

  {/* HARD */}
  <button
    onClick={(e) => handleDifficultyClick(e, 'Hard')}
    className={`group flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full relative overflow-hidden transition-all duration-300
    ${
      isDark
        ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
        : 'bg-rose-500/5 text-rose-600 hover:bg-rose-500/10'
    }
    hover:scale-105`}
  >
    {/* Glow */}
    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-rose-400/20 blur-md transition duration-300"></span>

    {/* Icon (hidden on mobile) */}
    <Flame className="hidden md:inline w-3.5 h-3.5 relative z-10" />

    <span className="relative z-10">Hard</span>
  </button>
</div>
          </div>
          <div
            className={`p-3 rounded-xl ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-500/5 text-indigo-600'} group-hover:scale-110 transition-transform relative z-10`}
          >
            <Cpu className="w-6 h-6" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectMode('vs-friend')}
          className={`group relative overflow-hidden flex items-center justify-between p-6 rounded-2xl ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-black/5'} border text-left transition-all shadow-xl`}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent ${isDark ? 'via-white/20' : 'via-black/10'} to-transparent w-1/2 animate-shimmer`}
            />
          </div>

          <div className="space-y-1 relative z-10">
            <h3 className="text-xl font-bold">Play with Friends</h3>
            <p className={`${isDark ? 'text-neutral-500' : 'text-neutral-400'} text-sm`}>
              Local multiplayer mode
            </p>
          </div>
          <div
            className={`p-3 rounded-xl ${isDark ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-500/5 text-rose-600'} group-hover:scale-110 transition-transform relative z-10`}
          >
            <Users className="w-6 h-6" />
          </div>
        </motion.button>
      </div>
          <div className='md:pb-0 pb-10'></div>
    </motion.div>
  );
}
