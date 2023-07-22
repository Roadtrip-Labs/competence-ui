// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import UserCompetenciesTable from 'src/views/table/data-grid/TableSelection'
import { useEffect } from 'react'
import { getCompetencies } from 'src/store/competencies'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.compentencies)

  useEffect(() => {
    dispatch(getCompetencies()).unwrap()
  }, [])
  const router = useRouter()
  const id: string = (router.query.slug as string) ?? '0'
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <LinkStyled href='https://mui.com/x/react-data-grid/' target='_blank'>
              Data Grid
            </LinkStyled>
          </Typography>
        }
        subtitle={
          <Typography variant='body2'>
            Data Grid is a fast and extendable react data table and react data grid.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <UserCompetenciesTable id={id} />
      </Grid>
    </Grid>
  )
}

export default Profile
