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
      try {
        setProgress(readProgress(window.localStorage));
      } catch {
        setProgress(DEFAULT_PROGRESS);
      }
      ready.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const write = useCallback((recipe: (current: StoredProgress) => StoredProgress) => {
    setProgress((current) => {
      const next = recipe(current);
      if (ready.current) {
        try {
          writeProgress(window.localStorage, next);
        } catch {
          // Keep the in-memory week if the browser refuses to store it.
        }
      }
      return next;
    });
  }, []);

  return { progress, write };
}
