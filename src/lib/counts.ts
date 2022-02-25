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
      splitGuess[i] = ''
    }
  })

  // handle all cases where letter is present but in incorrect location
  splitGuess.forEach((letter, i) => {
      if (letter !== '' && splitSolution.indexOf(letter) > -1) {
        count += 1
        splitSolution[splitSolution.indexOf(letter)] = ''
        splitGuess[splitGuess.indexOf(letter)] = ''
      }
  })

  return count
}
