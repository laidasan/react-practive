import React from 'react'

export default class TestChildren extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div> TestChildren </div>
    )
  }
}