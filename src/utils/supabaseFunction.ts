import { supabase } from "./supabase";
import { Answers } from "./supabaseSchema";
import { getLastWord } from "./words";

export const getAllAnswers = async () : Promise<Answers[] | null> => {
  const { data, error } = await supabase.from('answers').select('*');
  return data;
};

/**
 * 次の回答を取得
 * @param currentAnswer 今回の回答
 * @returns 次の回答
 */
export const getNextAnswer = async (currentAnswer: string, alreadyAnswer: string[]) : Promise<string>  => {
  const lastWord = getLastWord(currentAnswer);
  const { data, error } = await supabase
  .from('random_answers')
  .select('*')
  .like('answer_word', lastWord + '%')
  .not('answer_word', 'in', `(${alreadyAnswer})`)
  .limit(1);

  console.log('data=[%s] error=[%s]', JSON.stringify(data), JSON.stringify(error));
    
  if (data && data.length > 0 && data[0].answer_word) {
    return data[0].answer_word;
  } else {
    return '';
  }
};
