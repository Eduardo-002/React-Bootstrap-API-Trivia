import React from 'react'

export default function Stage1({setStage,points}) {
  return (
    <>
      <p className="card-text my-3">You've scored {points} Points!</p>
      <button className="btn btn-dark mx-2" onClick={()=>setStage(0)}>Back to Start</button>
      <button className="btn btn-dark mx-2" onClick={()=>setStage(1)}>Play Again!</button>
    </>
  )
}