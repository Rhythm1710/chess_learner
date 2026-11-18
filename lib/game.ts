import { Chess, type Square } from "chess.js";

export type Promotion = "q" | "r" | "b" | "n";

export interface BoardPiece {
  color: "w" | "b";
  type: "k" | "q" | "r" | "b" | "n" | "p";
}

export interface PlayedMove {
  fen: string;
  san: string;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

export function squaresInDisplayOrder(): string[] {
  const squares: string[] = [];
  for (let rank = 8; rank >= 1; rank -= 1) {
    for (const file of FILES) {
      squares.push(`${file}${rank}`);
    }
  }
  return squares;
}

export function pieceAt(fen: string, square: string): BoardPiece | null {
  return readBoard(fen).get(square) ?? null;
}

export function readBoard(fen: string): Map<string, BoardPiece> {
  const game = new Chess(fen);
  const pieces = new Map<string, BoardPiece>();
  for (const square of squaresInDisplayOrder()) {
    const piece = game.get(square as Square);
    if (piece) pieces.set(square, { color: piece.color, type: piece.type });
  }
  return pieces;
}

export function sideToMove(fen: string): "w" | "b" {
  return new Chess(fen).turn();
}

export function legalDestinations(fen: string, from: string): string[] {
  const game = new Chess(fen);
  return game
    .moves({ square: from as Square, verbose: true })
    .map((move) => move.to);
}

export function needsPromotion(fen: string, from: string, to: string): boolean {
  const piece = pieceAt(fen, from);
  if (!piece || piece.type !== "p") return false;
  const rank = to[1];
  const lastRank = piece.color === "w" ? "8" : "1";
  if (rank !== lastRank) return false;
  return legalDestinations(fen, from).includes(to);
}

export function playMove(
  fen: string,
  from: string,
  to: string,
  promotion?: Promotion,
): PlayedMove | null {
  const game = new Chess(fen);
  try {
    const move = game.move({ from, to, promotion });
    if (!move) return null;
    return { fen: game.fen(), san: move.san };
  } catch {
    return null;
  }
}

export function isCheckmate(fen: string): boolean {
  return new Chess(fen).isCheckmate();
}
