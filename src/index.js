import React from 'react'
import pow from './pow'

export default class Component extends React.Component {
  render() {
    const powResult = pow(2, 3)
    return <div>{powResult}</div>
  }
}
