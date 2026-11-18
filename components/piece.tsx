export function Piece({ id }: { id: string }) {
  return (
    <svg className="piece" viewBox="0 0 45 45" aria-hidden="true">
      <use href={`/pieces.svg#${id}`} />
    </svg>
  );
}
