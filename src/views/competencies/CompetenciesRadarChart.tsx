// ** React Imports
import { useRef, useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Radar } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'

// ** Types
import { Users, UserCompetency } from 'src/types/User'

interface RadarProps {
  labelColor: string
  borderColor: string
  legendColor: string
  users: Users
}

const CompetenciesRadarChart = (props: RadarProps) => {
  // ** Props
  const { users, labelColor, legendColor, borderColor } = props

  const [chartData, setChartData] = useState<ChartData<'radar'>>({
    datasets: [
      {
        fill: true,
        label: 'Max Stumpf',
        borderColor: 'transparent',
        backgroundColor: labelColor,
        data: [25, 59, 90, 81, 60, 82],
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent'
      },
      {
        fill: true,
        label: 'Vincent Williams',
        borderColor: 'transparent',
        backgroundColor: legendColor,
        data: [40, 100, 40, 90, 40, 90],
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent'
      }
    ]
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
        labels: users[0].compentencies.map((compentency: UserCompetency) => compentency.name),
        datasets: [
          {
            fill: true,
            label: users[0].name,
            borderColor: 'transparent',
            backgroundColor: gradientRed,
            data: users[0].compentencies.map((compentency: UserCompetency) => compentency.proficiency_level),
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent'
          },
          {
            fill: true,
            label: users[1].name,
            borderColor: 'transparent',
            backgroundColor: gradientBlue,
            data: users[1].compentencies.map((compentency: UserCompetency) => compentency.proficiency_level),
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
