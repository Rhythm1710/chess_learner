import { describe, expect, it } from "vitest";
import { doneCount } from "./plan";
import {
  DEFAULT_PROGRESS,
  PROGRESS_KEY,
  readProgress,
  writeProgress,
  type KeyValueStore,
  type StoredProgress,
} from "./progress";

function memory(): KeyValueStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
  };
}

describe("local progress", () => {
  it("starts from the example week when nothing is stored", () => {
    const stored = readProgress(memory());
    expect(doneCount(stored.plan)).toBe(2);
    expect(stored.practice.streak).toBe(6);
    expect(stored.practice.solvedToday).toBe(4);
    expect(stored.analysis).toBeNull();
  });

  it("keeps solved drills and the last game on the device", () => {
    const store = memory();
    const next: StoredProgress = {
      ...DEFAULT_PROGRESS,
      plan: { ...DEFAULT_PROGRESS.plan, "pawn-hunts": true },
      practice: {
        streak: 7,
        solvedToday: 5,
        solvedIds: ["maya-nexe6"],
        drillIndex: 5,
      },
      analysis: { pgn: "1. e4 e5", ply: 2 },
    };
    writeProgress(store, next);
    const loaded = readProgress(store);
    expect(store.data.get(PROGRESS_KEY)).toContain("maya-nexe6");
    expect(doneCount(loaded.plan)).toBe(3);
    expect(loaded.practice.drillIndex).toBe(5);
    expect(loaded.analysis).toEqual({ pgn: "1. e4 e5", ply: 2 });
  });

  it("ignores a broken record and falls back to the example", () => {
    const store = memory();
    store.setItem(PROGRESS_KEY, "{not json");
    expect(readProgress(store).plan).toEqual(DEFAULT_PROGRESS.plan);
  });
});
