import { Chess } from "chess.js";

export interface ParsedGame {
  headers: Record<string, string>;
  sans: string[];
  fens: string[];
}

const PIECE_VALUE: Record<string, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

export function parsePgn(pgn: string): ParsedGame | null {
  const source = pgn.trim();
  if (!source) return null;
  const game = new Chess();
  try {
    game.loadPgn(source);
  } catch {
    return null;
  }
  const moves = game.history({ verbose: true });
  const headers = game.getHeaders();
  if (moves.length === 0) return null;
  return {
    headers,
    sans: moves.map((move) => move.san),
    fens: [moves[0].before, ...moves.map((move) => move.after)],
  };
}

export function materialScores(fens: string[]): number[] {
  return fens.map((fen) => {
    let score = 0;
    for (const rank of new Chess(fen).board()) {
      for (const piece of rank) {
        if (!piece) continue;
        const value = PIECE_VALUE[piece.type] ?? 0;
        score += piece.color === "w" ? value : -value;
      }
    }
    return score;
  });
}
