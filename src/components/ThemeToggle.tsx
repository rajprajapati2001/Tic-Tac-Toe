import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`fixed md:bottom-8 bottom-3 md:right-8 right-3 p-4 rounded-full ${isDark ? 'bg-neutral-800 text-yellow-400 border-white/10' : 'bg-white text-indigo-600 border-black/10'} border shadow-2xl z-50`}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
            <Sun className="w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
            <Moon className="w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
