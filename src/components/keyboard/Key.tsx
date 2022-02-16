import { useState, ReactNode } from 'react'
import classnames from 'classnames'
import { CharStatus } from '../../lib/statuses'
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'


type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isRevealing,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH
  const isHighContrast = getStoredIsHighContrastMode()
  const [keyColor, setKeyColor] = useState('default') 

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
      'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400': keyColor === 'default',
      'bg-slate-400 dark:bg-slate-800 text-white': keyColor === 'black',
      'bg-slate-400 dark:bg-yellow-600 text-white': keyColor === 'yellow',
      'bg-slate-400 dark:bg-green-800 text-white': keyColor === 'green',
      // 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white':
      //   status === 'correct' && isHighContrast,
      // 'bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white':
      //   status === 'present' && isHighContrast,
      // 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white': keyColor === 'green',
      // 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
      //   status === 'present' && !isHighContrast,
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: '58px',
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  const handleContextMenu: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // onClick(value)
    event.currentTarget.blur()
    event.preventDefault();
    switch(keyColor) {
      case 'black' : {
        setKeyColor('yellow')
        break
      }
      case 'yellow' : {
        setKeyColor('green')
        break
      } 
      case 'green' : {
        setKeyColor('default')
        break
      } 
      case 'default' : {
        setKeyColor('black')
        break
      }
      default: {
        setKeyColor('default')
      }
    }
  }

  return (
    <button style={styles} className={classes} onClick={handleClick} onContextMenu={handleContextMenu}>
      {children || value}
    </button>
  )
}
