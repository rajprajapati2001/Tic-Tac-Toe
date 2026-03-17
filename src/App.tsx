import { useEffect, useState, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, Cpu, Users, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
const BackgroundOrbs = lazy(() => import('./components/BackgroundOrbs'));
import GameBoard from './components/GameBoard';
import GameMenu from './components/GameMenu';
import GameStatus from './components/GameStatus';
import { playSound, setAudioEnabled } from './assets/audio/soundEffects';
import gameIcon from './assets/icon/tic-tac-toe-128x128.png';
import type { Difficulty, GameMode, Player, Theme } from './types/game';
import { calculateWinner, createEmptyBoard, getComputerMove } from './utils/game';

const playOutcomeSound = (nextWinner: Player | 'Draw', mode: GameMode) => {
  if (nextWinner === 'Draw') {
    playSound('draw');
    return;
  }

  if (mode === 'vs-computer') {
    playSound(nextWinner === 'X' ? 'win' : 'lose');
    return;
  }

  playSound('win');
};

export default function App() {
  const [gameMode, setGameMode] = useState<GameMode>(null);
   const [difficulty, setDifficulty] = useState<Difficulty>('Hard');
  const [muted, setMuted] = useState(false);
  const [board, setBoard] = useState<Player[]>(() => createEmptyBoard());
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw'>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');

  const isDark = theme === 'dark';

  const resetBoardState = () => {
    setBoard(createEmptyBoard());
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  const startGame = (mode: Exclude<GameMode, null>, selectedDifficulty: Difficulty = 'Hard') => {
    playSound('click');
    resetBoardState();
    setGameMode(mode);
    setDifficulty(selectedDifficulty);
  };

  const resetGame = () => {
    playSound('reset');
    resetBoardState();
  };

  const backToMenu = () => {
    playSound('reset');
    resetBoardState();
    setGameMode(null);
  };

  const toggleTheme = () => {
    playSound('click');
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleAudio = () => {
    setMuted((m) => {
      const next = !m;
      setAudioEnabled(!next);
      // give a small feedback when enabling
      if (!next) playSound('click');
      return next;
    });
  };

  const handleSquareClick = (index: number) => {
    if (winner || board[index]) {
      return;
    }

    if (gameMode === 'vs-computer' && !isXNext) {
      return;
    }

    playSound('click');

    const nextBoard = [...board];
    nextBoard[index] = isXNext ? 'X' : 'O';

    const result = calculateWinner(nextBoard);
    setBoard(nextBoard);

    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      playOutcomeSound(result.winner, gameMode);
      return;
    }

    setIsXNext(!isXNext);
  };

  useEffect(() => {
    if (gameMode !== 'vs-computer' || isXNext || winner) {
      return;
    }

    const timer = window.setTimeout(() => {
        const move = getComputerMove(board, difficulty);

      if (move === undefined) {
        return;
      }

      playSound('click');

      const nextBoard = [...board];
      nextBoard[move] = 'O';

      const result = calculateWinner(nextBoard);
      setBoard(nextBoard);

      if (result) {
        setWinner(result.winner);
        setWinningLine(result.line);
        playOutcomeSound(result.winner, gameMode);
        return;
      }

      setIsXNext(true);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [board, gameMode, isXNext, winner]);

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isDark ? '#0a0a0a' : '#f5f5f5' }}
      className={`min-h-screen ${isDark ? 'text-neutral-100' : 'text-neutral-900'} flex flex-col items-center font-sans relative overflow-hidden transition-colors duration-500`}
    >
      <Suspense fallback={null}>
        <BackgroundOrbs isDark={isDark} />
      </Suspense>

      <div className="flex-1 flex flex-col p-4 items-center justify-center w-full max-w-7xl relative z-10">
        <AnimatePresence mode="wait">
          {!gameMode ? (
            <GameMenu isDark={isDark} onSelectMode={startGame} />
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full space-y-6 lg:flex lg:justify-center"
            >
              <div className="grid items-stretch md:gap-6 gap-4 lg:grid-cols-[220px_minmax(360px,440px)_300px] lg:gap-8 lg:items-center lg:justify-center">
                <section
                  className={`flex flex-col justify-between md:gap-6 gap-0 rounded-3xl border md:p-6 p-4 lg:min-h-[420px] ${isDark ? 'border-white/8 bg-neutral-900/65' : 'border-black/8 bg-white/75'} shadow-2xl backdrop-blur-sm`}
                >
                  {/* Mobile compact row: show only Menu (left) and Mode (right) */}
                  <div className="flex items-center justify-between lg:hidden md:mb-3 mb-0">
                    <button
                      onClick={backToMenu}
                      className={`flex items-center space-x-1 ${isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'} transition-colors text-sm font-medium`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Menu</span>
                    </button>

                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      {gameMode === 'vs-computer' ? (
                        <>
                          <Cpu className="w-4 h-4" />
                          <span>vs Computer</span>
                          <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md ${
                            difficulty === 'Easy' ? 'bg-green-500/20 text-green-600' :
                            difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-600' :
                            'bg-rose-500/20 text-rose-600'
                          }`}>
                            {difficulty}
                          </span>
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4" />
                          <span>vs Friend</span>
                        </>
                      )}
                        {gameMode === 'vs-computer' && difficulty && (
                          <span
                            className={`hidden md:inline-flex ml-2 px-2 py-0.5 rounded-md text-[10px] tracking-normal normal-case ${
                              difficulty === 'Easy'
                                ? 'bg-green-500/10 text-green-500'
                                : difficulty === 'Medium'
                                ? 'bg-yellow-500/10 text-yellow-500'
                                : 'bg-rose-500/10 text-rose-500'
                            }`}
                          >
                            {difficulty}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <button
                      onClick={backToMenu}
                      className={`hidden lg:flex items-center space-x-1 ${isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'} transition-colors text-sm font-medium`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Menu</span>
                    </button>

                    <header className="hidden lg:block space-y-3 text-center justify-items-center md:items-start">
                      <p className={`${isDark ? 'text-neutral-500' : 'text-neutral-400'} text-xs uppercase tracking-[0.35em] font-semibold`}>
                        Game Name
                      </p>
                      <img
                        src={gameIcon}
                        alt="Tic Tac Toe"
                        className={`h-12 w-12 rounded-xl border p-1 ${isDark ? 'border-white/10 bg-neutral-900/80' : 'border-black/20 bg-neutral-900/90'} shadow-lg`}
                      />
                      <h1
                        className={`text-4xl font-bold tracking-tighter ${isDark ? 'bg-gradient-to-br from-white to-neutral-500' : 'bg-gradient-to-br from-neutral-900 to-neutral-400'} bg-clip-text text-transparent italic`}
                      >
                        Tic Tac Toe
                      </h1>
                      <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-500'} text-sm leading-6`}>
                        {gameMode === 'vs-computer' ? 'Play against the computer and control the center.' : 'Local multiplayer with alternating turns on the same board.'}
                      </p>
                    </header>
                  </div>

                  <div className="hidden lg:block space-y-2 text-center">
                    <p className={`${isDark ? 'text-neutral-500' : 'text-neutral-400'} hidden lg:block text-xs uppercase tracking-[0.35em] font-semibold`}>
                      Mode {gameMode === 'vs-computer' && difficulty && (
                          <span
                            className={`hidden md:inline-flex ml-2 px-2 py-0.5 rounded-md text-[10px] tracking-normal normal-case ${
                              difficulty === 'Easy'
                                ? 'bg-green-500/10 text-green-500'
                                : difficulty === 'Medium'
                                ? 'bg-yellow-500/10 text-yellow-500'
                                : 'bg-rose-500/10 text-rose-500'
                            }`}
                          >
                            {difficulty}
                          </span>
                        )}
                    </p>
                    <div className={`hidden lg:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      {gameMode === 'vs-computer' ? (
                        <>
                          <Cpu className="w-4 h-4" />
                          <span>vs Computer</span>
                          <span className={`md:hidden inline-flex ml-1 text-[10px] px-2 py-0.5 rounded-md ${
                            difficulty === 'Easy' ? 'bg-green-500/20 text-green-600' :
                            difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-600' :
                            'bg-rose-500/20 text-rose-600'
                          }`}>
                            {difficulty}
                          </span>
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4" />
                          <span>vs Friend</span>
                        </>
                      )}
                    </div>
                  </div>
                </section>

                <div className="mx-auto w-full max-w-[440px] lg:min-w-0">
                  <GameBoard
                    board={board}
                    winner={winner}
                    winningLine={winningLine}
                    gameMode={gameMode}
                    isXNext={isXNext}
                    isDark={isDark}
                    onSquareClick={handleSquareClick}
                  />
                </div>

                <div className="lg:flex lg:items-stretch">
                  <GameStatus
                    winner={winner}
                    gameMode={gameMode}
                    isXNext={isXNext}
                    isDark={isDark}
                    onReset={resetGame}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

<div className={`fixed bottom-5 right-5 pl-1 pr-1 flex items-center rounded-full shadow-lg overflow-hidden border ${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-100 border-neutral-200'} z-50 pointer-events-auto`}>
  {/* Audio Toggle Button */}
  <motion.button
    type="button"
    onClick={toggleAudio}
    aria-label={muted ? 'Unmute' : 'Mute'}
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    animate={{ scale: muted ? 0.98 : 1 }}
    className="p-2"
  >
    <motion.div
      animate={{
        color: muted ? (isDark ? '#fb7185' : '#dc2626') : (isDark ? '#34d399' : '#16a34a'),
        rotate: muted ? 0 : 0,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
    >
      {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </motion.div>
  </motion.button>

  {/* Divider */}
  <div className={`h-6 w-px ${isDark ? 'bg-neutral-600' : 'bg-neutral-300'}`} />

  {/* Theme Toggle (without fixed positioning) */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="button"
    onClick={toggleTheme}
    className={`p-2 transition-colors ${isDark ? 'text-yellow-400' : 'text-indigo-600'}`}
  >
    <AnimatePresence mode="wait">
      {isDark ? (
        <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
          <Sun className="w-5 h-5" />
        </motion.div>
      ) : (
        <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
          <Moon className="w-5 h-5" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
</div>

          

      <footer className={`w-full pt-8 ${isDark ? 'text-neutral-600' : 'text-neutral-400'} text-center text-[9px] font-mono uppercase tracking-widest md:pb-6 pb-1 relative z-10`}>
        Tic Tac Toe @ Raj Prajapati ● {new Date().getFullYear()}
      </footer>
    </motion.div>
  );
}
