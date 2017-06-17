import React, { Component } from 'react'
// import styled from 'styled-components'
import loggify from './loggify'

class App extends Component {

  static displayName = "App"


  render() {
    return (
      <div>
        <h2>hello</h2>
      </div>
    )
  }
}


App = loggify(App)

export default App
