import React, {Component} from 'react'
import styled from 'styled-components'

function loggify(Wrapped){

  const methodsToLog = [
    "componentWillMount",
    "componentDidMount",
    "componentWillUnmount",
    "componentWillReceiveProps"
  ]

  let originals = {}

  methodsToLog.forEach( (method) => {

    if (Wrapped.prototype[method]) {

      originals[method] = Wrapped.prototype[method]

    }

    Wrapped.prototype[method] = function (...args) {
      let original = originals[method]

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`)

        if (method === 'componentWillReceiveProps') {
          console.log("nextProps", args[0])
        }

      console.groupEnd()

      if (original) {
        original = original.bind(this)
        original(...args)
      }

    }

    Wrapped.prototype.setState = function (partialState, callback) {
      console.groupCollapsed(`${Wrapped.displayName} setState`)
      console.log("partialState", partialState)
      console.log("callback" , callback)
      console.groupEnd()
      this.updater.enqueueSetState(this, partialState, callback, 'setState')
    }

  })

  return class extends Component {
    static displayName = `Loggified${Wrapped.displayName}`

    constructor(props){
      super(props)
      console.groupCollapsed(`${Wrapped.displayName} Constructor`)
      console.log("props", props)
      console.groupEnd()
    }

    render() {
      return (
        <LoggerContainer>
          <H2>
            {Wrapped.displayName} is now loggified:
          </H2>
          <Wrapped
            {...this.props}
          />
        </LoggerContainer>

      )
    }
  }
}

const LoggerContainer = styled.div`
  background-color: aliceblue;
  border: 2px grooved aquamarine;
  border-radius: 5px;
`

LoggerContainer.displayName = "LoggerContainer"

const H2 = styled.h2`
  color: blueviolet
`

H2.displayName = "H2"

export default loggify
