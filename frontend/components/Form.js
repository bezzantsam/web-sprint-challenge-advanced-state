import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const onChange = evt => {
    console.log('form data', props)
     evt.preventDefault()
     const {id, value} = evt.target
     props.inputChange({[id]: value})
  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.postQuiz(props.form)

  }

  return (
    <form id="form" onSubmit={onSubmit}>
    <h2>Create New Quiz</h2>
    <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
    <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
    <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
    <input maxLength={50} onChange={onChange} id="newQuestion" value={props.form.newQuestion} placeholder="Enter question" />
    <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={props.form.newTrueAnswer} placeholder="Enter true answer" />
    <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={props.form.newFalseAnswer} placeholder="Enter false answer" />
    <button id="submitNewQuizBtn">Submit new quiz</button>
  </form>
)
}

export default connect(st => st, actionCreators)(Form)
