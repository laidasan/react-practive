function Square (props) {

  return (
      <div className="game__square" style={props.style} onClick={(event) => props.onClick(event, props.square)}>
        <div className="game__square__content">
          {props.square.content}
        </div>
      </div>
  )
}

export default Square