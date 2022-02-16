import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getCounts = (guess: string): number => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  // const statuses: CharStatus[] = Array.from(Array(guess.length))
  let count: number = 0

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      // statuses[i] = 'correct'
      count += 2
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    // if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      // statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      // statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      count += 1
      return
    } else {
      // statuses[i] = 'absent'
      return
    }
  })

  return count
}
