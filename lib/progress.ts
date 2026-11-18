import { OPENING_DRILL_INDEX } from "@/lib/drills";
import { defaultPlanDone } from "@/lib/plan";

export const PROGRESS_KEY = "chess-learner.progress.v1";

export interface PracticeProgress {
  streak: number;
  solvedToday: number;
  solvedIds: string[];
  drillIndex: number;
}

export interface AnalysisProgress {
  pgn: string;
  ply: number;
}

export interface StoredProgress {
  version: 1;
  plan: Record<string, boolean>;
  practice: PracticeProgress;
  analysis: AnalysisProgress | null;
}

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const DEFAULT_PROGRESS: StoredProgress = {
  version: 1,
  plan: defaultPlanDone(),
  practice: {
    streak: 6,
    solvedToday: 4,
    solvedIds: [],
    drillIndex: OPENING_DRILL_INDEX,
  },
  analysis: null,
};

export function readProgress(store: KeyValueStore): StoredProgress {
  const raw = store.getItem(PROGRESS_KEY);
  if (!raw) return DEFAULT_PROGRESS;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    if (parsed.version !== 1) return DEFAULT_PROGRESS;
    const practice = parsed.practice;
    return {
      version: 1,
      plan: { ...defaultPlanDone(), ...(parsed.plan ?? {}) },
      practice: {
        streak: numberOr(practice?.streak, DEFAULT_PROGRESS.practice.streak),
        solvedToday: numberOr(practice?.solvedToday, DEFAULT_PROGRESS.practice.solvedToday),
        solvedIds: Array.isArray(practice?.solvedIds)
          ? practice.solvedIds.filter((id) => typeof id === "string")
          : [],
        drillIndex: numberOr(practice?.drillIndex, DEFAULT_PROGRESS.practice.drillIndex),
      },
      analysis:
        parsed.analysis && typeof parsed.analysis.pgn === "string"
          ? { pgn: parsed.analysis.pgn, ply: numberOr(parsed.analysis.ply, 0) }
          : null,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function writeProgress(store: KeyValueStore, progress: StoredProgress): void {
  store.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function numberOr(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
