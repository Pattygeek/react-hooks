// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  // 🐨 squares is the state for this component. Add useState for squares
  // const squares = Array(9).fill(null)
  // const getSquares = JSON.parse(localStorage.getItem('squares'))
  // const [squares, setSquares] = React.useState(
  //   () => getSquares || Array(9).fill(null),
  // )
  // const [state, setState] = useLocalStorageState(
  //   'squares',
  //   Array(9).fill(null),
  //   {
  //     serialize: JSON.stringify,
  //     deserialize: JSON.parse,
  //   },
  // )

  // const nextValue = calculateNextValue(squares)
  // const winner = calculateWinner(squares)
  // const status = calculateStatus(winner, squares, nextValue)

  // React.useEffect(() => {
  //   localStorage.setItem('squares', JSON.stringify(squares))
  // }, [squares])

  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  // function selectSquare(square) {
  //   const squaresCopy = [...squares]
  //   squaresCopy[square] = nextValue
  //   setSquares(squaresCopy)
  // }

  // function restart() {
  //   // 🐨 reset the squares
  //   // 💰 `Array(9).fill(null)` will do it!
  //    setSquares(Array(9).fill(null))
  // }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      {/* <div className="status">{status}</div> */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {/* <button className="restart" onClick={restart}>
        restart
      </button> */}
    </div>
  )
}

function Game() {
  const [currentSquares, setCurrentSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
    {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  )

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setCurrentSquares(Array(9).fill(null))
  }

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    setCurrentSquares(squaresCopy)
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        {/* <ol>{moves}</ol> */}
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
