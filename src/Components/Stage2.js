import React,{ useState, useEffect } from 'react'
import parse from 'html-react-parser'

export default function Stage2({setStage,questions,setPoints,points}) {
  const [currQuestion,setCurrQuestion] = useState(0)
  const [selectedAnswer,setSelectedAnswer] = useState([])
  const [hasFinish,setHasFinish] = useState(false)

  useEffect(()=>{
    setPoints(0)
    
    const array = [];
    for(let i=0;i<questions.length;i++)array.push(-1)
    setSelectedAnswer(array)
  }, [])

  useEffect(()=>{
    if(selectedAnswer.length!=0){
      let isAllDifferent = true
      for(let i=0;i<selectedAnswer.length;i++){
        if(selectedAnswer[i]==-1)isAllDifferent=false
      }
      if(isAllDifferent)setHasFinish(true)
    }
  }, [selectedAnswer])

  const handleSelection = (event,elem) => {
    if(selectedAnswer[currQuestion]==-1){
      if(elem==3)setPoints(prevState=>prevState+1)
      let array = [...selectedAnswer]
      array[currQuestion] = elem
      setSelectedAnswer(array)
    }
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
    <>
      <div className="card-text"><b>{currQuestion+1}º Question:</b> {parse(questions[currQuestion].question)}</div>
      <ul className="list-group m-2">
        {
          questions[currQuestion].awnsersOrder.map(elem=>(
            <li key={elem.id} onClick={(event)=>handleSelection(event,elem.id)} className={
              "list-group-item "+(
                selectedAnswer[currQuestion]!=-1?
                  (elem.id==3)?
                    'bg-success'
                    :
                    (selectedAnswer[currQuestion]==elem.id&&elem.id!=3)?
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
              selectedAnswer[elem.id]!=-1?
                selectedAnswer[elem.id]==3?
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

      {
        hasFinish&&<button className='btn btn-dark my-3 mt-4 px-5' onClick={()=>setStage(3)}>Finish?</button>
      }           
    </>
  )
}