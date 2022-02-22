import { Cell } from '../grid/Cell'
import { NumberCell } from '../grid/NumberCell'
import { Key } from '../keyboard/Key'
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
      <ul className="text-sm text-left text-gray-500 dark:text-gray-300 list-disc ml-5">
          <li> 2 points if the letter is in the correct spot.</li>
          <li> 1 point if the letter is present but in the incorrect spot.</li>
          <li> 0 points if the letter is not in the word. </li>
          <li> 10 points indicates you have guessed the correct word.</li>
        </ul>
      <br/>
      <p className="text-sm text-left text-gray-500 dark:text-gray-300">
        For example if the word is CRANE
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="C" status="absent" />
        <Cell value="A" status="absent" />
        <Cell value="B" status="absent" />
        <Cell value="L" status="absent" />
        <Cell value="E" status="absent" />
        <NumberCell value="3" />
      </div>
      <p className="text-sm text-left text-gray-500 dark:text-gray-300">
        2 points - The letter C is in the correct spot. 
        <br/>
        1 point - The letter A is in the word but in the incorrect spot.
        <br/>
        Total score of 3 points for this guess.
      </p>
      <br/>
      <p className="text-sm text-left text-gray-500 dark:text-gray-300">
        To help you solve the cluedle, the keys on the keyboard can be set to different colors.
        To set the color right click if you're on a computer, or long press if you're on a mobile device.
        The colors will cycle from gray to black to yellow to green.
      </p>
      <div className="flex justify-center mb-1 mt-4">
        <Key value="A" initialKeyColor='default' onClick={() => {}}/>
        <Key value="B" initialKeyColor='black' onClick={() => {}}/>
        <Key value="C" initialKeyColor='blue' onClick={() => {}}/>
        <Key value="D" initialKeyColor='yellow' onClick={() => {}}/>
        <Key value="E" initialKeyColor='green' onClick={() => {}}/>
        <Key value="F" initialKeyColor='default' onClick={() => {}}/>
      </div>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This project is open source -{' '}
        <a
          href="https://github.com/samuellee430/cluedle"
          className="underline font-bold"
        >
          check out the code here!
        </a>{' '}
      </p>
    </BaseModal>
  )
}
