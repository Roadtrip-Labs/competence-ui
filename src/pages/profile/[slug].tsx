// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Components Imports
import UserCompetenciesTable from 'src/views/competencies/CompetenciesTable'

// ** Store & Actions
import { useGetUserByIdQuery } from 'src/store/users'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Profile = () => {
  // ** Router
  const router = useRouter()
  console.log('Router: ', router.query)

  // TODO: setting a default value for the id causes an extra api call
  const id = router.query.slug ? Number(router.query.slug[0]) : 0

  // ** State
  console.log('Getting competencies for user: ', id)
  const { data: userById, isLoading, isError } = useGetUserByIdQuery(id)
  console.log('userById', userById)

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <LinkStyled href='https://mui.com/x/react-data-grid/' target='_blank'>
              {isLoading ? (
                "Loading..."
              ) : isError ? (
                "Error..."
              ) : userById ? (
                userById.name
              ) : null}
            </LinkStyled>
          </Typography>
        }
        subtitle={
          <Typography variant='body2'>
            This page shows the competencies for a specific user.
          </Typography>
        }
      />
      <Grid item xs={12}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isError ? (
          <Typography>Error...</Typography>
        ) : userById ? (
          <UserCompetenciesTable userId={id} />
        ) : null}
      </Grid>
    </Grid>
  )
}

export default Profile
