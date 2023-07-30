// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// ** Chartjs Imports
import ChartjsRadarChart from 'src/views/charts/chartjs/ChartjsRadarChart'

// ** Third Party Styles Import
import 'chart.js/auto'

const Home = () => {
  // ** Hook
  const theme = useTheme()

  // Vars
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
