export type User = {
  id: number
  name: string
  competencies: UserCompetency[]
}

export type Users = User[]

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
