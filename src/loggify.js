import React, {Component} from 'react'
import styled from 'styled-components'

function loggify(Wrapped){

  const methodsToLog = ["componentWillMount"]

  let originals = {}

  methodsToLog.forEach( (method) => {

    if (Wrapped.prototype[method]) {

      originals[method] = Wrapped.prototype[method]

    }

    Wrapped.prototype[method] = function (...args) {
      let original = originals[method]

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`)

      console.groupEnd()

      if (original) {
        original = original.bind(this)
        original(...args)
      }

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
