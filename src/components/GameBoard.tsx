import { AnimatePresence, motion } from 'motion/react';
import { Circle, X } from 'lucide-react';
import type { GameMode, Player } from '../types/game';

interface GameBoardProps {
  board: Player[];
  winner: Player | 'Draw' | null;
  winningLine: number[] | null;
  gameMode: Exclude<GameMode, null>;
  isXNext: boolean;
  isDark: boolean;
  onSquareClick: (index: number) => void;
}

export default function GameBoard({
  board,
  winner,
  winningLine,
  gameMode,
  isXNext,
  isDark,
  onSquareClick,
}: GameBoardProps) {
  return (
    <div
      className={`grid grid-cols-3 gap-3 ${isDark ? 'bg-neutral-900/50' : 'bg-white/50'} p-3 rounded-2xl border ${isDark ? 'border-white/5' : 'border-black/5'} shadow-2xl backdrop-blur-sm`}
    >
      {board.map((square, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: square || winner ? 1 : 1.02 }}
          whileTap={{ scale: square || winner ? 1 : 0.95 }}
          onClick={() => onSquareClick(index)}
          className={[
            'aspect-square flex items-center justify-center rounded-xl md:text-2xl text-4xl',
            'transition-colors duration-200 border',
            !square && !winner && (gameMode === 'vs-friend' || isXNext)
              ? `${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'} cursor-pointer`
              : 'cursor-default',
            winningLine?.includes(index)
              ? isDark
                ? 'bg-emerald-500/20 border-emerald-500/50'
                : 'bg-emerald-100 border-emerald-500/50'
              : isDark
                ? 'bg-neutral-800/50 border-white/5'
                : 'bg-neutral-50 shadow-inner border-black/5',
          ].join(' ')}
        >
          <AnimatePresence mode="wait">
            {square === 'X' && (
              <motion.div
                key="X"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
              >
                <X className={`w-12 h-12 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} strokeWidth={2.5} />
              </motion.div>
            )}
            {square === 'O' && (
              <motion.div key="O" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Circle className={`w-10 h-10 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}
