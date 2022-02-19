import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  isGameWon?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  isGameWon,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isGameWon && isRevealing
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  console.log("game won" + isGameWon)

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        (!isGameWon && status) || (status === 'absent' && isGameWon),
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast && isGameWon,
      'present shadowed bg-yellow-400 text-white border-yellow-400':
        status === 'present' && !isHighContrast && isGameWon,
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
