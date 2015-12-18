import React from 'react'
import letter from './letter'
import marked from 'marked'

const QuizInstruction = () => {
  let html = {__html: marked(letter)}
  return (
    <div dangerouslySetInnerHTML={html}></div>
  )
}

export default QuizInstruction
