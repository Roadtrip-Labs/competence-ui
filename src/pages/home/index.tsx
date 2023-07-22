// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// ** Chartjs Imports
import ChartjsRadarChart from 'src/views/charts/chartjs/ChartjsRadarChart'

// ** Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'

// ** Third Party Styles Import
import 'chart.js/auto'
import { useEffect } from 'react'
import { getCompetencies } from 'src/store/competencies'

const Home = () => {
  // ** Hook
  const theme = useTheme()


  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.compentencies)
  
  useEffect(() => {
    dispatch(getCompetencies()).unwrap()
  }, [])

  // Vars
  const whiteColor = '#fff'
  const yellowColor = '#ffe802'
  const primaryColor = '#836af9'
  const areaChartBlue = '#2c9aff'
  const barChartYellow = '#ffcf5c'
  const polarChartGrey = '#4f5d70'
  const polarChartInfo = '#299aff'
  const lineChartYellow = '#d4e157'
  const polarChartGreen = '#28dac6'
  const lineChartPrimary = '#9e69fd'
  const lineChartWarning = '#ff9800'
  const horizontalBarInfo = '#26c6da'
  const polarChartWarning = '#ff8131'
  const scatterChartGreen = '#28c76f'
  const warningColorShade = '#ffbd1f'
  const areaChartBlueLight = '#84d0ff'
  const areaChartGreyLight = '#edf1f4'
  const scatterChartWarning = '#ff9f43'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Circle of Competencies'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Social Component</Typography>
            <Typography>This is placeholder text for more about the social component</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartjsRadarChart labelColor={labelColor} legendColor={legendColor} borderColor={borderColor} />
      </Grid>
    </Grid>
  )
}

export default Home
