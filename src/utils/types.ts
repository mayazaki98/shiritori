type GameRequest = {
  answer_word: string
}

type GameResponse = {
  result: boolean,
  next_answer_word: string
}