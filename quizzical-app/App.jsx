import Home from './Home.jsx'
import Quiz from './Quiz.jsx'
import React from 'react'

export default function App() {

    const [pages, setPages] = React.useState(0)
    const [questions, setQuestions] = React.useState([])

    return (
        <div className='app'>
            {pages === 0 && <Home setPages={setPages}/>}
            {pages === 1 && <Quiz questions={questions} setQuestions={setQuestions} setPages={setPages}/>}
        </div>
    )
}