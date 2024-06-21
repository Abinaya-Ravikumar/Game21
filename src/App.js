import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="container">
      <h1>Welcome to the 21 Game!</h1>
      <p>
        The game is simple. Computer and you will take turns saying one, two,
        or three consecutive numbers. The player who says "21" loses.
      </p>
      <p>Instructions:</p>
      <ol>
        <li>The computer always makes the first move for fair play.</li><br></br>
        <li>On your turn, enter one, two, or three consecutive numbers starting from the current number and seprated by commas
          <br></br>EX:When currentNumber is 3 player can enter 4 or 4,5 or 4,5,6</li><br></br>
        <li>The game continues until someone says "21".</li>
      </ol>
      <button className="submit" onClick={startGame}>Start Game</button>
    </div>
  );
};

export default App;
