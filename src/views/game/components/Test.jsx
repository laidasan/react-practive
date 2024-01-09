import React from 'react'

export default class Test extends React.Component {
  render() {
    console.log(this)
    const { children } = this.props
    console.log(this)
    console.log(children)

    return (
      <div className="test">
        {children({ str: 'testString'})}
      </div>
    )
  }
}