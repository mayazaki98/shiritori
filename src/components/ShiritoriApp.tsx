"use client";

import { getAllAnswers } from "@/utils/supabaseFunction";
import { Answers, Database } from "@/utils/supabaseSchema";
import React, { useEffect, useState } from "react";

export const ShiritoriApp = () => {
  const [answers, setAnswers] = useState<Answers[]>([]);

  useEffect(() => {
    const getAnswers = async () => {
      const answers = await getAllAnswers();
      if (answers != null) {
        setAnswers(answers);
      }
      console.log(answers);
    };
    getAnswers();
  }, []);

  return (
    <section className="text-center mb-2 text-2xl font-medium">
      <h3>しりとりゲーム</h3>
      {answers.map((value) => (
        <li key={value.id}>{value.answer_word}</li>
      ))}
    </section>
  );
};
