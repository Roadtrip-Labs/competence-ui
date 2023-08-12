

import { useState } from 'react'
import { useGetUsersQuery } from 'src/store/users'
import { useUpdateCompetencyMutation, usersCompetencyApi } from 'src/store/usersCompetency'
import { UserCompetency } from 'src/types/User'
import { UserCompetenciesTableParams } from './CompetenciesTable'

export type UseUpdateUserCompetencyResult = {
  handleUpdatedCompetency: (updatedCompetency: any) => Promise<void>
  setCurrentlyEditingRow: (row: UserCompetency | undefined) => void
  competencyData: UserCompetency[] | undefined
}

export const useUpdateUserCompetency = (params: UserCompetenciesTableParams): UseUpdateUserCompetencyResult => {
  const [updateUserCompetency] = useUpdateCompetencyMutation()
  const { refetch: refetchUsers } = useGetUsersQuery()
  const { data: competencyData } = usersCompetencyApi.useGetUserCompetenciesQuery(params.userId)

  const [currentlyEditingRow, setCurrentlyEditingRow] = useState<UserCompetency>()

  const handleUpdatedCompetency = async (updatedCompetency: any) => {
    const updatedRow = { ...currentlyEditingRow, [updatedCompetency.field]: updatedCompetency.value }
    await updateUserCompetency({ userId: params.userId, competency: updatedRow })
    refetchUsers()
  }

  return { handleUpdatedCompetency, setCurrentlyEditingRow, competencyData: competencyData }
}
