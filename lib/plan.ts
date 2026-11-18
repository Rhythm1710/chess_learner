export interface PlanItem {
  id: string;
  title: string;
  body: string;
  drillsLabel: string;
  fill: number;
  good: boolean;
  percent: string;
}

export const PLAN_ITEMS: PlanItem[] = [
  {
    id: "hanging",
    title: "Hanging pieces — look once more",
    body: "Left a piece en prise in 6 example games last month.",
    drillsLabel: "8 / 8 drills",
    fill: 100,
    good: true,
    percent: "Done",
  },
  {
    id: "outposts",
    title: "Knight outposts on e6 / d6",
    body: "The Nxe6 idea from the Maya K. example, missed twice more.",
    drillsLabel: "5 / 5 drills",
    fill: 100,
    good: true,
    percent: "Done",
  },
  {
    id: "pawn-hunts",
    title: "Stop pawn hunts when a tactic is on",
    body: "Example: 18.a4 in that same game. Forcing move first.",
    drillsLabel: "2 / 5 drills",
    fill: 40,
    good: false,
    percent: "40%",
  },
  {
    id: "back-rank",
    title: "Back-rank awareness in won positions",
    body: "Two example endgames slipped after a rook left the first rank.",
    drillsLabel: "1 / 6 drills",
    fill: 16,
    good: false,
    percent: "16%",
  },
];

export function defaultPlanDone(): Record<string, boolean> {
  return {
    hanging: true,
    outposts: true,
    "pawn-hunts": false,
    "back-rank": false,
  };
}

export function doneCount(done: Record<string, boolean>): number {
  return PLAN_ITEMS.filter((item) => done[item.id]).length;
}

export function completionHint(done: number): string {
  const open = PLAN_ITEMS.length - done;
  if (open === 2) return "Two items still open · example";
  if (open === 0) return "All items checked · example";
  if (open === 1) return "One item still open · example";
  return `${open} items still open · example`;
}
