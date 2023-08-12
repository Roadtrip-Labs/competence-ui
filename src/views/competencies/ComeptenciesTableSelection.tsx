// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// ** Data Import
import { usersCompetencyApi } from 'src/store/usersCompetency'
import { useState } from 'react'
import { UserCompetency } from 'src/types/User'
import { usersApi } from 'src/store/users'

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
    flex: 0.25,
    minWidth: 120,
    headerName: 'Category',
    field: 'category',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.category}
      </Typography>
    )
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
    flex: 0.10,
    minWidth: 110,
    editable: true,
    field: 'proficiency_level',
    headerName: 'Proficiency Level',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.proficiency_level}
      </Typography>
    )
  },
  {
    flex: 0.10,
    minWidth: 80,
    editable: true,
    field: 'goal_level',
    headerName: 'Goal Level',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.goal_level}
      </Typography>
    )
  },
  {
    flex: 0.125,
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
  userId: number
}

const UserCompetenciesTable = (params: UserCompetenciesTableParams) => {
  const [useUpdateCompetencyMutation, { data, error, isLoading }] = usersCompetencyApi.useUpdateCompetencyMutation()
  const { refetch: refetchUsers } = usersApi.useGetUsersQuery()
  const {
    data: competencyData,
    error: competencyError,
    isLoading: competencyIsLoading
  } = usersCompetencyApi.useGetUserCompetenciesQuery(params.userId)

  const updateUserCompetency = async (updatedCompetency: any) => {
    console.log('updateUserCompetency: ', params)
    const updatedRow = { ...currentlyEditingRow, [updatedCompetency.field]: updatedCompetency.value }
    console.log('mySaveOnServerFunction: ', updatedRow)
    await useUpdateCompetencyMutation({ userId: params.userId, competency: updatedRow })
    refetchUsers()
  }

  const [currentlyEditingRow, setCurrentlyEditingRow] = useState<UserCompetency>()

  return (
    <Card>
      <CardHeader title='User Competencies' />
      {competencyData ? (
        <DataGrid
          autoHeight
          editMode='cell'
          columns={columns}
          rows={competencyData}
          rowsPerPageOptions={[5, 10, 20]}
          onCellEditCommit={params => updateUserCompetency(params)}
          onCellEditStart={params => setCurrentlyEditingRow(params.row as UserCompetency)}
        />
      ) : (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          No competencies found for user {params.userId}
        </Typography>
      )}
    </Card>
  )
}

export default UserCompetenciesTable
