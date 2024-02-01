import { supabase } from "./supabase";
import { Answers, Database } from "./supabaseSchema";

export const getAllAnswers = async () : Promise<Answers[] | null> => {
  const { data, error } = await supabase.from("answers").select("*");
  return data;
};

export const getNextAnswer = async (lastAnswer: string) : Promise<Answers[] | null>  => {
  const lastWord = lastAnswer.slice(-1);
  const { data, error } = await supabase
    .from("answers")
    .select("*")
    .like("answer", lastWord + "%");
  return data;
};
