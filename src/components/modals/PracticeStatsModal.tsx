import Countdown from 'react-countdown'
import {
  NEW_WORD_TEXT,
  SHARE_TEXT, STATISTICS_TITLE
} from '../../constants/strings'
import { savePracticeGameStateToLocalStorage } from '../../lib/localStorage'
import { getRandomWord, tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  isGameWon: boolean
}

export const PracticeStatsModal = ({
  isOpen,
  handleClose,
  guesses,
  isGameWon,
}: Props) => {
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {isGameWon && (
        <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          You solved the practice word in <b>{guesses.length}</b> tries!
        </h4>
      )}
      {!isGameWon && (
        <div className="mt-5 sm:mt-6 dark:text-white">
          You cannot move on to the next practice game until you have completed the current game!
        </div>
      )}
      {(isGameWon) && (
        <div className="mt-5 sm:mt-6 dark:text-white">
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm justify-center"
            onClick={() => {
              const word = getRandomWord()
              guesses = []
              savePracticeGameStateToLocalStorage({ guesses: [], solution: word })
              window.location.reload()
            }}
          >
            Next Game
          </button>
        </div>
      )}
    </BaseModal>
  )
}
