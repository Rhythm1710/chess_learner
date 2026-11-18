"use client";

import { useState } from "react";
import { ChessBoard, type BoardMarks } from "@/components/chess-board";
import { Piece } from "@/components/piece";
import { ExampleBadge } from "@/components/screen-header";
import { useProgress } from "@/components/use-progress";
import { DRILLS, type Drill } from "@/lib/drills";
import { needsPromotion, playMove, sideToMove, type Promotion } from "@/lib/game";

const PROMOTION_LABELS: Record<Promotion, string> = {
  q: "queen",
  r: "rook",
  b: "bishop",
  n: "knight",
};

export function PracticeScreen() {
  const { progress, write } = useProgress();
  const index = progress.practice.drillIndex;
  const drill = DRILLS[index] ?? DRILLS[0];
  const [fen, setFen] = useState(drill.fen);
  const [selected, setSelected] = useState<string | null>(null);
  const [pending, setPending] = useState<{ from: string; to: string } | null>(null);
  const [marks, setMarks] = useState<BoardMarks | null>(drill.openingMarks ?? null);
  const [phase, setPhase] = useState<"opening" | "wrong" | "ok" | null>(
    drill.showOpeningFeedback ? "opening" : null,
  );
  const [wrongSan, setWrongSan] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [boardIndex, setBoardIndex] = useState(index);

  if (boardIndex !== index) {
    setBoardIndex(index);
    setFen(drill.fen);
    setSelected(null);
    setPending(null);
    setMarks(drill.openingMarks ?? null);
    setPhase(drill.showOpeningFeedback ? "opening" : null);
    setWrongSan(null);
    setHint(false);
  }

  function load(nextIndex: number) {
    const wrapped = (nextIndex + DRILLS.length) % DRILLS.length;
    write((current) => ({
      ...current,
      practice: { ...current.practice, drillIndex: wrapped },
    }));
  }

  function finishCorrect(nextFen: string, drillId: string) {
    setFen(nextFen);
    setSelected(null);
    setPending(null);
    setMarks(null);
    setPhase("ok");
    setHint(false);
    write((current) => {
      if (current.practice.solvedIds.includes(drillId)) return current;
      return {
        ...current,
        practice: {
          ...current.practice,
          solvedIds: [...current.practice.solvedIds, drillId],
          streak: current.practice.streak + 1,
          solvedToday: Math.min(10, current.practice.solvedToday + 1),
        },
      };
    });
  }

  function commit(from: string, to: string, promotion?: Promotion) {
    const played = playMove(fen, from, to, promotion);
    if (!played) return;
    const best = drill.best;
    const matches =
      from === best.from &&
      to === best.to &&
      (best.promotion ?? "q") === (promotion ?? best.promotion ?? "q");
    if (matches) {
      finishCorrect(played.fen, drill.id);
      return;
    }
    setSelected(null);
    setPending(null);
    setWrongSan(played.san);
    setPhase("wrong");
    setMarks({
      hi: [drill.best.from],
      from,
      toBad: to,
    });
  }

  function selectSquare(square: string | null) {
    setSelected(square);
    if (square && pending && square !== pending.from) {
      setPending(null);
    }
  }

  function onMove(from: string, to: string) {
    if (needsPromotion(fen, from, to)) {
      setPending({ from, to });
      setSelected(from);
      return;
    }
    commit(from, to);
  }

  function reveal() {
    const played = playMove(drill.fen, drill.best.from, drill.best.to, drill.best.promotion);
    if (!played) return;
    setFen(played.fen);
    setSelected(null);
    setPending(null);
    setMarks(null);
    setPhase("ok");
    setHint(false);
  }

  const showFeedback = phase !== null;
  const ok = phase === "ok";
  const body =
    phase === "ok"
      ? drill.okBody
      : phase === "opening"
        ? drill.notQuite
        : phase === "wrong"
          ? wrongSan === "Be2" && drill.id === "maya-nexe6"
            ? drill.notQuite
            : "That is not the move. The best square is still available."
          : "";
  const yours =
    phase === "opening"
      ? drill.yoursLabel
      : phase === "wrong" && wrongSan
        ? wrongSan
        : drill.yoursLabel;

  return (
    <>
      <header className="m-head">
        <div className="m-head-row">
          <div>
            <div className="kicker">{drill.kicker}</div>
            <h1>{drill.title}</h1>
            <p className="sub">{drill.sub}</p>
          </div>
          <div className="head-aside">
            <ExampleBadge />
            <div className="card streak-card">
              <div>
                <div className="kicker">Streak</div>
                <div className="streak-num">{progress.practice.streak}</div>
              </div>
              <div className="streak-rule" />
              <div>
                <div className="kicker">Today</div>
                <div className="today-num">{progress.practice.solvedToday} / 10</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="m-body">
        <section className="card card-pad board-card">
          <PlayerLine
            dot="b"
            name={drill.opponent}
            detail={drill.id === "maya-nexe6" ? "example opponent" : drill.opponentNote}
            trailing={drill.id === "maya-nexe6" && phase === "opening" ? "Before Be2" : ""}
          />
          <ChessBoard
            fen={fen}
            marks={hint ? withHint(marks, drill) : marks}
            selected={selected}
            onSelect={selectSquare}
            onMove={onMove}
          />
          <PlayerLine
            dot="w"
            name={drill.you}
            detail="White"
            trailing={
              phase === "opening" && drill.id === "maya-nexe6"
                ? "Attempt: Be2"
                : phase === "ok"
                  ? drill.bestLabel
                  : ""
            }
          />
        </section>
        <section className="card card-pad">
          <div className="kicker">{drill.theme}</div>
          {showFeedback ? (
            <div className={ok ? "feedback ok" : "feedback"}>
              <div className="lbl">{ok ? "Best move" : "Not quite"}</div>
              <p>{body}</p>
              {hint && !ok ? <p className="hint-line">{drill.hint}</p> : null}
              <div className="best">
                {ok
                  ? `Best  ${drill.bestLabel}`
                  : `Your try  ${yours}  ·  Best  ${drill.bestLabel}`}
              </div>
            </div>
          ) : null}
          {pending ? (
            <div className="promote" role="group" aria-label="Choose the promotion">
              {(Object.keys(PROMOTION_LABELS) as Promotion[]).map((piece) => (
                <button
                  key={piece}
                  type="button"
                  aria-label={`Promote to ${PROMOTION_LABELS[piece]}`}
                  onClick={() => commit(pending.from, pending.to, piece)}
                >
                  <Piece id={`${sideToMove(fen)}${piece}`} />
                </button>
              ))}
            </div>
          ) : null}
          <div className="actions">
            <button className="btn subtle" type="button" onClick={() => setHint(true)}>
              Hint
            </button>
            <button className="btn" type="button" onClick={reveal}>
              Reveal
            </button>
            <button
              className="btn primary"
              type="button"
              onClick={() => load((index + 1) % DRILLS.length)}
            >
              Next drill
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

function withHint(marks: BoardMarks | null, drill: Drill): BoardMarks {
  const hi = new Set(marks?.hi ?? []);
  hi.add(drill.best.from);
  return { hi: [...hi], from: marks?.from, toBad: marks?.toBad };
}

function PlayerLine({
  dot,
  name,
  detail,
  trailing,
}: {
  dot: "w" | "b";
  name: string;
  detail: string;
  trailing: string;
}) {
  return (
    <div className="player-line">
      <span>
        <i className={dot === "w" ? "dot-w" : "dot-b"} />
        <strong>{name}</strong>
        {detail ? ` · ${detail}` : ""}
      </span>
      <span style={{ color: "var(--text-3)" }}>{trailing}</span>
    </div>
  );
}
