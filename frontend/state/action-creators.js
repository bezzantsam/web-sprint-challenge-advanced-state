// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'
import { response } from 'msw'
import * as actions from './action-types'
export function moveClockwise() { 
  return {type:actions.MOVE_CLOCKWISE}
}

export function moveCounterClockwise() { 
  return {type:actions.MOVE_COUNTERCLOCKWISE}
}

export function selectAnswer(answerId=null) {
  return {type: actions.SET_SELECTED_ANSWER, payload:answerId}
 }

export function setMessage(message='') { 
  return {type: actions.SET_INFO_MESSAGE, payload:message}
}

export function setQuiz(payload=null) { 
  return {type: actions.SET_QUIZ_INTO_STATE, payload}
}

export function inputChange(questionData) { 
  return {type: actions.RESET_FORM}
}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz())
    axios.get('http://localhost:9000/api/quiz/next').then( (response) => {
      //console.log('First question',response.data)
      dispatch(setQuiz(response.data))
    })
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(data) {
  return function (dispatch) {
    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/answer', data).then( (response) => {
      if(response.status == 200){
        console.log(response.status, response.data)
        dispatch(selectAnswer())
        dispatch(setMessage(response.data.message))
        dispatch(setQuiz())
        dispatch(fetchQuiz())
      }
      
    })
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quizData) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', quizData).then( (response) => {
      if(response.status == 200){
        console.log(response.status, response.data)
        dispatch(setMessage(response.data.message))
        dispatch(resetForm())
      }

    })

    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
