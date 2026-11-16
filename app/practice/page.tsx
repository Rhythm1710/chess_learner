import { ExampleBadge, ScreenHeader } from "@/components/screen-header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <>
      <ScreenHeader
        kicker="Practice board"
        title="Find the best move"
        sub="Tap a piece, then a square, or drag. The board fills the width of the phone."
        aside={<ExampleBadge />}
      />
      <div className="m-body">
        <section className="card card-pad">
          <h2 className="card-title">Drill</h2>
          <p className="shell-note">
            The position, hint, and next-drill controls will replace this note.
          </p>
        </section>
      </div>
    </>
  );
}
