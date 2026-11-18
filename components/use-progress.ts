"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_PROGRESS,
  readProgress,
  writeProgress,
  type StoredProgress,
} from "@/lib/progress";

export function useProgress() {
  const [progress, setProgress] = useState<StoredProgress>(DEFAULT_PROGRESS);
  const ready = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProgress(readProgress(window.localStorage));
      ready.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const write = useCallback((recipe: (current: StoredProgress) => StoredProgress) => {
    setProgress((current) => {
      const next = recipe(current);
      if (ready.current) writeProgress(window.localStorage, next);
      return next;
    });
  }, []);

  return { progress, write };
}
