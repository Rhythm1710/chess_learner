import { describe, expect, it } from "vitest";
import { materialScores, parsePgn } from "./pgn";

const EXAMPLE = `[Event "Example"]
[White "You"]
[Black "Maya K."]
[Result "0-1"]
[SetUp "1"]
[FEN "r1bq1rk1/ppp2pp1/1n2p2p/8/3NP3/2PB4/PP3PPP/R1BQ1RK1 w - - 0 25"]

25. Be2 Qd6 26. Nf5`;

describe("PGN parsing", () => {
  it("rejects empty text and an illegal move", () => {
    expect(parsePgn("   ")).toBeNull();
    expect(parsePgn("1. Ke9")).toBeNull();
  });

  it("keeps a fen before the line and after every move", () => {
    const game = parsePgn(EXAMPLE);
    expect(game?.headers.White).toBe("You");
    expect(game?.headers.Black).toBe("Maya K.");
    expect(game?.sans).toEqual(["Be2", "Qd6", "Nf5"]);
    expect(game?.fens).toHaveLength(4);
    expect(game?.fens[0]).toContain("2PB4");
    expect(game?.fens[1]).toContain("PP2BPPP");
    expect(materialScores(game?.fens ?? [])).toHaveLength(4);
  });
});
