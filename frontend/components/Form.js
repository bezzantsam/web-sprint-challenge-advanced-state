import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  //console.log('form data', props)

  const onChange = evt => {
    evt.preventDefault()
    const {id, value} = evt.target
    props.inputChange({[id]:value})
  }

  const isContentValid = () => {
    //console.log(props.form.newQuestion.trim().length, props.form.newTrueAnswer.trim().length, props.form.newFalseAnswer.trim().length)
    return (props.form.newQuestion.trim().length < 1 || props.form.newTrueAnswer.trim().length < 1 || props.form.newFalseAnswer.trim().length < 1)
  }
  const onSubmit = evt => {
    evt.preventDefault()
    const newQuestion = {
      "question_text": props.form.newQuestion,
      "true_answer_text": props.form.newTrueAnswer,
      "false_answer_text": props.form.newFalseAnswer
    }
    props.postQuiz(newQuestion)
  }


  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value={props.form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={props.form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={props.form.newFalseAnswer} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={isContentValid()}>Submit new quiz {isContentValid()}</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
