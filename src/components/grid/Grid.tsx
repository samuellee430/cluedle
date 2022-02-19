import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'

type Props = {
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
          guess={guess}
          isRevealing={isRevealing}
          isGameWon={isGameWon}
        />
      ))}
      {!isGameWon && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}
    </div>
  )
}
