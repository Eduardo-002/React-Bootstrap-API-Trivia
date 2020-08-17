import React,{ useEffect,useState } from 'react'
import parse from 'html-react-parser'
import './App.css'

export default function App() {
  const [stage,setStage] = useState(0)
  const [currQuestion,setCurrQuestion] = useState(-1)
  const [questions,setQuestions] = useState([])
  const [points,setPoints] = useState(0)

  const [correct,setCorrect] = useState(false)

  const shuffleArray = (array) => {
    for(let i=array.length-1; i>0 ;i--){
      const j = Math.floor(Math.random() * (i+1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  const handleStart = () => {
    setStage(1)
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then(response=>response.json())
      .then(data=>{
        console.log(data)

        let customData = []

        for(let i=0; i<10 ;i++){
          let awnsersOrder = shuffleArray( [
            {answer:data.results[i].incorrect_answers[0],id:0},
            {answer:data.results[i].incorrect_answers[1],id:1},
            {answer:data.results[i].incorrect_answers[2],id:2},
            {answer:data.results[i].correct_answer,id:3}
          ] )
          //let 
          customData.push({
            id: i,
            awnsersOrder: awnsersOrder,
            question: data.results[i].question,
            blocked: false,
            chosenAnswer: -1
          })
        }

        console.log(customData)
        setQuestions(customData)
        setCurrQuestion(0)
        setStage(2)
      })
  }

  const handleSelection = (event,elem) => {
    if(!questions[currQuestion].blocked){
      if(elem==3)setPoints(prevState=>prevState+1)
      setQuestions(prevState=>{
        prevState[currQuestion].blocked = true
        prevState[currQuestion].chosenAnswer = elem
        return prevState
      })
      setCorrect(prevState=>!prevState)
    }
    console.log(questions)
  }

  const handlePaginationClick = (event,target) => {
    switch(target){
      case 'prev': 
        setCurrQuestion(prevState=>{
          if(prevState!=0){
            return prevState-1
          }else{
            return prevState
          }
        })
        break
      case 'next': 
        setCurrQuestion(prevState=>{
          if(prevState!=9){
            return prevState+1
          }else{
            return prevState
          }
        })
        break
      default: setCurrQuestion(target)
    }
  }

  return (
    <div className="container d-flex justify-content-center text-center h-100">
      <div className="card m-auto" style={{width: "30rem"}}>
        <div className="card-body">
          <h1 className="card-title my-3">Trivia</h1>
          {
            stage==0?
              <>
                <p className="card-text">Trivia is a app made for educational purposes that uses a free and open api with lots of questions and awnsers</p>
                <button className='btn btn-dark' onClick={handleStart}>Start!</button>
              </>
              :
            stage==1?
              <div className="spinner-border my-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              :
            stage==2?
              <>
                <div className="card-text"><b>{currQuestion+1}º Question:</b> {parse(questions[currQuestion].question)}</div>
                <ul className="list-group m-2">
                  {
                    questions[currQuestion].awnsersOrder.map(elem=>(
                      <li key={elem.id} onClick={(event)=>handleSelection(event,elem.id)} className={
                        "list-group-item "+(
                          questions[currQuestion].blocked?
                            (elem.id==3)?
                              'bg-success'
                              :
                              (questions[currQuestion].chosenAnswer==elem.id&&elem.id!=3)?
                                'bg-danger'
                                :
                                'bg-light'
                            :
                            'bg-light'
                        )
                      }>{parse(elem.answer)}</li>
                    ))
                  }
                </ul>
                <p className="my-4"><b>Points: </b>{points}</p>
                
                <div className="btn-group" role="group" aria-label="Basic example" style={{fontSize: '0.8rem'}}>
                  <button onClick={(event)=>handlePaginationClick(event,'prev')} type="button" className="questionsNavigationBtn btn btn-light border disabled">Prev</button>
                  {
                    questions.map(elem=>(
                      <button key={elem.id} onClick={(event)=>handlePaginationClick(event,elem.id)} type="button" className={"questionsNavigationBtn btn border px-1 py-0 " + (
                        questions[elem.id].blocked?
                          questions[elem.id].chosenAnswer==3?
                            'btn-success '
                            :
                            'btn-danger '
                          :
                          'btn-light '
                      )+(elem.id==currQuestion?'':'disabled')}>{elem.id+1}</button>
                    ))
                  }
                  <button onClick={(event)=>handlePaginationClick(event,'next')} type="button" className="questionsNavigationBtn btn btn-light border disabled">Next</button>
                </div>
                                
              </>
              :
              <p>Weird error append, please refresh!</p>
          }
          
        </div>
      </div>
    </div>
  );
}