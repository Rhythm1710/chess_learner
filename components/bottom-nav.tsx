"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TabIcon } from "@/components/tab-icon";
import { isNavItemActive, NAV_ITEMS } from "@/lib/shell";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="tabbar" aria-label="Primary">
      {NAV_ITEMS.map((item) => {
        const active = isNavItemActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "tab active" : "tab"}
            aria-current={active ? "page" : undefined}
          >
            <TabIcon name={item.icon} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
