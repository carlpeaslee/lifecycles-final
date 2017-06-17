import React, { Component } from 'react'
// import styled from 'styled-components'
import loggify from './loggify'

class App extends Component {

  static displayName = "App"

  state = {
    showPollChild: true,
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

    const canvasCtx = this.refs.appCanvas.getContext('2d')
    canvasCtx.fillStyle = "blue"
    canvasCtx.arc(75, 75, 50, 0, 2 * Math.PI)
    canvasCtx.fill()
  }



  render() {
    let {data, showPollChild} = this.state
    return (
      <div>
        <h2>hello</h2>
        <h4>data: {data}</h4>
        <canvas
          ref="appCanvas"
          height={200}
          width={200}
        />
        <button
          onClick={()=>{
            this.setState((prevState) => {
              return {
                showPollChild: !prevState.showPollChild
              }
            })
          }}
        >
          {(showPollChild) ? "Hide" : "Show"} PollChild
        </button>
        {(showPollChild) ? (
          <PollChild
            data={data}
          />
        ) : null}
      </div>
    )
  }
}


class PollChild extends Component {

  static displayName = "PollChild"

  state = {}

  componentDidMount(){
    this.pollData()
  }

  componentWillUnmount(){
    clearInterval(this.pollInterval)
  }

  pollData = () => {
    this.pollInterval = setInterval(
      ()=>{
        console.log("Poll!")
        this.setState({
          poll: this.getRandomInt(1,5)
        })
      },
      1000
    )
  }


  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  render() {
    return (
      <div>
        <h4>poll: {this.state.poll}</h4>
        <h4>data: {this.props.data}</h4>
      </div>
    )
  }
}

App = loggify(App)

PollChild = loggify(PollChild)

export default App
