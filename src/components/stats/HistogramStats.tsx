import { GameStats } from '../../lib/localStorage'
import { StatItem } from '../stats/StatBar'

type Props = {
  gameStats: GameStats
}

export const HistogramStats = ({ gameStats }: Props) => {
  const winDistribution = gameStats.winDistribution
  const maxValue = Math.max(...winDistribution)

  const arrayCount = (a: number[]) => a.filter(i => i > 0).reduce((a,b) => a + b, 0)
  const arrayAvg = (a: number[]) => a.map((v,i) => v*(i + 1)).reduce((a,b) => a + b, 0) / arrayCount(a)
  const arrayMin = (a: number[]) => winDistribution.findIndex((i) => i > 0) + 1

  return (
    <div className="flex justify-center my-2">
      <StatItem label="Best win" value={arrayMin(winDistribution)}/>
      <StatItem label="Average win" value={arrayAvg(winDistribution)}/>
    </div>
  )
}
