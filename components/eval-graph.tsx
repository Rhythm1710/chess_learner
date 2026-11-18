export function ExampleEvalGraph() {
  return (
    <svg viewBox="0 0 1120 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="eval-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6BAA7A" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#6BAA7A" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <path
        d="M0 42 C40 40, 70 38, 100 36 S160 30, 200 28 S260 32, 300 34 S360 38, 420 36 S480 30, 520 33 S560 40, 600 48 S640 70, 700 78 S760 74, 820 80 S880 86, 940 88 S1000 84, 1120 90 L1120 50 L0 50 Z"
        fill="url(#eval-up)"
      />
      <path
        d="M620 56 S640 70, 700 78 S760 74, 820 80 S880 86, 940 88 S1000 84, 1120 90 L1120 50 L620 50 Z"
        fill="#E25A4A"
        fillOpacity="0.28"
      />
      <path
        d="M0 42 C40 40, 70 38, 100 36 S160 30, 200 28 S260 32, 300 34 S360 38, 420 36 S480 30, 520 33 S560 40, 600 48 S640 70, 700 78 S760 74, 820 80 S880 86, 940 88 S1000 84, 1120 90"
        fill="none"
        stroke="#C4A574"
        strokeWidth="1.75"
      />
      <line
        x1="0"
        y1="50"
        x2="1120"
        y2="50"
        stroke="rgba(237,235,228,0.16)"
        strokeDasharray="4 4"
        strokeWidth="1"
      />
      <circle cx="336" cy="36" r="5" fill="#D4C15A" stroke="#101210" strokeWidth="1" />
      <circle cx="504" cy="33" r="5" fill="#E39A4A" stroke="#101210" strokeWidth="1" />
      <circle cx="700" cy="78" r="5.5" fill="#E25A4A" stroke="#101210" strokeWidth="1" />
      <line
        x1="700"
        y1="6"
        x2="700"
        y2="94"
        stroke="#E25A4A"
        strokeWidth="1.25"
        strokeDasharray="2 3"
        opacity="0.85"
      />
    </svg>
  );
}

export function MaterialGraph({ scores, index }: { scores: number[]; index: number }) {
  const width = 1120;
  const points = scores.map((score, pointIndex) => {
    const x = scores.length <= 1 ? 0 : (pointIndex / (scores.length - 1)) * width;
    const y = Math.max(8, Math.min(92, 50 - score * 4));
    return `${x} ${y}`;
  });
  const current = points[index] ?? points[0] ?? "0 50";
  const [cx, cy] = current.split(" ");
  return (
    <svg viewBox="0 0 1120 100" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="50" x2="1120" y2="50" stroke="rgba(237,235,228,0.16)" strokeDasharray="4 4" />
      <polyline points={points.join(" ")} fill="none" stroke="#C4A574" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="6" fill="#E39A4A" stroke="#101210" strokeWidth="1" />
    </svg>
  );
}
