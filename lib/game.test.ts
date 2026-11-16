import { describe, expect, it } from "vitest";
import {
  isCheckmate,
  legalDestinations,
  needsPromotion,
  pieceAt,
  playMove,
  sideToMove,
} from "./game";

const MAYA =
  "r1bq1rk1/ppp2pp1/1n2p2p/8/3NP3/2PB4/PP3PPP/R1BQ1RK1 w - - 0 25";

describe("move wrappers", () => {
  it("reads the side to move and the piece on a square", () => {
    expect(sideToMove(MAYA)).toBe("w");
    expect(pieceAt(MAYA, "d4")).toEqual({ color: "w", type: "n" });
    expect(pieceAt(MAYA, "d3")).toEqual({ color: "w", type: "b" });
    expect(pieceAt(MAYA, "e2")).toBeNull();
  });

  it("lists legal destinations and rejects an illegal move", () => {
    expect(legalDestinations(MAYA, "d4")).toEqual(
      expect.arrayContaining(["e6", "c6", "f5", "b5"]),
    );
    expect(playMove(MAYA, "d4", "d5")).toBeNull();
    expect(playMove(MAYA, "e2", "e4")).toBeNull();
  });

  it("plays the example tries Be2 and Nxe6", () => {
    expect(playMove(MAYA, "d3", "e2")?.san).toBe("Be2");
    const capture = playMove(MAYA, "d4", "e6");
    expect(capture?.san).toBe("Nxe6");
    expect(pieceAt(capture!.fen, "e6")?.type).toBe("n");
    expect(isCheckmate(capture!.fen)).toBe(false);
  });

  it("asks for a promotion only when a pawn reaches the last rank", () => {
    const fen = "8/P7/8/8/8/8/8/4K2k w - - 0 1";
    expect(needsPromotion(fen, "a7", "a8")).toBe(true);
    expect(needsPromotion(MAYA, "d3", "e2")).toBe(false);
    expect(playMove(fen, "a7", "a8")).toBeNull();
    expect(playMove(fen, "a7", "a8", "q")?.san).toBe("a8=Q+");
  });

  it("recognises a mating move", () => {
    const fen = "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1";
    const played = playMove(fen, "a1", "a8");
    expect(played?.san).toBe("Ra8#");
    expect(isCheckmate(played!.fen)).toBe(true);
  });
});
