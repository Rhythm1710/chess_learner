export function ScreenHeader({
  kicker,
  title,
  example,
  sub,
  aside,
}: {
  kicker: string;
  title: string;
  example?: boolean;
  sub?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="m-head">
      <div className="m-head-row">
        <div>
          <div className="kicker">{kicker}</div>
          <h1>
            {title}
            {example ? <span className="ex"> (example)</span> : null}
          </h1>
          {sub ? <p className="sub">{sub}</p> : null}
        </div>
        {aside ? <div className="head-aside">{aside}</div> : null}
      </div>
    </header>
  );
}

export function ExampleBadge() {
  return <span className="badge example">Example data</span>;
}
