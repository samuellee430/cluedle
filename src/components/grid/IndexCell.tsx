import classnames from 'classnames'

type Props = {
  value?: string
}

export const IndexCell = ({
  value,
}: Props) => {
  const classes = classnames(
    'flex items-end justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
  )

  return (
    <div className={classes}>
      <div className="letter-container">
        {value}
      </div>
    </div>
  )
}
