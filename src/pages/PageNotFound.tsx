import { useState } from 'react'
import '../App.css'
import { Grid } from '../components/grid/Grid'
import { GAME_TITLE } from '../constants/strings'
import { getStoredIsHighContrastMode } from '../lib/localStorage'

function PageNotFound() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
        ? true
        : false
  )
  const guesses = ['404  ', '     ', 'OOPS!', 'PAGE ', 'NOT  ', 'FOUND']

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 mt-20">
        <h1 className="text-xl ml-2.5 grow font-bold dark:text-white">
          {GAME_TITLE}
        </h1>
      </div>
      <Grid
        answer="FOUND"
        isGameWon={true}
        guesses={guesses}
        currentGuess=""
        isRevealing={false}
        currentRowClassName=""
      />
      <div className="flex justify-center mb-1">
        <p>
          It looks like you're lost!
          <br />
          <a className="text-blue-500" href="/">Click here to head back to cluedle home</a>
        </p>
      </div>
    </div>
  )
}

export default PageNotFound
