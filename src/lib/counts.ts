export type CharStatus = 'absent' | 'present' | 'correct'

export const getCounts = (answer: string, guess: string): number => {
  const splitSolution = answer.split('')
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
