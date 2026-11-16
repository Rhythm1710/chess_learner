import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { isNavItemActive, MIN_TAP_TARGET_PX, NAV_ITEMS } from "./shell";

describe("shell", () => {
  it("keeps tab hit areas at least 44px", () => {
    expect(MIN_TAP_TARGET_PX).toBeGreaterThanOrEqual(44);
  });

  it("lists Analysis, Plan, and Practice once each", () => {
    expect(NAV_ITEMS.map((item) => [item.href, item.label])).toEqual([
      ["/analysis", "Analysis"],
      ["/plan", "Plan"],
      ["/practice", "Practice"],
    ]);
  });

  it("marks only the matching tab active", () => {
    expect(isNavItemActive("/analysis", "/analysis")).toBe(true);
    expect(isNavItemActive("/plan", "/analysis")).toBe(false);
    expect(isNavItemActive("/practice/2", "/practice")).toBe(true);
  });
});

describe("design tokens", () => {
  const css = readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");

  it("uses the approved palette and type scale", () => {
    expect(css).toContain("--bg: #101210;");
    expect(css).toContain("--bg-nav: #141715;");
    expect(css).toContain("--accent: #C4A574;");
    expect(css).toContain("--accent-2: #D4B88A;");
    expect(css).toContain("--sq-light: #D4C4A0;");
    expect(css).toContain("--sq-dark: #5C6A56;");
    expect(css).toContain("--blunder: #E25A4A;");
    expect(css).toContain("--fs-base: 14px;");
    expect(css).toContain("--r-lg: 14px;");
  });

  it("pads for the device safe area instead of a drawn status bar", () => {
    expect(css).toContain("env(safe-area-inset-top)");
    expect(css).toContain("env(safe-area-inset-bottom)");
    expect(css).not.toContain(".status-bar");
    expect(css).not.toContain(".home-ind");
  });

  it("keeps the 550 tag weight for the variable sans", () => {
    expect(css).toContain("font-weight: 550;");
  });
});
