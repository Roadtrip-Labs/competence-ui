// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// ** Data Import
import { User } from 'src/types/User'

const columns: GridColumns = [
  {
    flex: 0.25,
    minWidth: 290,
    field: 'name',
    headerName: 'Name',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Description',
    field: 'description',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.description}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'proficiency_level',
    headerName: 'Proficiency Level',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.proficiency_level}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'goal_level',
    minWidth: 80,
    headerName: 'Goal Level',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.goal_level}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'updated_at',
    headerName: 'Last Updated',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.updated_at}
      </Typography>
    )
  }
]

type UserCompetenciesTableParams = {
  user: User
}

const UserCompetenciesTable = (params: UserCompetenciesTableParams) => {
  return (
    <Card>
      <CardHeader title='User Competencies' />
      {params.user.competencies ?
        <DataGrid
          autoHeight
          columns={columns}
          rows={params.user.competencies}
          rowsPerPageOptions={[5, 10, 20]}
        />
      :
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          No competencies found for user {params.user.name}
        </Typography>
      }
    </Card>
  )
}

export default UserCompetenciesTable
