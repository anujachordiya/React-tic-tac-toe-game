import { useState } from "react";

export default function Player({ name, symbol, isActive,handlePlayerNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName,setPlayerName] = useState(name)
 
  const handleEditButton = () => {
    setIsEditing((prev) => !prev);
    if(isEditing){
      handlePlayerNameChange(symbol,playerName)
    }

  };
 
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? (
          <input type="text" value={playerName}  onChange={(e) => setPlayerName(e.target.value)}/>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
    <button onClick={handleEditButton}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
