import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getCounts = (guess: string): number => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  let count: number = 0

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      count += 2
      splitSolution[i] = ''
      return
    } else if (splitSolution.indexOf(letter) > -1) {
      count += 1
      splitSolution[splitSolution.indexOf(letter)] = ''
    }
  })

  return count
}
