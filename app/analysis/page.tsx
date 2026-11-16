import { ExampleBadge, ScreenHeader } from "@/components/screen-header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analysis" };

export default function AnalysisPage() {
  return (
    <>
      <ScreenHeader
        kicker="Game analysis"
        title="You vs Maya K."
        example
        sub="Paste a game and step the moves. The review board lands on this screen."
        aside={<ExampleBadge />}
      />
      <div className="m-body">
        <section className="card card-pad">
          <h2 className="card-title">Review</h2>
          <p className="shell-note">
            Evaluation, the position, and the critical moment will sit in this column.
          </p>
        </section>
      </div>
    </>
  );
}
