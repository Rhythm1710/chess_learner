"use client";

import { useRef, useState } from "react";
import { Piece } from "@/components/piece";
import type { PointerEvent } from "react";
import {
  legalDestinations,
  readBoard,
  sideToMove,
  squaresInDisplayOrder,
  type BoardPiece,
} from "@/lib/game";
import { finishPointerDrag } from "@/lib/pointer-drag";

export interface BoardMarks {
  hi: string[];
  from?: string;
  toBad?: string;
}

interface DragState {
  from: string;
  originX: number;
  originY: number;
  moved: boolean;
  piece: BoardPiece;
}

type BoardPointer = PointerEvent<HTMLButtonElement>;

export function ChessBoard({
  fen,
  marks,
  selected,
  onSelect,
  onMove,
}: {
  fen: string;
  marks: BoardMarks | null;
  selected: string | null;
  onSelect: (square: string | null) => void;
  onMove: (from: string, to: string) => void;
}) {
  const drag = useRef<DragState | null>(null);
  const [ghost, setGhost] = useState<{ id: string; x: number; y: number } | null>(null);
  const turn = sideToMove(fen);
  const pieces = readBoard(fen);
  const destinations = selected ? legalDestinations(fen, selected) : [];
  const squares = squaresInDisplayOrder();

  function tap(square: string) {
    const piece = pieces.get(square) ?? null;
    if (selected && destinations.includes(square)) {
      onMove(selected, square);
      return;
    }
    if (piece && piece.color === turn) {
      onSelect(selected === square ? null : square);
      return;
    }
    onSelect(null);
  }

  function pointerDown(event: BoardPointer, square: string) {
    const piece = pieces.get(square) ?? null;
    if (!piece || piece.color !== turn) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      from: square,
      originX: event.clientX,
      originY: event.clientY,
      moved: false,
      piece,
    };
  }

  function pointerMove(event: BoardPointer) {
    const current = drag.current;
    if (!current) return;
    const distance = Math.hypot(event.clientX - current.originX, event.clientY - current.originY);
    if (distance > 8) current.moved = true;
    if (current.moved) {
      setGhost({
        id: `${current.piece.color}${current.piece.type}`,
        x: event.clientX,
        y: event.clientY,
      });
    }
  }

  function hideGhost() {
    setGhost(null);
  }

  function pointerUp(event: BoardPointer, square: string) {
    const current = finishPointerDrag(drag, hideGhost, false);
    if (!current) {
      tap(square);
      return;
    }
    if (!current.moved) {
      tap(square);
      return;
    }
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>("[data-sq]")
      ?.dataset.sq;
    if (target && target !== current.from) {
      onSelect(current.from);
      onMove(current.from, target);
      return;
    }
    tap(current.from);
  }

  function pointerCancel() {
    finishPointerDrag(drag, hideGhost, true);
  }

  return (
    <>
      <div className="board md" role="group" aria-label="Practice board">
        {Array.from({ length: 8 }, (_, row) => {
          const rank = 8 - row;
          const rowSquares = squares.slice(row * 8, row * 8 + 8);
          return (
            <Rank
              key={rank}
              rank={rank}
              squares={rowSquares}
              pieces={pieces}
              marks={marks}
              selected={selected}
              destinations={destinations}
              onPointerDown={pointerDown}
              onPointerMove={pointerMove}
              onPointerUp={pointerUp}
              onPointerCancel={pointerCancel}
            />
          );
        })}
        <div />
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((file) => (
          <div key={file} className="coord-f">
            {file}
          </div>
        ))}
      </div>
      {ghost ? (
        <div className="drag-ghost" style={{ left: ghost.x, top: ghost.y }}>
          <Piece id={ghost.id} />
        </div>
      ) : null}
    </>
  );
}

function Rank({
  rank,
  squares,
  pieces,
  marks,
  selected,
  destinations,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: {
  rank: number;
  squares: string[];
  pieces: Map<string, BoardPiece>;
  marks: BoardMarks | null;
  selected: string | null;
  destinations: string[];
  onPointerDown: (event: BoardPointer, square: string) => void;
  onPointerMove: (event: BoardPointer) => void;
  onPointerUp: (event: BoardPointer, square: string) => void;
  onPointerCancel: () => void;
}) {
  return (
    <>
      <div className="coord-r">{rank}</div>
      {squares.map((square, index) => {
        const piece = pieces.get(square) ?? null;
        const dark = (index + (8 - rank)) % 2 === 0;
        const classes = ["sq", dark ? "d" : "l"];
        if (marks && !selected) {
          if (marks.hi.includes(square)) classes.push("hi");
          if (marks.from === square) classes.push("from");
          if (marks.toBad === square) classes.push("to-bad");
        }
        if (selected === square) classes.push("selected");
        if (selected && destinations.includes(square)) {
          classes.push("dot");
          if (piece) classes.push("capture");
        }
        const label = piece
          ? `${square}, ${piece.color === "w" ? "white" : "black"} ${piece.type}`
          : square;
        return (
          <button
            key={square}
            type="button"
            className={classes.join(" ")}
            data-sq={square}
            aria-label={label}
            aria-pressed={selected === square}
            onPointerDown={(event) => onPointerDown(event, square)}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => onPointerUp(event, square)}
            onPointerCancel={onPointerCancel}
            onLostPointerCapture={onPointerCancel}
          >
            {piece ? <Piece id={`${piece.color}${piece.type}`} /> : null}
          </button>
        );
      })}
    </>
  );
}
