import classnames from 'classnames'

type Props = {
  value: string
}

export const IndexCell = ({
  value,
}: Props) => {
  const classes = classnames(
    'flex items-end mx-0.5 text-lg font-bold rounded dark:text-white w-6',
    {
      'pl-2': value.length < 3
    }
  )

  return (
    <div className={classes}>
      <div className="letter-container">
        {value}
      </div>
    </div>
  )
}
