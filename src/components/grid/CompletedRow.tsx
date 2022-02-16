import { getCounts } from '../../lib/counts'
import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { NumberCell } from './NumberCell'

type Props = {
  guess: string
  isRevealing?: boolean
}

export type CharStatus = 'absent' | 'present' | 'correct'

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess)
  const status2: CharStatus[] = Array.from(Array(guess.length))
  guess.split('').map((_, i) => status2[i] = 'absent')
  const counts = getCounts(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={status2[i]}
          position={i}
          isRevealing={true}
          isCompleted
        />
      ))}
      <NumberCell
      value = {counts.toString()}
      />
    </div>
  )
}
