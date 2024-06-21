import React, { useState, useEffect } from 'react';

const GamePage = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(false); // Computer starts by default
  const [playerInput, setPlayerInput] = useState("");
  const [computerMove, setComputerMove] = useState("");
  const [gameResult, setGameResult] = useState("");
  const message="Game Started!";


  const makeComputerMove = (currentNumber) => {
    let nextNumber = currentNumber + 1;
    let move = [];
  
    if (currentNumber === 0) {
      let x = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < x; i++) {
        move.push(nextNumber + i);
      }
    } else {
      let target = currentNumber;
      while ((target + 1) % 4 !== 1 && target < 21) {
        target++;
      }
      let numberOfSteps = target - currentNumber;
      if (numberOfSteps >= 1 && numberOfSteps <= 3) {
        for (let i = 0; i < numberOfSteps; i++) {
          move.push(nextNumber + i);
        }
      } else {
        let x = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < x; i++) {
          move.push(nextNumber + i);
        }
      }
    }
    return move;
  };
  

  const playerMove = () => {
    let numbers = playerInput.split(',').map(Number);

    if (numbers.length < 1 || numbers.length > 3 || !numbers.every((num, index) => num === currentNumber + index + 1)) {
      alert("Invalid input. Please enter one, two, or three consecutive numbers starting from current number.");
      return;
    }

    let newNumber = numbers[numbers.length - 1];
    if (newNumber >= 21) {
      setGameResult("You lose! You said 21.");
      setCurrentNumber(newNumber);
      return;
    }
    setCurrentNumber(newNumber);
    setPlayerTurn(false);
    setPlayerInput(""); 
  };

  const computerTurn = () => {
    let computerChoice = makeComputerMove(currentNumber);
    setComputerMove(computerChoice.join(', ')); 
    let newNumber = computerChoice[computerChoice.length - 1];
    if (newNumber >= 21) {
      setGameResult("Computer loses! Computer said 21.");
    }
    setCurrentNumber(newNumber);
    setPlayerTurn(true);
  };

  useEffect(() => {
    if (!playerTurn && currentNumber < 21 && !gameResult) {
      computerTurn();
    }
  }, [playerTurn, currentNumber, gameResult]);

 let playerInputSection = null;
 if (currentNumber < 21 && !gameResult) {
   playerInputSection = (
     <div>
       <input
         type="text"
         value={playerInput}
         onChange={(e) => setPlayerInput(e.target.value)}
         placeholder="Enter one, two, or three numbers"
       />
       <button className="submit" onClick={playerMove}>Submit</button>
     </div>
   );
 }

 return (
   <div className="container">
     <h1>21 Game</h1>
     <p>{message}</p>
     <p className="current-number">Current Number: {currentNumber}</p>
     <p>Computer's Move: {computerMove}</p>
     {gameResult && <p className="current-number">{gameResult}</p>}
     {playerInputSection}
   </div>
 );
};

export default GamePage;
