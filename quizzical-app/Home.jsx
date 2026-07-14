import React from 'react'

export default function Home(props) {
    return (
        <main className='home'>
            <div className='home-blob-top-right'></div>
            <h1 className='home-title'> Quizzical </h1>
            <h3 className='home-subtitle'> Some description if needed </h3>
            <button className='home-btn' onClick={() => props.setPages(1)}> Start Quiz </button>
            <div className='home-blob-bottom-left'></div>
        </main>
    )
}