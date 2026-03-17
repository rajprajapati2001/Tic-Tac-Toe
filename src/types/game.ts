export type Player = 'X' | 'O' | null;
export type GameMode = 'vs-computer' | 'vs-friend' | null;
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Theme = 'dark' | 'light';

export interface GameResult {
  winner: Player | 'Draw';
  line: number[] | null;
}
