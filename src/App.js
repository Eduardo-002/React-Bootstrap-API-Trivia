import React,{ useState } from 'react'
import './App.css'
import Stage0 from './Components/Stage0'
import Stage1 from './Components/Stage1'
import Stage2 from './Components/Stage2'
import Stage3 from './Components/Stage3'

export default function App() {
  const [questions,setQuestions] = useState([{}])
  const [stage,setStage] = useState(0)
  const [points,setPoints] = useState(0)

  return (
    <div className="container d-flex justify-content-center text-center h-100">
      <div className="card m-auto" style={{width: "30rem"}}>
        <div className="card-body">
          <h1 className="card-title my-3">Trivia</h1>
          {
            stage==0?
              <Stage0 
                setStage={setStage}
              />
              :
            stage==1?
              <Stage1 
                setStage={setStage} 
                setQuestions={setQuestions}
              />
              :
            stage==2?
              <Stage2
                setStage={setStage}
                questions={questions}
                setPoints={setPoints}
                points={points}
              />
              :
              <Stage3
                setStage={setStage}
                points={points}
              />
          }
          
        </div>
      </div>
    </div>
  );
}