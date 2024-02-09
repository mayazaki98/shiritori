type GameRequest = {
  current_answer: string,
  already_answers: string[]
}

type GameResponse = {
  result: boolean,
  next_answer: string
}