import React, { Component } from 'react'
import styled from 'styled-components'

class App extends Component {

  static displayName = "MyApp"

  static defaultProps = {
    owner: "Carl"
  }

  state = {
    favoriteColor: "green"
  }

  constructor(props){
    super(props)
    this.state = {
      favoriteColor: "blue",
      owner: props.owner
    }

    // DON'T DO
    //this.setState({thisIs:"wrong"})

  }

  render() {
    console.log(this.props)
    console.log(this.state)
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
