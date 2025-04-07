export default function Log({ gameTurn }) {
  return (
    <ol id="log">
      {gameTurn.map((playerSelected) => (
        <li>
          {playerSelected.player} selected {playerSelected.square.row},
          {playerSelected.square.col}
        </li>
      ))}
    </ol>
  );
}
