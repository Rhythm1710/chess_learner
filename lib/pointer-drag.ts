export interface DragHandle<T> {
  current: T | null;
}

/**
 * End a pointer drag.
 * A cancelled pointer, or one that loses capture, must not keep the drag or the ghost.
 * A normal pointer-up returns the drag so the drop can still be applied.
 */
export function finishPointerDrag<T>(
  drag: DragHandle<T>,
  hideGhost: () => void,
  cancelled: boolean,
): T | null {
  const current = drag.current;
  drag.current = null;
  hideGhost();
  if (cancelled) return null;
  return current;
}
