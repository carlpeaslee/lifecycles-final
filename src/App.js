import React, { Component } from 'react'
// import styled from 'styled-components'
import loggify from './loggify'

class App extends Component {

  static displayName = "App"

  state = {
    data: "none yet"
  }

  fetchData = () => {
    console.log("Going to fetch data!")
    setTimeout(
      ()=> {
        console.log("Data retrieved")
        this.setState({
          data: Math.random()
        })
      },
      1500
    )
  }


  componentDidMount(){
    this.fetchData()
  }

  render() {
    return (
      <div>
        <h2>hello</h2>
        <h4>data: {this.state.data}</h4>
      </div>
    )
  }
}


App = loggify(App)

export default App
