import type { Difficulty, GameResult, Player } from '../types/game';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const createEmptyBoard = (): Player[] => Array.from({ length: 9 }, () => null);

export const calculateWinner = (squares: Player[]): GameResult | null => {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }

  if (squares.every((square) => square !== null)) {
    return { winner: 'Draw', line: null };
  }

  return null;
};

export const getComputerMove = (
  currentBoard: Player[],
  difficulty: Difficulty = 'Hard',
): number | undefined => {
  const emptySquares = currentBoard
    .map((square, index) => (square === null ? index : null))
    .filter((square): square is number => square !== null);

  if (emptySquares.length === 0) return undefined;

  // Easy: Always random
  if (difficulty === 'Easy') {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  // Medium: 50% chance to play random, 50% chance to play smart
  if (difficulty === 'Medium' && Math.random() < 0.5) {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  // Smart Logic (Hard or "Smart" Medium)
  // 1. Try to win
  for (const move of emptySquares) {
    const trialBoard = [...currentBoard];
    trialBoard[move] = 'O';

    if (calculateWinner(trialBoard)?.winner === 'O') {
      return move;
    }
  }

  // 2. Try to block
  for (const move of emptySquares) {
    const trialBoard = [...currentBoard];
    trialBoard[move] = 'X';

    if (calculateWinner(trialBoard)?.winner === 'X') {
      return move;
    }
  }

  // 3. Take center if available
  if (currentBoard[4] === null) {
    return 4;
  }

  // 4. Random move
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};
