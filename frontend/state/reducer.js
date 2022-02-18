import { combineReducers } from 'redux'
import * as actions from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type){
    case actions.MOVE_CLOCKWISE:
      return  (state + 1) % 6;
    case actions.MOVE_COUNTERCLOCKWISE:
      return (state - 1 + 6) % 6;
    default:
      return state 
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case actions.SET_QUIZ_INTO_STATE:
      if(action.payload){
        return {...action.payload}
      }
      else{
        return initialQuizState
      }
    default:
      return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case actions.SET_SELECTED_ANSWER:
      return action.payload
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case actions.SET_INFO_MESSAGE:
      return action.payload
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case actions.INPUT_CHANGE:
      return {...state, ...action.payload}
    case actions.RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
