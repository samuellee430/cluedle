import {
  ChartBarIcon,
  CogIcon, InformationCircleIcon
} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { Alert } from '../components/alerts/Alert'
import { Grid } from '../components/grid/Grid'
import { Keyboard } from '../components/keyboard/Keyboard'
import { InfoModal } from '../components/modals/InfoModal'
import { PracticeStatsModal } from '../components/modals/PracticeStatsModal'
import { SettingsModal } from '../components/modals/SettingsModal'
import {
  ALERT_TIME_MS, MAX_CHALLENGES, MAX_WORD_LENGTH, REVEAL_TIME_MS
} from '../constants/settings'
import {
  GAME_TITLE, NOT_ENOUGH_LETTERS_MESSAGE, WIN_MESSAGES, WORD_NOT_FOUND_MESSAGE
} from '../constants/strings'
import {
  getStoredIsHighContrastMode, loadPracticeGameStateFromLocalStorage,
  savePracticeGameStateToLocalStorage,
  setStoredIsHighContrastMode
} from '../lib/localStorage'
import {
  getRandomWord,
  isWinningPracticeWord, isWordInWordList, solution
} from '../lib/words'


function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isHardModeAlertOpen, setIsHardModeAlertOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
        ? true
        : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    var loaded = loadPracticeGameStateFromLocalStorage()
    if (loaded === null) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(loaded.solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    return loaded.guesses
  })

  const [answer, setAnswer] = useState<string>(() => {
    var loaded = loadPracticeGameStateFromLocalStorage()
    if (loaded === null) {
      const word = getRandomWord()
      savePracticeGameStateToLocalStorage({ guesses: [], solution: word })
      return word
    }
    return loaded.solution
  })


  const [isMissingPreviousLetters, setIsMissingPreviousLetters] =
    useState(false)
  const [missingLetterMessage, setIsMissingLetterMessage] = useState('')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  useEffect(() => {
    savePracticeGameStateToLocalStorage({ guesses, solution: answer })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setTimeout(() => {
        setSuccessAlert(
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
        )

        setTimeout(() => {
          setSuccessAlert('')
          setIsStatsModalOpen(true)
        }, ALERT_TIME_MS)
      }, 0 * REVEAL_TIME_MS * MAX_WORD_LENGTH)
    }
  }, [isGameWon])

  const onChar = (value: string) => {
    if (
      currentGuess.length < MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    // if (isGameWon) {
    //   return
    // }
    if (!(currentGuess.length === MAX_WORD_LENGTH)) {
      setIsNotEnoughLetters(true)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, 10 * REVEAL_TIME_MS * MAX_WORD_LENGTH)

    const winningWord = isWinningPracticeWord(answer, currentGuess)

    if (
      currentGuess.length === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
    }

    if (winningWord) {
      return setIsGameWon(true)
    }
  }

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  }

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-96 mx-auto items-center mb-8 mt-20">
        <h1 className="text-xl ml grow font-bold dark:text-white">
          {GAME_TITLE}
        </h1>
        <button className="mt-2 rounded-l-md border-y-2 border-l-2 border-indigo-600 hover:border-indigo-400 shadow-sm px-2 py-2 bg-white dark:bg-slate-900 dark:text-white font-medium text-slate hover:text-white hover:bg-indigo-400 dark:hover:bg-indigo-400 focus:outline-none sm:text-sm"
          onClick={() => { navigate('/') }}
        >
          daily
        </button>
        <button
          className="mt-2 rounded-r-md border-y-2 border-r-2 border-indigo-600 hover:border-indigo-400 shadow-sm px-2 py-2 mr-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none sm:text-sm"
        >
          practice
        </button>
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <CogIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsSettingsModalOpen(true)}
        />
      </div>
      <Grid
        answer={answer}
        isGameWon={isGameWon}
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
        currentRowClassName={currentRowClass}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        isRevealing={isRevealing}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <PracticeStatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        isGameWon={isGameWon}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        isHardMode={false}
        handleHardMode={(() => { })}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isHardModeErrorModalOpen={isHardModeAlertOpen}
        isHighContrastMode={isHighContrastMode}
        handleHighContrastMode={handleHighContrastMode}
      />

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={missingLetterMessage} isOpen={isMissingPreviousLetters} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
        topMost={true}
      />
    </div>
  )
}

export default App
