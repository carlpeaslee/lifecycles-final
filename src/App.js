import React, { Component } from 'react'
import {LoggerExample} from './loggerExample'

class App extends Component {
  render() {
    return (
      <div>
        <LoggerExample/>
      </div>
    )
  }
}


// function myTestWrapper(WrappedComponent){
//   return class extends Component {
//     render() {
//       return (
//         <div
//           style={{
//             backgroundColor: "blue"
//           }}
//         >
//           <WrappedComponent/>
//         </div>
//       )
//     }
//   }
// }
//
// App = myTestWrapper(App)

export default App
