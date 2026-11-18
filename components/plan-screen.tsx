"use client";

import Link from "next/link";
import { ExampleBadge } from "@/components/screen-header";
import { useProgress } from "@/components/use-progress";
import { completionHint, doneCount, PLAN_ITEMS } from "@/lib/plan";

export function PlanScreen() {
  const { progress, write } = useProgress();
  const done = doneCount(progress.plan);

  function toggle(id: string) {
    write((current) => ({
      ...current,
      plan: { ...current.plan, [id]: !current.plan[id] },
    }));
  }

  return (
    <>
      <header className="m-head">
        <div className="m-head-row">
          <div>
            <div className="kicker">Weekly plan & progress</div>
            <h1>Week of 10–16 Nov 2026</h1>
            <p className="sub">Focus items from recurring mistakes. All figures are example data.</p>
          </div>
          <ExampleBadge />
        </div>
      </header>
      <div className="m-body">
        <div className="metrics">
          <Metric label="Games analyzed" value="12" foot="+3 vs last week · example" tone="up" />
          <Metric label="Avg. accuracy" value="74%" foot="+2 pts vs last week · example" tone="up" />
          <Metric label="Rating trend" value="1,588" foot="−12 this week · example" tone="down" />
          <Metric
            label="Plan completion"
            value={`${done} / ${PLAN_ITEMS.length}`}
            foot={completionHint(done)}
            tone="hint"
          />
        </div>
        <section className="card card-pad plan-card">
          <div className="plan-head">
            <h2 className="card-title">This week’s plan</h2>
            <span className="plan-count">{PLAN_ITEMS.length} items · example</span>
          </div>
          {PLAN_ITEMS.map((item, itemIndex) => {
            const checked = Boolean(progress.plan[item.id]);
            return (
              <button
                type="button"
                className={itemIndex === 0 ? "plan-item first" : "plan-item"}
                key={item.id}
                aria-pressed={checked}
                onClick={() => toggle(item.id)}
              >
                <span className={checked ? "check on" : "check"} aria-hidden="true">
                  {checked ? (
                    <svg width="10" height="10" viewBox="0 0 12 12">
                      <path
                        d="M2 6.5l2.5 2.5L10 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : null}
                </span>
                <span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="meta">
                    <span className="bar">
                      <span
                        style={{
                          width: checked ? "100%" : `${item.fill}%`,
                          background: checked ? "var(--good)" : undefined,
                        }}
                      />
                    </span>
                    {item.drillsLabel}
                  </span>
                </span>
                <span className="pct">{checked ? "Done" : item.percent}</span>
              </button>
            );
          })}
        </section>
        {progress.analysis ? (
          <Link href="/analysis" className="card card-pad resume">
            Last review is saved on this phone. Open analysis to continue.
          </Link>
        ) : null}
      </div>
    </>
  );
}

function Metric({
  label,
  value,
  foot,
  tone,
}: {
  label: string;
  value: string;
  foot: string;
  tone: "up" | "down" | "hint";
}) {
  return (
    <div className="card metric">
      <div className="lbl">{label}</div>
      <div className="val">{value}</div>
      <div className={tone === "hint" ? "hint" : `delta ${tone}`}>{foot}</div>
    </div>
  );
}
