import React from 'react'
import letter from './letter.md'

const QuizInstruction = () => {
  let html = {__html: letter}
  return (
    <div dangerouslySetInnerHTML={html} />
  )
}

export default QuizInstruction
