// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// ** Store & Actions
import { useGetUsersQuery } from 'src/store/users'

// ** Components Imports
import CompetenciesRadarChart from 'src/views/competencies/CompetenciesRadarChart'

// ** Third Party Styles Import
import 'chart.js/auto'
import { useEffect } from 'react'

const Home = () => {
  // ** Hook
  const theme = useTheme()

  const { data: users, isLoading, isError, refetch } = useGetUsersQuery()
  useEffect(() => {
    const onFocus = () => {
      refetch()
    }
    window.addEventListener('focus', onFocus)

    return () => {
      window.removeEventListener('focus', onFocus)
    }
  }, [refetch])

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
      <Grid item xs={12} md={12}>
        {isLoading ? (
            <Typography>Loading...</Typography>
        ) : isError ? (
          <Typography>Error...</Typography>
        ) : users ? (
          <CompetenciesRadarChart
            users={users}
            labelColor={labelColor}
            legendColor={legendColor}
            borderColor={borderColor}
          />
        ) : null}
      </Grid>
    </Grid>
  )
}

export default Home
