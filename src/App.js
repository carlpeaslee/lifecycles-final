import React, { Component } from 'react'
import styled from 'styled-components'

class App extends Component {

  static displayName = "MyApp"

  static defaultProps = {
    owner: "Carl"
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <FancyH2>Hello</FancyH2>
      </div>
    )
  }
}

const FancyH2 = styled.h2`
  color: green;
`

FancyH2.displayName = "FancyH2"

export default App
