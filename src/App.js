
import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

  
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const App = () => {
  const [turn, setTurn] = useState('X'); //Empezaran siempre las X
  const [squares, setSquares] = useState(Array(9).fill(null)); //Para saber si hay X u O con el arreglo de los cuadrados que son  9
  const [winningSquares, setWinningSquares] = useState([]); //crear un nuevo estado para la posicion ganadora
  const [score, setScore] = useState({ //Guardar los resultados
      X: 0,
      O: 0,
  });

  const reset = () => { //Para resetear la app
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }

  const checkForWinner = newSquares => {
    for(let i = 0; i < winningPositions.length; i++){
      const [a, b, c] = winningPositions[i];
        if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]){ 
          //con esta validacion if vamos haciendo la posicion de las figuras para ver quien gana y quien no
          endGame(newSquares[a], winningPositions[i]); //pasamos el valor ganador, y cual fue la posicion ganadora
          return ;
        }
      }

      if(!newSquares.includes(null)) { //Si todos los cuadrados ya tiene un valor, esta validacion e sla del empate
        endGame(null, Array.from(Array(10).keys())) 
        return;
      }
      setTurn(turn === 'X' ? 'O' : 'X');
  }

  const handleClick = square => {
    let newSquare = [...squares]; //Para poder asignar el estado con una nueva variable
    newSquare.splice(square, 1, turn); //recibe un numero (1-8)
    setSquares(newSquare);
    checkForWinner(newSquare);

  }

  const endGame = (result, winningPositions) => {
    setTurn(null); //Bloqueamos a que el usuario pueda seguir clickeando
    if (result !== null) {
      setScore({
        ...score, //Desectructuramos el score
        [result]: score[result] + 1,
      })
    }
    setWinningSquares(winningPositions);
    setTimeout(reset, 2000);
    
  }
    

  return(
      <div className="container">


          <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
          <ScoreBoard scoreO={score.O} scoreX={score.X} />
      </div>
  );
}

export default App;

