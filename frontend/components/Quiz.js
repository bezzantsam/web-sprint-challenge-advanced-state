import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuiz, postAnswer, selectAnswer, setMessage } from '../state/action-creators'

export default function Quiz() {
  const state = useSelector((appState) => appState.quiz)
  const selectedAnswer = useSelector((appState) => appState.selectedAnswer)
  const dispatcher = useDispatch()

  const canSubmitAnswer = () => {
    return selectedAnswer == null
  }
  
  useEffect( ()=> {
    dispatcher(fetchQuiz())
  }, [])
  
  const handleAnswerSelection = (event, answerId) => {
        event.preventDefault()
        dispatcher(selectAnswer(answerId))
        dispatcher(setMessage())
  }
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        state ? (
          <>
            <h2>{state.question}</h2>

            <div id="quizAnswers">
              { state.answers.map( (answer) => {
                const isSelectedAnswer = selectedAnswer == answer.answer_id
                return(
                <div className={`answer ${isSelectedAnswer?'selected':''}`} id={answer.answer_id} key={answer.answer_id}>
                  {answer.text}
                  <button onClick={(e) => {handleAnswerSelection(e, answer.answer_id)}}>{isSelectedAnswer ? 'SELECTED':'Select'}</button>
                </div>)
              })}
            </div>

            <button 
                id="submitAnswerBtn"
                disabled={canSubmitAnswer()}
                onClick={(e) => 
                    {
                      e.preventDefault()
                      const answerData = {quiz_id:state.quiz_id, answer_id:selectedAnswer}
                      dispatcher(postAnswer(answerData))}}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
