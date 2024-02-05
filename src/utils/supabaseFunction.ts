import { supabase } from "./supabase";
import { Answers } from "./supabaseSchema";
import { getLastWord } from "./words";

export const getAllAnswers = async () : Promise<Answers[] | null> => {
  const { data, error } = await supabase.from('answers').select('*');
  return data;
};

export const getNextAnswer = async (lastAnswer: string) : Promise<string>  => {
  const lastWord = getLastWord(lastAnswer);
  const { data, error } = await supabase.from('random_answers').select('*').like('answer_word', lastWord + '%').limit(1);

  console.log('data=[%s] error=[%s]', JSON.stringify(data), JSON.stringify(error));
    
  if (data && data.length > 0 && data[0].answer_word) {
    return data[0].answer_word;
  } else {
    return '';
  }
};
