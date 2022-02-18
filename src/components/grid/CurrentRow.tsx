import React, { useRef } from 'react'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'
import { NumberCell } from './NumberCell'

type Props = {
  guess: string
  className: string
}

export const CurrentRow = ({ guess, className }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div id="current" className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
      <NumberCell value={"0"} />
    </div>
  )
}
