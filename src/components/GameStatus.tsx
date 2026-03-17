import { AnimatePresence, motion } from 'motion/react';
import { Circle, RotateCcw, Trophy, X } from 'lucide-react';
import type { GameMode, Player } from '../types/game';

interface GameStatusProps {
  winner: Player | 'Draw' | null;
  gameMode: Exclude<GameMode, null>;
  isXNext: boolean;
  isDark: boolean;
  onReset: () => void;
}

export default function GameStatus({
  winner,
  gameMode,
  isXNext,
  isDark,
  onReset,
}: GameStatusProps) {
  return (
    <motion.div
      layout
      className={`flex flex-col justify-between gap-4 md:gap-6 rounded-3xl border p-6 md:p-8 
      md:h-[420px] h-[200px] overflow-hidden
      ${isDark ? 'border-white/8 bg-neutral-900/65' : 'border-black/8 bg-white/75'} 
      shadow-2xl backdrop-blur-sm`}
    >
      {/* 🔥 CONTENT AREA (NO FIXED HEIGHT ON MOBILE) */}
      <div className="flex-1 flex items-center justify-center md:items-start md:justify-center">
        <AnimatePresence mode="wait">
          {winner ? (
            <motion.div
              key="winner"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`flex items-center space-x-3 ${
                  isDark ? 'bg-white text-black' : 'bg-black text-white'
                } px-6 py-3 rounded-full shadow-xl font-bold whitespace-nowrap`}
              >
                {winner === 'Draw' ? (
                  <span>It's a Draw!</span>
                ) : (
                  <>
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>
                      {gameMode === 'vs-computer' && winner === 'O'
                        ? 'Computer Wins!'
                        : `Player ${winner} Wins!`}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:text-lg text-center space-y-3"
            >
              <p
                className={`${
                  isDark ? 'text-neutral-500' : 'text-neutral-400'
                } text-xs uppercase tracking-[0.35em] font-semibold`}
              >
                Match Status
              </p>

              {gameMode === 'vs-computer' && !isXNext ? (
                <span
                  className={`block text-lg font-semibold whitespace-nowrap ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  } animate-pulse`}
                >
                  Computer is thinking...
                </span>
              ) : (
                <div
                  className={`flex items-center justify-center gap-3 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                  } font-medium`}
                >
                  <span>Next Turn:</span>
                  <div
                    className={`p-2 rounded-lg ${
                      isDark
                        ? 'bg-neutral-800 border-white/5'
                        : 'bg-white border-black/5'
                    } border shadow-sm`}
                  >
                    {isXNext ? (
                      <X
                        className={`w-5 h-5 ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      />
                    ) : (
                      <Circle
                        className={`w-5 h-5 ${
                          isDark ? 'text-rose-400' : 'text-rose-600'
                        }`}
                      />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔥 RESET BUTTON (STICKS BOTTOM) */}
<div className="flex justify-center mt-6">
  <motion.button
    whileTap={{ scale: 0.95 }} // only click effect
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onReset}
    className={`
      group relative overflow-hidden flex items-center justify-center gap-2
      px-14 py-2.5 rounded-full font-semibold tracking-wide
      transform-gpu will-change-transform
      transition-all duration-300 shadow-lg
      ${
        isDark
          ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/30'
          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30'
      }
    `}
  >
    {/* Glow Effect */}
    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-white/10 blur-xl"></span>

    {/* Icon */}
    <RotateCcw className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />

    {/* Text */}
    <span className="relative z-10">Reset Game</span>
  </motion.button>
</div>

    </motion.div>
  );
}