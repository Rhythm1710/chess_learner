import { describe, expect, it } from "vitest";
import { finishPointerDrag } from "./pointer-drag";

describe("pointer drag cancellation", () => {
  it("clears the drag and the ghost when the pointer is cancelled", () => {
    const drag = { current: { from: "d3", moved: true } };
    let ghost: string | null = "wb";
    const kept = finishPointerDrag(drag, () => {
      ghost = null;
    }, true);
    expect(kept).toBeNull();
    expect(drag.current).toBeNull();
    expect(ghost).toBeNull();
  });

  it("clears the drag and the ghost when pointer capture is lost", () => {
    const drag = { current: { from: "e2", moved: true } };
    let ghost: string | null = "wn";
    const kept = finishPointerDrag(drag, () => {
      ghost = null;
    }, true);
    expect(kept).toBeNull();
    expect(drag.current).toBeNull();
    expect(ghost).toBeNull();
  });

  it("still returns the drag on a normal pointer up", () => {
    const drag = { current: { from: "d4", moved: true } };
    const kept = finishPointerDrag(drag, () => undefined, false);
    expect(kept?.from).toBe("d4");
    expect(drag.current).toBeNull();
  });
});
