import React, { useEffect } from 'react'

export default function Stage1({setStage,setQuestions}) {
  const shuffleArray = (array) => {
    for(let i=array.length-1; i>0 ;i--){
      const j = Math.floor(Math.random() * (i+1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then(response=>response.json())
      .then(data=>{
        let customData = []

        for(let i=0; i<10 ;i++){
          let awnsersOrder = shuffleArray( [
            {answer:data.results[i].incorrect_answers[0],id:0},
            {answer:data.results[i].incorrect_answers[1],id:1},
            {answer:data.results[i].incorrect_answers[2],id:2},
            {answer:data.results[i].correct_answer,id:3}
          ] )

          customData.push({
            id: i,
            awnsersOrder: awnsersOrder,
            question: data.results[i].question
          })
        }

        setQuestions(customData)
        setStage(2)
      })
  }, [])


  return (
    <div className="spinner-border my-5" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}