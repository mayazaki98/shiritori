import { supabase } from "./supabase";

export const getAllAnswers = async () => {
  const answers = await supabase.from("answers").select("");
  return answers.data;
};
