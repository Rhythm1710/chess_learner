import { BottomNav } from "@/components/bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      {children}
      <BottomNav />
    </div>
  );
}
