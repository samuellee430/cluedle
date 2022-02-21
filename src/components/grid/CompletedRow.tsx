import { getCounts } from '../../lib/counts'
import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { IndexCell } from './IndexCell'
import { NumberCell } from './NumberCell'

type Props = {
  answer: string
  guess: string
  isRevealing?: boolean
  isGameWon?: boolean
  guessIndex: number
}

export type CharStatus = 'absent' | 'present' | 'correct'

export const CompletedRow = ({ answer, guess, isRevealing, isGameWon, guessIndex }: Props) => {
  const statuses = getGuessStatuses(guess)
  const status2: CharStatus[] = Array.from(Array(guess.length))
  guess.split('').map((_, i) => status2[i] = 'absent')
  const counts = getCounts(answer, guess)

  return (
    <div className="flex justify-center mb-1">
      <IndexCell value={guessIndex + '.'}/>
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
          isGameWon={isGameWon}
        />
      ))}
      <NumberCell
      value = {counts.toString()}
      />
    </div>
  )
}
