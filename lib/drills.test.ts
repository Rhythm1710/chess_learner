import { describe, expect, it } from "vitest";
import { DRILLS, OPENING_DRILL_INDEX } from "./drills";
import { isCheckmate, playMove } from "./game";

describe("practice drills", () => {
  it("keeps ten drills and opens on the Maya example", () => {
    expect(DRILLS).toHaveLength(10);
    expect(new Set(DRILLS.map((drill) => drill.id)).size).toBe(10);
    expect(OPENING_DRILL_INDEX).toBe(4);
    expect(DRILLS[4]?.kicker).toBe("Practice board · drill 5 of 10");
  });

  it("accepts every best move, and mates when the drill says so", () => {
    for (const drill of DRILLS) {
      const played = playMove(
        drill.fen,
        drill.best.from,
        drill.best.to,
        drill.best.promotion,
      );
      expect(played, drill.id).not.toBeNull();
      expect(isCheckmate(played!.fen)).toBe(drill.mate);
    }
  });
});
