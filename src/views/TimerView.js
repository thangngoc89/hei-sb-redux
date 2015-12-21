import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as timerActions } from '../redux/modules/timer'
import Timer from 'components/Timer'

const mapStateToProps = (state) => ({
  ...state.timer
})

class TimerView extends Component {
  constructor () {
    super()

    this.state = {
      remain: 10
    }
  }

  plus () {
    console.log('increment')
    this.setState({
      remain: this.state.remain + 1
    })
  }

  sub () {
    console.log('decrement')
    this.setState({
      remain: this.state.remain - 1
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <button onClick={this.plus.bind(this)}>Increment</button>
            <button onClick={this.sub.bind(this)}>Decrement</button>
            <hr />
            <Timer seconds={10} remain={this.state.remain} tick={this.sub.bind(this)} startTick size={100}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, timerActions)(TimerView)
