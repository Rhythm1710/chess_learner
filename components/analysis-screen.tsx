"use client";

import { useState } from "react";
import { ChessBoard } from "@/components/chess-board";
import { ExampleEvalGraph, MaterialGraph } from "@/components/eval-graph";
import { ExampleBadge } from "@/components/screen-header";
import { useProgress } from "@/components/use-progress";
import { materialScores, parsePgn, type ParsedGame } from "@/lib/pgn";

const DIAGRAM_FEN =
  "r1bq1rk1/ppp2pp1/1n2p2p/8/3NP3/2P1B3/PP3PPP/R1BQ1RK1 b - - 1 25";

const DIAGRAM_MARKS = { hi: ["e6"], from: "d3", toBad: "e2" };

export const EXAMPLE_PGN = `[Event "Example"]
[Site "chess.com"]
[Date "2026.11.02"]
[White "You"]
[Black "Maya K."]
[Result "0-1"]
[SetUp "1"]
[FEN "r1bq1rk1/ppp2pp1/1n2p2p/8/3NP3/2PB4/PP3PPP/R1BQ1RK1 w - - 0 25"]

25. Be2 Qd6 26. Nf5`;

export function AnalysisScreen() {
  const { progress, write } = useProgress();
  const [game, setGame] = useState<ParsedGame | null>(null);
  const [ply, setPly] = useState(0);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [draft, setDraft] = useState(EXAMPLE_PGN);
  const [error, setError] = useState<string | null>(null);
  const [appliedKey, setAppliedKey] = useState("");
  const saved = progress.analysis;
  const savedKey = saved ? `${saved.ply}\n${saved.pgn}` : "";
  if (saved && savedKey !== appliedKey) {
    const parsed = parsePgn(saved.pgn);
    setAppliedKey(savedKey);
    if (parsed) {
      setGame(parsed);
      setPly(Math.max(0, Math.min(saved.ply, parsed.fens.length - 1)));
      setDraft(saved.pgn);
    }
  }
  const onDiagram = game === null;
  const fen = onDiagram ? DIAGRAM_FEN : (game.fens[ply] ?? DIAGRAM_FEN);
  const san = onDiagram || ply === 0 ? null : game.sans[ply - 1];
  const scores = game ? materialScores(game.fens) : [];
  const moveLabel = onDiagram ? "25.Be2??" : san ?? "Start";

  function load(source: string, startPly: number) {
    const parsed = parsePgn(source);
    if (!parsed) {
      setError("That PGN could not be read.");
      return;
    }
    const nextPly = Math.max(0, Math.min(startPly, parsed.fens.length - 1));
    setGame(parsed);
    setPly(nextPly);
    setDraft(source);
    setError(null);
    setPasteOpen(false);
    write((current) => ({ ...current, analysis: { pgn: source, ply: nextPly } }));
  }

  function step(delta: number) {
    if (!game) {
      if (delta > 0) load(EXAMPLE_PGN, 1);
      return;
    }
    const next = Math.max(0, Math.min(game.fens.length - 1, ply + delta));
    setPly(next);
    write((current) =>
      current.analysis ? { ...current, analysis: { ...current.analysis, ply: next } } : current,
    );
  }

  return (
    <>
      <header className="m-head">
        <div className="m-head-row">
          <div>
            <div className="kicker">Game analysis · chess.com import</div>
            <h1>
              You vs Maya K. <span className="ex">(example)</span>
            </h1>
            <p className="sub">10 + 0 blitz · 2 Nov 2026 · White · example game</p>
          </div>
          <div className="head-aside">
            <ExampleBadge />
            <span className="badge loss">Loss · 0–1</span>
          </div>
        </div>
        <div className="acc-row">
          <div className="acc-cell">
            <div className="kicker">Your accuracy</div>
            <div className="num">
              71<span>%</span>
            </div>
          </div>
          <div className="acc-cell">
            <div className="kicker">Opponent</div>
            <div className="num">
              84<span>%</span>
            </div>
          </div>
        </div>
      </header>
      <div className="m-body">
        <section className="card card-pad">
          <div className="eval-head">
            <h2 className="card-title">
              {onDiagram ? "Evaluation · example graph" : "Evaluation · material sketch"}
            </h2>
            <span className="eval-callout">{moveLabel}</span>
          </div>
          <div className="eval">
            {onDiagram ? <ExampleEvalGraph /> : <MaterialGraph scores={scores} index={ply} />}
          </div>
          <div className="eval-labels">
            {onDiagram ? (
              <>
                <span>1</span>
                <span>10</span>
                <span>18</span>
                <span style={{ color: "var(--blunder)" }}>25</span>
                <span>32</span>
                <span>40</span>
              </>
            ) : (
              <span>
                Ply {ply} of {Math.max(0, game.fens.length - 1)} · not an engine
              </span>
            )}
          </div>
        </section>
        <section className="card card-pad board-card">
          <div className="player-line xs">
            <span>
              <i className="dot-b" />
              <strong>Maya K.</strong> 1642 (example)
            </span>
            <span>Black</span>
          </div>
          <ChessBoard
            fen={fen}
            size="xs"
            interactive={false}
            marks={onDiagram ? DIAGRAM_MARKS : null}
            selected={null}
            onSelect={() => undefined}
            onMove={() => undefined}
          />
          <div className="player-line xs">
            <span>
              <i className="dot-w" />
              <strong>You</strong> 1588 (example)
            </span>
            <span style={{ color: onDiagram ? "var(--blunder)" : "var(--text-2)" }}>{moveLabel}</span>
          </div>
          <div className="moment-strip">
            <div className="moment-head">
              <h2>{onDiagram ? "25.Be2?? · Blunder" : san ?? "Start of the line"}</h2>
              <span className="tag theme">Hanging pieces</span>
            </div>
            <p>
              {onDiagram
                ? "Eval −1.8 → −4.2. A passive retreat — Nxe6 was available, winning a pawn."
                : "Material only. No engine is running, so this note does not judge the move."}
            </p>
          </div>
          <div className="stepper">
            <button className="btn" type="button" onClick={() => step(-1)} aria-label="Previous move">
              Previous
            </button>
            <button className="btn" type="button" onClick={() => step(1)} aria-label="Next move">
              Next
            </button>
            <button className="btn subtle" type="button" onClick={() => setPasteOpen((open) => !open)}>
              Paste PGN
            </button>
          </div>
          {pasteOpen ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                load(draft, 0);
              }}
            >
              <textarea
                className="pgn-box"
                value={draft}
                aria-label="PGN"
                onChange={(event) => setDraft(event.target.value)}
              />
              {error ? <p className="pgn-error">{error}</p> : null}
              <div className="actions">
                <button className="btn primary" type="submit">
                  Load game
                </button>
              </div>
            </form>
          ) : null}
        </section>
      </div>
    </>
  );
}
