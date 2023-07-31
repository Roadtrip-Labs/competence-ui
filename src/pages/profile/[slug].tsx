// ** React Import
import { useEffect } from 'react'

// ** Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'

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
import UserCompetenciesTable from 'src/views/competencies/ComeptenciesTableSelection'

// ** Store & Actions
import { getUserCompetencies } from 'src/store/users'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Profile = () => {
  // ** Router
  const router = useRouter()
  console.log('Router: ', router.query)
  const id = router.query.slug ? Number(router.query.slug[0]) : 0

  // ** State
  const dispatch = useDispatch<AppDispatch>()
  console.log('Getting competencies for user: ', id)
  useEffect(() => {
    dispatch(getUserCompetencies()).unwrap()
  }, [dispatch])
  const store = useSelector((state: RootState) => state.users)
  console.log('Store table: ', store)
  const user = store.users.find(user => user.user_id === id)
  console.log('Table User: ', user)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <LinkStyled href='https://mui.com/x/react-data-grid/' target='_blank'>
              {user?.name}
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
        <UserCompetenciesTable user={user} />
      </Grid>
    </Grid>
  )
}

export default Profile
