import React from 'react';
import { compose, isNil, not, equals, all, map, times, none, propEq } from 'ramda'

import { Mark } from './Mark.js'

import Board, { DefaultBoardSize, DefaultSquareSize } from './components/Board.jsx'

import { Stack } from '../../lib/Stack.js'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(
      all(compose(not, equals(-1)))([squares[a].mark, squares[b].mark, squares[c].mark]) &&
      squares[a].mark === squares[b].mark && 
      squares[a].mark === squares[c].mark
      ) {
        return squares[a].mark
      }
  }
  return null;
}


class Game extends React.Component {
  constructor(props) {
    super(props)

    this.history = new Stack()
    this.oldHistory = new Stack()
    

    this.state = this.createInitialState()



    this.onSquareClick = this.onSquareClick.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.restart = this.restart.bind(this)
  }

  createInitialState() {
    return {
      isGameOver: false,
      info: `Next Player: ${this.getMarkString(Mark.O)}`,
      size: DefaultBoardSize,
      squares: times((number) => ({
        id: number,
        mark: -1,
        content: ''
      }) , Math.pow(DefaultBoardSize, 2)),
      squareSize: DefaultSquareSize,
      currentPlayer: Mark.X,
    }
  }

  setBoardSize(size) {
    this.setState({
      size,
      squares: times((number) => ({
        id: number,
        content: ''
      }) , Math.pow(size, 2))
    })
  }

  getNextPlayer() {
    return this.state.currentPlayer ? Mark.X : Mark.O
  }

  switchToNextPlayer() {
    this.setState({
      currentPlayer: this.getNextPlayer()
    })
  }

  getMarkString(mark) {
    let str = ''

    // eslint-disable-next-line default-case
    switch(mark) {
      case Mark.X:
        str = 'X'
        break;
      case Mark.O:
        str = 'O'
        break;
    }

    return str
  }

  onSquareClick(event, clickedSquare) {
    if(clickedSquare.content === '') {
      const updatedSquares = map(square => square.id === clickedSquare.id
        ? {
          ...square,
          mark: this.state.currentPlayer,
          content: this.getMarkString(this.state.currentPlayer)
        }
        : square
      )(this.state.squares)
      const nextPlayer = this.getNextPlayer()
      const winner = calculateWinner(updatedSquares)
      const info = isNil(winner)
        ? `Next Player: ${this.getMarkString(this.state.currentPlayer)}`
        : `Winner is ${this.getMarkString(winner)}`
      const isGameOver = !isNil(winner) || none(propEq('mark')(-1))(updatedSquares)

      this.history.push(this.state)
      this.oldHistory.clear()
      this.setState({
        ...this.state,
        isGameOver,
        info,
        currentPlayer: nextPlayer,
        squares: updatedSquares
      })
    }
  }

  restart() {
    this.history.clear()
    this.oldHistory.clear()
    this.setState(this.createInitialState())
  }

  prev() {
    if (!(this.state.isGameOver || this.history.isEmpty())) {
      const lastStepState = this.history.pop()

      this.oldHistory.push(this.state)
      this.setState(lastStepState)
    }
  }

  next() {
    if (!(this.state.isGameOver || this.oldHistory.isEmpty())) {
      const stepState = this.oldHistory.pop()

      this.history.push(this.state)
      this.setState(stepState)
    }
  }


  get nextButton() {
    return {
      style: {
        display: this.oldHistory.isEmpty() ? 'none' : 'block'
      }
    }
  }
  
  render() {
    return (
      <div className="game">
        <div className="game-features">
          <div className="game-features__button game-features__button--restart">
            <button onClick={this.restart}>重新開始</button>
          </div>
          <div className="game-features__button">
            <button onClick={this.prev}>上一步</button>
          </div>
          <div className="game-features__button game-features__button--next" style={this.nextButton.style}>
            <button onClick={this.next}>下一步</button>
          </div>
        </div>

        <Board 
          info={this.state.info} 
          size={this.state.size} 
          squares={this.state.squares}
          squareSize={this.state.squareSize}
          onSquareClick={this.onSquareClick}
        />
      </div>
    )
  }
}

export default Game