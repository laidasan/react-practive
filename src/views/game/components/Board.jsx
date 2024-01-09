import React from 'react'
import { map, times } from 'ramda'
import Square from './Square.jsx'

import { Mark } from '../Mark.js'


export const DefaultBoardSize = 3
export const DefaultSquareSize = 60 

// TODO 用 function component + useState 再寫一次

class Board extends React.Component {
  static defaultProps = {
    info: '',
    size: DefaultBoardSize,
    squareSize: DefaultSquareSize,
    squares: times((number) => ({
      id: number,
      content: ''
    }) , Math.pow(DefaultBoardSize, 2)),
    currentPlayer: Mark.X,
    onSquareClick: () => {}
  }

  get boardStyle() {
  	return {
  		width: `${this.props.squareSize * this.props.size}px`,
  		height: `${this.props.squareSize * this.props.size}px`
  	}
  }  

  get squares() {
  	const squareStyle = {
  	  width: `calc(100% / ${this.props.size})`,
  	  height: `calc(100% / ${this.props.size})`
  	}  

  	return map((square) => (
  	  <Square key={square.id} square={square} style={squareStyle} onClick={this.props.onSquareClick}/>
  	))(this.props.squares)
  }  

  render() {
    return (
      <div>
        <div className="game__info">{this.props.info}</div>
  		  <div className="game__board" style={this.boardStyle}>
  			<div className="game__board__container">
  			  {this.squares}
  			</div>
  		  </div>
	    </div>
  	)
  }

}

export default Board