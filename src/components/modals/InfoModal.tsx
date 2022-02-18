import { Cell } from '../grid/Cell'
import { NumberCell } from '../grid/NumberCell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-left text-gray-500 dark:text-gray-300">
        You have unlimited tries guess the word. 
        After each guess, a score will appear on the right side.
        <br/><br/>
        Scoring: 
      </p>
      <ul className="list-disc ml-5 text-sm text-left text-gray-500">
          <li> 2 points if the letter is in the correct spot.</li>
          <li> 1 point if the letter is present but in the incorrect spot.</li>
          <li> 0 points if the letter is not in the word. </li>
          <li> 10 points indicates you have guessed the correct word.</li>
        </ul>
      <br/>
      <p>
        For example if the word is CRANE
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="C" />
        <Cell value="A" />
        <Cell value="B" />
        <Cell value="L" />
        <Cell value="E" />
        <NumberCell value="3" />
      </div>
      <p className="text-sm text-left text-gray-500 dark:text-gray-300">
        2 points - The letter C is in the correct spot. 
        <br/>
        1 point - The letter A is in the word but in the incorrect spot.
        <br/>
        Total score of 3 points for this guess.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
