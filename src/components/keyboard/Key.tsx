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
  initialKeyColor?: string
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isRevealing,
  initialKeyColor = 'default'
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH
  const isHighContrast = getStoredIsHighContrastMode()
  const [keyColor, setKeyColor] = useState(initialKeyColor) 

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
      'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 active:bg-slate-400': keyColor === 'default',
      'bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 text-white': keyColor === 'black',
      'bg-blue-500 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-700 text-white': keyColor === 'blue',
      'bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-300 dark:hover:bg-yellow-400 text-white': keyColor === 'yellow',
      'bg-green-500 dark:bg-green-600 hover:bg-green-400 dark:hover:bg-green-500 text-white': keyColor === 'green',
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
    event.currentTarget.blur()
    event.preventDefault();
    switch(keyColor) {
      case 'black' : {
        setKeyColor('blue')
        break
      }
      case 'blue' : {
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
