export interface DrillMove {
  from: string;
  to: string;
  promotion?: "q" | "r" | "b" | "n";
}

export interface DrillMarks {
  hi: string[];
  from?: string;
  toBad?: string;
}

export interface Drill {
  id: string;
  fen: string;
  best: DrillMove;
  mate: boolean;
  kicker: string;
  title: string;
  sub: string;
  theme: string;
  opponent: string;
  opponentNote: string;
  you: string;
  youNote: string;
  notQuite: string;
  yoursLabel: string;
  bestLabel: string;
  okBody: string;
  hint: string;
  showOpeningFeedback: boolean;
  openingMarks?: DrillMarks;
}

const MAYA =
  "r1bq1rk1/ppp2pp1/1n2p2p/8/3NP3/2PB4/PP3PPP/R1BQ1RK1 w - - 0 25";

export const DRILLS: Drill[] = [
  {
    id: "back-rank",
    fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1",
    best: { from: "a1", to: "a8" },
    mate: true,
    kicker: "Practice board · drill 1 of 10",
    title: "Find the best move",
    sub: "Back rank. Example position.",
    theme: "Back rank",
    opponent: "Example",
    opponentNote: "Black to defend",
    you: "You to move",
    youNote: "White",
    notQuite: "That check is not mate. The rook belongs on the eighth rank.",
    yoursLabel: "Your try",
    bestLabel: "Ra8#",
    okBody: "Ra8 is mate. The king has no flight square.",
    hint: "The rook can reach the eighth rank along the open a-file.",
    showOpeningFeedback: false,
  },
  {
    id: "queen-h7",
    fen: "7k/8/6K1/8/8/8/7Q/8 w - - 0 1",
    best: { from: "h2", to: "h7" },
    mate: true,
    kicker: "Practice board · drill 2 of 10",
    title: "Find the best move",
    sub: "Queen and king. Example position.",
    theme: "Queen mate",
    opponent: "Example",
    opponentNote: "King in the corner",
    you: "You to move",
    youNote: "White",
    notQuite: "The queen needs the king’s help on the square next to the enemy king.",
    yoursLabel: "Your try",
    bestLabel: "Qh7#",
    okBody: "Qh7 is mate. The king on g6 protects the queen.",
    hint: "Look for a queen check on h7.",
    showOpeningFeedback: false,
  },
  {
    id: "scholar",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
    best: { from: "h5", to: "f7" },
    mate: true,
    kicker: "Practice board · drill 3 of 10",
    title: "Find the best move",
    sub: "The f7 pawn is loose. Example position.",
    theme: "f7",
    opponent: "Example",
    opponentNote: "Black",
    you: "You to move",
    youNote: "White",
    notQuite: "The queen is already aimed at f7. Another quiet move lets Black out.",
    yoursLabel: "Your try",
    bestLabel: "Qxf7#",
    okBody: "Qxf7 is mate. The bishop on c4 protects the queen.",
    hint: "The queen on h5 can capture on f7.",
    showOpeningFeedback: false,
  },
  {
    id: "smothered",
    fen: "6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1",
    best: { from: "h6", to: "f7" },
    mate: true,
    kicker: "Practice board · drill 4 of 10",
    title: "Find the best move",
    sub: "The king is boxed in by its own pieces. Example position.",
    theme: "Knight mate",
    opponent: "Example",
    opponentNote: "Black",
    you: "You to move",
    youNote: "White",
    notQuite: "Only one knight jump finishes the game.",
    yoursLabel: "Your try",
    bestLabel: "Nf7#",
    okBody: "Nf7 is mate. The king cannot capture the knight or step aside.",
    hint: "The knight on h6 jumps to f7.",
    showOpeningFeedback: false,
  },
  {
    id: "maya-nexe6",
    fen: MAYA,
    best: { from: "d4", to: "e6" },
    mate: false,
    kicker: "Practice board · drill 5 of 10",
    title: "Find the best move",
    sub: "From vs Maya K., move 25 (example). You played Be2.",
    theme: "Hanging pieces / knight tactics",
    opponent: "Maya K.",
    opponentNote: "Before Be2",
    you: "You to move",
    youNote: "White",
    notQuite:
      "Be2 is the same retreat as in the example game. It is too quiet — the knight on d4 can strike e6.",
    yoursLabel: "25.Be2",
    bestLabel: "25.Nxe6",
    okBody: "Nxe6 wins the pawn. The knight on d4 was the active piece.",
    hint: "The knight on d4 can capture the pawn on e6.",
    showOpeningFeedback: true,
    openingMarks: { hi: ["e6", "d4"], from: "d3", toBad: "e2" },
  },
  {
    id: "qa7",
    fen: "k7/2Q5/1K6/8/8/8/8/8 w - - 0 1",
    best: { from: "c7", to: "a7" },
    mate: true,
    kicker: "Practice board · drill 6 of 10",
    title: "Find the best move",
    sub: "Queen beside the king. Example position.",
    theme: "Queen mate",
    opponent: "Example",
    opponentNote: "King on a8",
    you: "You to move",
    youNote: "White",
    notQuite: "The queen has to step next to the king, on a square your king defends.",
    yoursLabel: "Your try",
    bestLabel: "Qa7#",
    okBody: "Qa7 is mate. The king on b6 protects the queen.",
    hint: "Move the queen to a7.",
    showOpeningFeedback: false,
  },
  {
    id: "re8",
    fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
    best: { from: "e1", to: "e8" },
    mate: true,
    kicker: "Practice board · drill 7 of 10",
    title: "Find the best move",
    sub: "Open file against the king. Example position.",
    theme: "Back rank",
    opponent: "Example",
    opponentNote: "Black",
    you: "You to move",
    youNote: "White",
    notQuite: "A check on the e-file only works from the eighth rank.",
    yoursLabel: "Your try",
    bestLabel: "Re8#",
    okBody: "Re8 is mate along the eighth rank.",
    hint: "Slide the rook to e8.",
    showOpeningFeedback: false,
  },
  {
    id: "promote-f",
    fen: "7k/5P2/6K1/8/8/8/8/8 w - - 0 1",
    best: { from: "f7", to: "f8", promotion: "q" },
    mate: true,
    kicker: "Practice board · drill 8 of 10",
    title: "Find the best move",
    sub: "The pawn is one step from promoting. Example position.",
    theme: "Promotion",
    opponent: "Example",
    opponentNote: "King on h8",
    you: "You to move",
    youNote: "White",
    notQuite: "Under-promoting does not finish it. The new queen does.",
    yoursLabel: "Your try",
    bestLabel: "f8=Q#",
    okBody: "f8=Q is mate. A rook promotion would leave h7 open.",
    hint: "Promote the f-pawn to a queen.",
    showOpeningFeedback: false,
  },
  {
    id: "promote-e",
    fen: "6k1/4P3/6K1/8/8/8/8/8 w - - 0 1",
    best: { from: "e7", to: "e8", promotion: "q" },
    mate: true,
    kicker: "Practice board · drill 9 of 10",
    title: "Find the best move",
    sub: "Another promotion. Example position.",
    theme: "Promotion",
    opponent: "Example",
    opponentNote: "King on g8",
    you: "You to move",
    youNote: "White",
    notQuite: "The pawn has to promote, and only the queen is mate.",
    yoursLabel: "Your try",
    bestLabel: "e8=Q#",
    okBody: "e8=Q is mate beside the king.",
    hint: "Push the e-pawn and promote to a queen.",
    showOpeningFeedback: false,
  },
  {
    id: "qe8",
    fen: "6k1/6pp/8/8/8/8/8/4Q1K1 w - - 0 1",
    best: { from: "e1", to: "e8" },
    mate: true,
    kicker: "Practice board · drill 10 of 10",
    title: "Find the best move",
    sub: "Queen on the open file. Example position.",
    theme: "Queen mate",
    opponent: "Example",
    opponentNote: "Black",
    you: "You to move",
    youNote: "White",
    notQuite: "Checks along the file are not all mate. The queen needs the eighth rank.",
    yoursLabel: "Your try",
    bestLabel: "Qe8#",
    okBody: "Qe8 is mate. The pawns block the king’s other squares.",
    hint: "Move the queen to e8.",
    showOpeningFeedback: false,
  },
];

export const OPENING_DRILL_INDEX = DRILLS.findIndex((drill) => drill.id === "maya-nexe6");
