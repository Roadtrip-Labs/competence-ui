// ** React Imports
import { useRef, useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'

// ** Store & Actions
import { getCompetencies } from 'src/store/competencies'

// ** Third Party Imports
import { Radar } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import { UserCompetency } from 'src/types/UserCompetency'

interface RadarProps {
  labelColor: string
  borderColor: string
  legendColor: string
}

const CompetenciesRadarChart = (props: RadarProps) => {
  // ** Props
  const { labelColor, legendColor, borderColor } = props

  // ** States
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.compentencies)

  useEffect(() => {
    dispatch(getCompetencies()).unwrap()
  }, [])

  const [chartData, setChartData] = useState<ChartData<'radar'>>({
    datasets: store.users.map((user) => ({
      label: user.name,
      data: user.compentencies.map((compentency: UserCompetency) => compentency.proficiency_level),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)'
    })),
  })

  // ** Hooks
  const chartRef = useRef<any>(null)

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: { top: -20 }
    },
    scales: {
      r: {
        ticks: {
          display: false,
          maxTicksLimit: 1,
          color: labelColor
        },
        grid: { color: borderColor },
        pointLabels: { color: labelColor },
        angleLines: { color: borderColor }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 25,
          color: legendColor
        }
      }
    }
  }

  useEffect(() => {
    if (!chartRef.current) {
      return
    } else {
      const gradientBlue = chartRef.current.ctx.createLinearGradient(0, 0, 0, 150)
      gradientBlue.addColorStop(0, 'rgba(155,136,250, 0.9)')
      gradientBlue.addColorStop(1, 'rgba(155,136,250, 0.8)')

      const gradientRed = chartRef.current.ctx.createLinearGradient(0, 0, 0, 150)
      gradientRed.addColorStop(0, 'rgba(255,161,161, 0.9)')
      gradientRed.addColorStop(1, 'rgba(255,161,161, 0.8)')

      const chartData = {
        labels: ['Communication', 'Strength Training', 'Programming', 'Cooking', 'CHA', 'INT'],
        datasets: [
          {
            fill: true,
            label: 'Max Stumpf',
            borderColor: 'transparent',
            backgroundColor: gradientRed,
            data: [25, 59, 90, 81, 60, 82],
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent'
          },
          {
            fill: true,
            label: 'Vincent Williams',
            borderColor: 'transparent',
            backgroundColor: gradientBlue,
            data: [40, 100, 40, 90, 40, 90],
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent'
          }
        ]
      }

      setChartData(chartData)
    }
  }, [])

  return (
    <Card>
      <CardHeader title='Competency Overlap' />
      <CardContent>
        <Radar height={350} ref={chartRef} data={chartData} options={options} />
      </CardContent>
    </Card>
  )
}

export default CompetenciesRadarChart
