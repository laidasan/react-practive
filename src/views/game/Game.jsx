import React from 'react';
import { compose, isNil, complement, isEmpty, not, equals, all, map, times, last, nth } from 'ramda'

import { Mark } from './Mark.js'

import Board, { DefaultBoardSize, DefaultSquareSize } from './components/Board.jsx'
// import Test from './components/Test.jsx'
// import TestChildren from './components/TestChildren.jsx';

const isNotEmpty = complement(isEmpty)

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

    this.state = {
      info: `Next Player: ${this.getMarkString(Mark.O)}`,
      size: DefaultBoardSize,
      squares: times((number) => ({
        id: number,
        mark: -1,
        content: ''
      }) , Math.pow(DefaultBoardSize, 2)),
      squareSize: DefaultSquareSize,
      currentPlayer: Mark.X,
      history: []
    }

    this.onSquareClick = this.onSquareClick.bind(this)
    this.backToLastStep = this.backToLastStep.bind(this)

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

      this.setState({
        info,
        currentPlayer: nextPlayer,
        squares: updatedSquares,
        history: [...this.state.history, this.state],
      })
    }
  }

  backToLastStep() {
    this.setState(last(this.state.history))
  }

  backToStep(step) {
    if(isNotEmpty(this.state.history)) {
      this.setState(nth(step - 1, this.state.history))
    }
  }
  
  render() {
    return (
      <div className="game">
        <div className="game-features">
          <button onClick={this.backToLastStep}>backToLastStep</button>
        </div>
        <Board 
          info={this.state.info} 
          size={this.state.size} 
          squares={this.state.squares}
          squareSize={this.state.squareSize}
          onSquareClick={this.onSquareClick}
        />
        {/* <Test>
          <TestChildren />
        </Test> */}
        {/* <Test>  
          {({ str }) => (
            <TestChildren str={str} />
          )}
        </Test> */}
      </div>
    )
  }
}

export default Game