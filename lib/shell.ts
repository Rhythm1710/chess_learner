export const MIN_TAP_TARGET_PX = 44;

export const NAV_ITEMS = [
  { href: "/analysis", label: "Analysis", icon: "analysis" },
  { href: "/plan", label: "Plan", icon: "plan" },
  { href: "/practice", label: "Practice", icon: "practice" },
] as const;

export type NavIconName = (typeof NAV_ITEMS)[number]["icon"];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
