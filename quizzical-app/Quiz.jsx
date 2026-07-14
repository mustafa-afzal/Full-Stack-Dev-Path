import React from 'react'
import { clsx } from 'clsx'
import { decode } from 'html-entities'


export default function Quiz(props) {

    const [isChecked, setIsChecked] = React.useState(false)

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => props.setQuestions(data.results.map((item, index) => ({
                id: index,
                text: decode(item.question),
                answers: [...item.incorrect_answers.map(decode), decode(item.correct_answer)].sort(() => Math.random() - 0.5),
                correctAnswer: decode(item.correct_answer),
                userAnswer: null
            }))))
    }, [])

    function handleAnswerClick(questionId, answer) {
        props.setQuestions(prev => prev.map(question => 
            question.id === questionId 
                ? {...question, userAnswer: answer}
                : question
        ))
    }

    const score = props.questions.filter(q => q.userAnswer === q.correctAnswer).length

    const questionElmnts = props.questions.map((question) => {
        return (
            <div className='quiz-question' key={question.id}>
                <h4 className='quiz-question-text'>{question.text}</h4>
                <div className='quiz-answer-choices'>
                    {question.answers.map(answer => (
                        <button className={clsx(
                            'quiz-answer-btn',
                            answer === question.userAnswer && !isChecked && 'selected',
                            isChecked && answer === question.correctAnswer && 'correct',
                            isChecked && answer === question.userAnswer && answer !== question.correctAnswer && 'wrong'
                                          )}
                                key={answer} 
                                onClick={() => handleAnswerClick(question.id, answer)}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            </div>
        )
    })

    return (
        <main className='quiz'>
            <div className='home-blob-top-right'></div>
            {questionElmnts}
            {!isChecked && <button className='quiz-check-btn' onClick={() => setIsChecked(true)}> Check Answers </button>}
            <div className='conclude'>
                {isChecked && <h3> You scored {score}/5 correct answers</h3>}
                {isChecked && <button className='quiz-check-btn play' onClick={() => props.setPages(0)}> Play again </button>}
            </div>
            <div className='home-blob-bottom-left'></div>
        </main>
    )

}