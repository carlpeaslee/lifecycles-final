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
          data: getRandomInt(1,10)
        })
      },
      1500
    )
  }

  parentPoll = () => {
    this.pollInterval = setInterval(
      ()=>{
        this.setState({
          parentPoll: getRandomInt(1,2)
        })
      },
      1000
    )
  }


  componentDidMount(){
    this.fetchData()
    this.parentPoll()
    const canvasCtx = this.refs.appCanvas.getContext('2d')
    canvasCtx.fillStyle = "blue"
    canvasCtx.arc(75, 75, 50, 0, 2 * Math.PI)
    canvasCtx.fill()
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval)
  }

  render() {
    let {data, showPollChild, parentPoll} = this.state
    return (
      <div>
        <h2>hello</h2>
        <h4>data: {data}</h4>
        <h4>parentPoll: {parentPoll}</h4>
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
            parentPoll={parentPoll}
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
        this.setState({
          poll: getRandomInt(1,5)
        })
      },
      1000
    )
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.parentPoll !== this.props.parentPoll) {
      return true
    }
    if (nextState.poll !== this.state.poll) {
      return true
    }

    return false
  }

  render() {
    let {data, parentPoll} = this.props
    let {poll} = this.state
    console.log("PollChild rendered!")
    return (
      <div>
        <h4>poll: {poll}</h4>
        <h4>data: {data}</h4>
        <h4>parentPoll: {parentPoll}</h4>
      </div>
    )
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}


App = loggify(App)

PollChild = loggify(PollChild)

export default App
