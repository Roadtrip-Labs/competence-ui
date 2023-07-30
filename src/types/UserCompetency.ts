export type UserCompetency = {
  id: number
  name: string
  description: string
  proficiency_level: number
  goal_level: number
  relevance_level: number
  created_at: string
  updated_at: string
  user_id: number
}

export type UserCompetencies = [
  {
    id: number
    name: string
    compentencies: UserCompetency[]
  }
]
