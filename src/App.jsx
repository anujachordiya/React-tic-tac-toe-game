import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/player";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx"
import { WINNING_COMBINATIONS } from "./winning-combination.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayers(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players,setPlayers] = useState({
    'X' : 'player1', 'O' : 'player2'
  })
  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = getActivePlayers(gameTurn);
  let gameBoard = [...initialGameBoard.map((val)=> [...val])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurn.length == 9 && !winner;
  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const currentPlayer = getActivePlayers(prevTurn);
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurn([]);
  }
  function handlePlayerNameChange(symbol,name){
    setPlayers(prev => {
      return{
        ...prev,[symbol]:name
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer == "X"} handlePlayerNameChange={handlePlayerNameChange} />
          <Player name="Player 2" symbol="O" isActive={activePlayer == "O"} handlePlayerNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRematch={handleRematch}/>}
        <GameBoard onSelectSqaure={handleActivePlayer} board={gameBoard} />
      </div>
      <Log gameTurn={gameTurn} />
    </main>
  );
}

export default App;
