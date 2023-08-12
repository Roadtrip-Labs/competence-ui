export type User = {
  user_id: number
  name: string
  competencies: UserCompetency[]
}

export type Users = User[]

export type Competency = {
  id: number
  name: string
  description: string
  category: string
  user_competencies: UserCompetency[]
}

export type UserCompetency = {
  id: number
  competency_id: number
  name: string
  description: string
  category: string
  proficiency_level: number
  goal_level: number
  relevance_level: number
  created_at: string
  updated_at: string
}
