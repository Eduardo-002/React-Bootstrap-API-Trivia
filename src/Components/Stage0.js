import React from 'react'

export default function Stage0({setStage}) {
  return (
    <>
      <p className="card-text">Trivia is a app made for educational purposes that uses a free and open api with lots of questions and awnsers</p>
      <button className='btn btn-dark' onClick={()=>setStage(1)}>Start!</button>
    </>
  )
}