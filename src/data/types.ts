export type Question = {
  id: number
  text: string
}

export type QuestionCategory =
  | 'hypothetic'
  | 'deep'
  | 'faith'
  | 'other'
  | 'favorites'