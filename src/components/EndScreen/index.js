import React from 'react'
import { Link } from 'react-router'

const EndScreen = () => {
  return (
    <div>
      <em>Completed</em>
      <br />
      <Link to='/'>return home</Link>
    </div>
  )
}

export default EndScreen
