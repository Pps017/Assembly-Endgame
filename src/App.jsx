import { useState } from 'react'
import { languages } from './assets/languages'

export default function App(){

  const [currentWord, setCurrentWord] = useState("react")

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const languageElements = languages.map(lang=><span className='lang' key={lang.name} style={{color: lang.color, backgroundColor: lang.backgroundColor}} >{lang.name}</span>)

  const letterElements = [...currentWord].map(letter=><span key={letter} className='letter'>{letter.toUpperCase()}</span>)

  const alphabetElements = [...alphabet].map(letter=><button className='keyboard-btn' key={letter} >{letter.toUpperCase()}</button>)

  return (
    <main>
      <header>
          <h1>Assembly: EndGame</h1>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="status">
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
      </section>
      <section className='languages'>
        {languageElements}
      </section>
      <section className='word'>
        {letterElements}
      </section>
      <section className='keyboard'>
        {alphabetElements}
      </section>
      <button className="new-game">New Game</button>
    </main>
  )
}