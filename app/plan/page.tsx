import { ExampleBadge, ScreenHeader } from "@/components/screen-header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Plan" };

export default function PlanPage() {
  return (
    <>
      <ScreenHeader
        kicker="Weekly plan & progress"
        title="This week"
        sub="Solved work and the last position stay on this phone. No account."
        aside={<ExampleBadge />}
      />
      <div className="m-body">
        <section className="card card-pad">
          <h2 className="card-title">Plan</h2>
          <p className="shell-note">
            The week’s items and the counts behind them will be kept in this browser.
          </p>
        </section>
      </div>
    </>
  );
}
