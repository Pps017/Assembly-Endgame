import { useState } from 'react'
import { languages } from './assets/languages'
import { clsx } from 'clsx'
import { getFarewellText } from './assets/utility'
import { words } from './assets/words'
import Confetti from "react-confetti"


export default function App(){

  const [currentWord, setCurrentWord] = useState(()=>words[Math.floor(Math.random()*words.length)])

  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessCount = guessedLetters.filter(letter=>!currentWord.includes(letter)).length

  const isGameLost = wrongGuessCount>=languages.length-1

  const isGameWon = [...currentWord].every(letter=>guessedLetters.includes(letter))

  const isGameOver = isGameLost || isGameWon

  let status
  
  if(isGameWon)status=<><h2>You win!</h2><p>Well done! 🎉</p></>
  else if(isGameLost)status=<><h2>Game over!</h2><p>You lose! Better start learning Assembly 😭</p></>
  else status=![...currentWord].includes(guessedLetters.at(-1)) && wrongGuessCount > 0 ? <p>" {getFarewellText(languages[wrongGuessCount - 1].name)} "</p>: null

  let letterEl=(letter)=>{

    if(!isGameLost){
      return <span key={letter} className='letter'>{guessedLetters.includes(letter)? letter.toUpperCase(): ""}</span>
    }else {
      return <span key={letter} className={clsx({letter: true, missingletter:!guessedLetters.includes(letter)})}>{letter.toUpperCase()}</span>
    }

  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const languageElements = languages.map((lang, index)=><span className={clsx({lang:true, lost:(index<wrongGuessCount)})} key={lang.name} style={{color: lang.color, backgroundColor: lang.backgroundColor}} >{lang.name}</span>)

  const letterElements = [...currentWord].map(letter=>letterEl(letter))

  function addGuessedLetters(letter){
    setGuessedLetters(prevGuessedLetters=>{
      return prevGuessedLetters.includes(letter) ? prevGuessedLetters : [...prevGuessedLetters, letter]
    })
  }

  const alphabetElements = [...alphabet].map(letter=>{
    const isGuessed=guessedLetters.includes(letter)
    const isCorrect=isGuessed && [...currentWord].includes(letter)
    const isWrong=isGuessed && ![...currentWord].includes(letter)
    const className=clsx({
      correct: isCorrect,
      wrong: isWrong
    })
    return(<button onClick={()=>addGuessedLetters(letter)} className={className} disabled={isGameOver} key={letter} >{letter.toUpperCase()}</button>)
  })

  function startNewGame(){
    setCurrentWord(words[Math.floor(Math.random()*words.length)])
    setGuessedLetters([])
  }

  return (
    <main>
      {isGameWon&&<Confetti/>}
      <header>
          <h1>Assembly: EndGame</h1>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={clsx({status: true, wrongGuess:!isGameOver&&guessedLetters.at(-1)&&![...currentWord].includes(guessedLetters.at(-1)), gamewon: isGameWon, gamelost: isGameLost})}>
          {status}
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
      {isGameOver && <button onClick={startNewGame} className="new-game">New Game</button>}
    </main>
  )
}