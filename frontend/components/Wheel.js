import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {moveClockwise, moveCounterClockwise} from '../state/action-creators'
export default function Wheel(props) {
  const state = useSelector((appState) => appState.wheel)
  const dispatcher = useDispatch()
  // console.log(state)
  return (
    <div id="wrapper">
      <div id="wheel">
      <div className={`cog ${state == 0 ? 'active': ''}`} style={{ "--i": 0 }}>{state == 0 ? 'B': ''}</div>
        <div className={`cog ${state == 1 ? 'active': ''}`} style={{ "--i": 1 }}>{state == 1 ? 'B': ''}</div>
        <div className={`cog ${state == 2 ? 'active': ''}`} style={{ "--i": 2 }}>{state == 2 ? 'B': ''}</div>
        <div className={`cog ${state == 3 ? 'active': ''}`} style={{ "--i": 3 }}>{state == 3 ? 'B': ''}</div>
        <div className={`cog ${state == 4 ? 'active': ''}`} style={{ "--i": 4 }}>{state == 4 ? 'B': ''}</div>
        <div className={`cog ${state == 5 ? 'active': ''}`} style={{ "--i": 5 }}>{state == 5 ? 'B': ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => dispatcher(moveCounterClockwise())} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick = {() => dispatcher(moveClockwise())}>Clockwise</button>
      </div>
    </div>
  )
}
