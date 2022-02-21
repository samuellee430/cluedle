import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'

type Props = {
  answer: string
  isGameWon: boolean
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
}

const ShowCurrent = () => {
  const element = document.getElementById("current");
  element?.scrollIntoView()
}

export const Grid = ({
  answer,
  isGameWon,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <div className="h-90 overflow-y-auto">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          answer={answer}
          guess={guess}
          isRevealing={isRevealing}
          isGameWon={isGameWon}
          guessIndex={i+1}
        />
      ))}
      {!isGameWon && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} guessIndex={guesses.length + 1}/>
      )}
    </div>
  )
}
